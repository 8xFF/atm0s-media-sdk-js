import { StreamReceiver } from './receiver';
import { StreamSender } from './sender';
import { StreamKinds, type RoomStats } from './utils/types';
import { debounce } from 'ts-debounce';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import { getLogger, setLogLevel } from './utils/logger';
import type { IRPC } from './interfaces/rpc';
import { RPC } from './core/rpc';
import type { StreamRemoteState } from './interfaces/remote';
import type { IRealtimeSocket } from './interfaces/rtsocket';
import type { ISessionCallbacks, ISessionConfig } from './interfaces/session';
import { StreamRemote } from './remote';
import type { IStreamSender, SenderConfig } from './interfaces/sender';
import type { IStreamReceiver } from './interfaces';
import { StreamPublisher } from './publisher';
import { StreamConsumer } from './consumer';
import { StreamConsumerPair } from './consumer-pair';
import { ReceiverMixMinusAudio } from './receiver-mix-minus';
import { StreamMapping } from './stream-mapping';
import { RealtimeSocket } from './core/socket';
import { HttpGatewayConnector } from './core/gateway';

export class Session extends TypedEventEmitter<ISessionCallbacks> {
  private _audioSenders = new Map<string, IStreamSender>();
  private _videoSenders = new Map<string, IStreamSender>();

  private _streams = new StreamMapping();

  private _audioReceivers: IStreamReceiver[] = [];
  private _videoReceivers: IStreamReceiver[] = [];
  private _remotes = new Map<string, StreamRemote>();

  private logger = getLogger('atm0s:session');
  private _rpc: IRPC;
  private _mixminus?: ReceiverMixMinusAudio;

  public disconnected = false;
  public wasConnected = false;

  private _socket: IRealtimeSocket;

  constructor(
    urls: string | string[],
    private _cfg: ISessionConfig,
  ) {
    super();
    if (this._cfg.logLevel) {
      this.logger.log('set log level:', this._cfg.logLevel);
      setLogLevel(this._cfg.logLevel);
    }
    this._socket = new RealtimeSocket(urls, new HttpGatewayConnector(), {
      iceServers: this._cfg.iceServers,
      latencyMode: this._cfg.latencyMode,
    });
    this._socket.on('peer_state', (state) => {
      this.emit('peer_state', state);
      switch (state) {
        case 'failed':
        case 'closed':
          this.logger.info('peer disconnected:', state);
          this.disconnected = true;
          this._mixminus?.releaseElements();
          this.emit('disconnected', state);
          break;
        case 'connected':
          this.wasConnected = true;
          break;
        case 'reconnected':
          this.logger.info('peer reconnected:', state);
          this.emit('reconnected', state);
          break;
        case 'reconnecting':
          this.logger.info('peer reconnecting:', state);
          this.emit('reconnecting', state);
          break;
      }
    });
    this._socket.on('dc_state', (state) => {
      this.emit('dc_state', state);
      switch (state) {
        case 'connected':
          this.emit('connected');
          if (this._cfg.mixMinusAudio) {
            this._mixminus?.connect();
          }
          break;
        case 'disconnected':
          this.logger.info('data channel disconnected:', state);
          this.emit('disconnected', state);
          this._socket.close();
          break;
      }
    });
    this._rpc = new RPC(this._socket);
    if (_cfg.mixMinusAudio) {
      if (_cfg.receivers) {
        _cfg.receivers.audio = (_cfg.receivers.audio || 0) + 3;
      } else {
        _cfg.receivers = { audio: 3, video: 0 };
      }
      this._mixminus = new ReceiverMixMinusAudio('default', this, this._rpc, _cfg.mixMinusAudio.elements);
    }
    this._rpc.on('stream_added', this.onStreamEvent);
    this._rpc.on('stream_updated', this.onStreamEvent);
    this._rpc.on('stream_removed', this.onStreamEvent);
    this._rpc.on('room_stats', this.onRoomStats);
    this._cfg.senders?.map((s) => {
      if (s.stream) {
        const senderTrack = this._socket.createSenderTrack(s);
        this.logger.info('created sender track:', senderTrack);
        const sender = new StreamSender(this._rpc, senderTrack);
        sender.on('stopped', this._onSenderStopped);

        if (senderTrack.kind === StreamKinds.AUDIO) {
          this._audioSenders.set(s.name, sender);
        }
        if (senderTrack.kind === StreamKinds.VIDEO) {
          this._videoSenders.set(s.name, sender);
        }
      }
    });

    if (this._cfg.receivers?.video) {
      for (let i = 0; i < this._cfg.receivers.video; i++) {
        const recvrTrack = this._socket.createReceiverTrack(StreamKinds.VIDEO);
        const receiver = new StreamReceiver(this._rpc, recvrTrack, this._streams);
        this._videoReceivers.push(receiver);
      }
    }

    if (this._cfg.receivers?.audio) {
      for (let i = 0; i < this._cfg.receivers.audio; i++) {
        const recvrTrack = this._socket.createReceiverTrack(StreamKinds.AUDIO);
        const receiver = new StreamReceiver(this._rpc, recvrTrack, this._streams);
        this._audioReceivers.push(receiver);
      }
    }
  }

