import { StreamReceiver } from './receiver';
import { StreamSender } from './sender';
import { StreamKinds } from './utils/types';
import { debounce } from 'ts-debounce';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import { getLogger } from './utils/logger';
import type { IRPC } from './interfaces/rpc';
import { RPC } from './core/rpc';
import type { IMediaGatewayConnector } from './interfaces/gateway';
import type { StreamRemoteState } from './interfaces/remote';
import type { IRealtimeSocket } from './interfaces/rtsocket';
import type { ISessionCallbacks, ISessionConfig } from './interfaces/session';
import { StreamRemote } from './remote';
import type { SenderConfig } from './interfaces/sender';

export class Session extends TypedEventEmitter<ISessionCallbacks> {
  private _audioSenders = new Map<string, StreamSender>();
  private _videoSenders = new Map<string, StreamSender>();

  private _audioReceivers: StreamReceiver[] = [];
  private _videoReceivers: StreamReceiver[] = [];
  private _remotes = new Map<string, StreamRemote>();

  private logger = getLogger('atm0s:session');
  private _rpc: IRPC;

  constructor(
    private _cfg: ISessionConfig,
    private _socket: IRealtimeSocket,
    private _connector: IMediaGatewayConnector,
  ) {
    super();
    // this._socket.on('message', (data) => {
    //   console.log('message', data);
    // });
    this._socket.on('peer_state', (data) => {
      console.log('state', data);
    });
    this._socket.on('dc_state', (data) => {
      console.log('dc_state', data);
    });
    this._rpc = new RPC(this._socket);
    this._rpc.on('stream_added', this.onStreamEvent);
    this._rpc.on('stream_updated', this.onStreamEvent);
    this._rpc.on('stream_removed', this.onStreamEvent);
  }

  async connect() {
    this.logger.info('start to connect ...');
    this._cfg.senders.map((s) => {
      if (s.stream) {
        const senderTrack = this._socket.createSenderTrack(s);
        this.logger.info('created sender track:', senderTrack);
        const sender = new StreamSender(this._rpc, senderTrack);
        if (senderTrack.info.kind === StreamKinds.AUDIO) {
          this._audioSenders.set(s.name, sender);
        }
        if (senderTrack.info.kind === StreamKinds.VIDEO) {
          this._videoSenders.set(s.name, sender);
        }
      }
    });
    for (let i = 0; i < this._cfg.receivers.video; i++) {
      const recvrTrack = this._socket.createReceiverTrack(
        `video_${i}`,
        StreamKinds.VIDEO,
      );
      const receiver = new StreamReceiver(this._rpc, recvrTrack);
      this._videoReceivers.push(receiver);
    }

    for (let i = 0; i < this._cfg.receivers.audio; i++) {
      const recvrTrack = this._socket.createReceiverTrack(
        `audio_${i}`,
        StreamKinds.AUDIO,
      );
      const receiver = new StreamReceiver(this._rpc, recvrTrack);
      this._audioReceivers.push(receiver);
    }

    return this._socket.connect(this._connector, this._cfg);
  }

  async createSender(cfg: SenderConfig) {
    const senderTrack = this._socket.createSenderTrack(cfg);
    const sender = new StreamSender(this._rpc, senderTrack);
    if (cfg.kind === StreamKinds.AUDIO) {
      this._audioSenders.set(cfg.name, sender);
    }
    if (cfg.kind === StreamKinds.VIDEO) {
      this._videoSenders.set(cfg.name, sender);
    }
    await this.update();
    return sender;
  }

  async createReceiver(kind: StreamKinds) {
    const recvrTrack = this._socket.createReceiverTrack(
      `${kind}_${this._audioReceivers.length}`,
      kind,
    );
    const receiver = new StreamReceiver(this._rpc, recvrTrack);
    if (kind === StreamKinds.AUDIO) {
      this._audioReceivers.push(receiver);
    }
    if (kind === StreamKinds.VIDEO) {
      this._videoReceivers.push(receiver);
    }
    await this.update();
    return receiver;
  }

  takeReceiver(kind: StreamKinds) {
    const receiver =
      kind === StreamKinds.AUDIO
        ? this._audioReceivers.shift()
        : this._videoReceivers.shift();
    if (!receiver) {
      throw new Error('NO_RECEIVER');
    }
    // this.update();
    return receiver;
  }

  backReceiver(receiver: StreamReceiver) {
    if (receiver.kind === StreamKinds.AUDIO) {
      this._audioReceivers.push(receiver);
    }
    if (receiver.kind === StreamKinds.VIDEO) {
      this._videoReceivers.push(receiver);
    }
  }

  getSender(name: string, kind: StreamKinds) {
    const sender =
      kind === StreamKinds.AUDIO
        ? this._audioSenders.get(name)
        : this._videoSenders.get(name);
    if (!sender) {
      throw new Error('NO_SENDER');
    }
    return sender;
  }

  update = debounce(this.updateSdp, 500, {
    isImmediate: false,
  });

  private async updateSdp() {
    const { offer, meta } = await this._socket.generateOffer();
    this.logger.info('send updated sdp:', meta);
    const res = await this._rpc!.request<
      unknown,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { status: boolean; data: any }
    >('peer.updateSdp', meta);
    if (!res.status) {
      this.logger.error('updateSdp :: Error response from server', res);
      throw new Error('SERVER_ERROR');
    }
    this.logger.debug('updateSdp :: received answer:', res.data);
    this._socket.updateSdp(offer, res.data.sdp);
  }

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
          const remote = new StreamRemote(
            params.kind,
            params.peer,
            params.peer_hash,
            params.stream,
          );
          remote.updateState(params.state);
          this._remotes.set(key, remote);
          this.emit(isMyStream ? 'mystream_added' : 'stream_added', remote);
        }

        break;
      case 'stream_removed':
        if (this._remotes.has(key)) {
          const remote = this._remotes.get(key)!;
          this._remotes.delete(key);
          this.emit(isMyStream ? 'mystream_removed' : 'stream_removed', remote);
        }
        break;
    }
  };
}