  connect() {
    this.logger.info('start to connect ...');
    return this._socket.connect(this._cfg);
  }

  async ping() {
    const started = Date.now();
    await this._rpc.request('peer.ping', null, 500);
    return Date.now() - started;
  }

  async restartIce() {
    if (!this.wasConnected) {
      this.logger.warn('should call restartIce after connected');
      return;
    }
    if (this.disconnected) {
      this.logger.warn('should call restartIce before disconnect');
      return;
    }
    try {
      const rtt = await this.ping();
      this.logger.warn('ping success, not restart ice, ping rtt', rtt);
    } catch (e) {
      return this.restartIceInternal();
    }
  }

  private restartIceInternal = async () => {
    if (!this.wasConnected) {
      this.logger.warn('should call restartIce after connected');
      return;
    }
    if (this.disconnected) {
      this.logger.warn('should call restartIce before disconnect');
      return;
    }
    this.emit('reconnecting');
    await this._socket.reconnect();
  };

  private _onSenderStopped = (sender: IStreamSender) => {
    this.logger.info('sender stopped:', sender.name);
    if (sender.kind === StreamKinds.AUDIO) {
      this._audioSenders.delete(sender.name);
    }
    if (sender.kind === StreamKinds.VIDEO) {
      this._videoSenders.delete(sender.name);
    }
    if (this.wasConnected) {
      this.update();
    }
  };

  async disconnect() {
    this.disconnected = true;
    this._mixminus?.releaseElements();
    this._socket?.close();
  }

  createPublisher(cfg: SenderConfig) {
    return new StreamPublisher(this, cfg);
  }

  createConsumer(remote: StreamRemote) {
    return new StreamConsumer(this, remote);
  }

  createConsumerPair(peerId: string, audioName: string, videoName: string) {
    const audioConsumer = this.createConsumer(new StreamRemote(StreamKinds.AUDIO, peerId, '', audioName));
    const videoConsumer = this.createConsumer(new StreamRemote(StreamKinds.VIDEO, peerId, '', videoName));
    return new StreamConsumerPair(videoConsumer, audioConsumer);
  }

  createSender(cfg: SenderConfig) {
    const senderTrack = this._socket.createSenderTrack(cfg);
    const sender = new StreamSender(this._rpc, senderTrack);
    sender.on('stopped', this._onSenderStopped);
    if (cfg.kind === StreamKinds.AUDIO) {
      this._audioSenders.set(cfg.name, sender);
    }
    if (cfg.kind === StreamKinds.VIDEO) {
      this._videoSenders.set(cfg.name, sender);
    }
    if (this.wasConnected) {
      this.logger.info('create sender after connected, update sdp');
      this.update();
    }
    return sender;
  }

  createReceiver(kind: StreamKinds) {
    const recvrTrack = this._socket.createReceiverTrack(kind);
    const receiver = new StreamReceiver(this._rpc, recvrTrack, this._streams);
    if (kind === StreamKinds.AUDIO) {
      this._audioReceivers.push(receiver);
    }
    if (kind === StreamKinds.VIDEO) {
      this._videoReceivers.push(receiver);
    }
    if (this.wasConnected) {
      this.logger.info('create receiver after connected, update sdp');
      this.update();
    }
    return receiver;
  }

  takeReceiver(kind: StreamKinds): IStreamReceiver {
    switch (kind) {
      case StreamKinds.AUDIO:
        if (this._audioReceivers.length === 0) {
          this.createReceiver(kind);
        }
        return this._audioReceivers.shift()!;
      case StreamKinds.VIDEO:
        if (this._videoReceivers.length === 0) {
          this.createReceiver(kind);
        }
        return this._videoReceivers.shift()!;
      default:
        throw new Error('Invalid stream kind');
    }
  }

  getMixMinusAudio(): ReceiverMixMinusAudio | undefined {
    return this._mixminus;
  }

  backReceiver(receiver: IStreamReceiver) {
    if (receiver.kind === StreamKinds.AUDIO) {
      this._audioReceivers.push(receiver);
    }
    if (receiver.kind === StreamKinds.VIDEO) {
      this._videoReceivers.push(receiver);
    }
  }

  getSender(kind: StreamKinds, name: string) {
    switch (kind) {
      case StreamKinds.AUDIO:
        return this._audioSenders.get(name);
      case StreamKinds.VIDEO:
        return this._videoSenders.get(name);
      default:
        return undefined;
    }
  }

  private update = debounce(this.updateSdp, 500, {
    isImmediate: false,
  });

  private async updateSdp() {
    this.logger.info('will update sdp now');
    const { offer, meta } = await this._socket.generateOffer();
    this.logger.info('send updated sdp:', meta);
    const res = await this._rpc!.request<{ sdp: string }>('peer.updateSdp', meta);
    if (!res.status) {
      this.logger.error('updateSdp :: Error response from server', res);
      throw new Error('SERVER_ERROR');
    }
    this.logger.debug('updateSdp :: received answer:', res.data);
    this._socket.updateSdp(offer, res.data.sdp);
  }

  private onRoomStats = (_: string, stats: RoomStats) => {
    this.emit('room_stats', stats);
  };

  private onStreamEvent = (
    event: string,
    params: {
      peer: string;
      peer_hash: string;
      kind: StreamKinds;
      stream: string;
      state: StreamRemoteState;
    },
  ) => {
    this.logger.info('on stream event:', event, params);
    const key = `${params.peer}/${params.stream}`;
    const isMyStream = params.peer === this._cfg.peerId;

    switch (event) {
      case 'stream_added':
      case 'stream_updated':
        if (this._remotes.has(key)) {
          const remote = this._remotes.get(key)!;
          remote.updateState(params.state);
          this.emit(isMyStream ? 'mystream_updated' : 'stream_updated', remote);
        } else {
          const remote = new StreamRemote(params.kind, params.peer, params.peer_hash, params.stream);
          this._streams.add(params.peer_hash, params.stream, remote);
          remote.updateState(params.state);
          this._remotes.set(key, remote);
          this.emit(isMyStream ? 'mystream_added' : 'stream_added', remote);
        }

        break;
      case 'stream_removed':
        if (this._remotes.has(key)) {
          const remote = this._remotes.get(key)!;
          this._streams.remove(params.peer_hash, params.stream);
          this._remotes.delete(key);
          this.emit(isMyStream ? 'mystream_removed' : 'stream_removed', remote);
        }
        break;
    }
  };
}
