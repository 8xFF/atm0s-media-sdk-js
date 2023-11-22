import type { IMediaGatewayConnector } from './core/gateway';
import type { ISessionConfig } from './utils/interface';
import { StreamReceiver } from './receiver';
import { RPC, type IRPC } from './core/rpc';
import { StreamSender } from './sender';
import { type IRealtimeSocket } from './core/socket';
import { StreamKinds, type SenderConfig } from './utils/types';
import { debounce } from 'ts-debounce';
import _debug from 'debug';

export class Session {
  private _audioSenders = new Map<string, StreamSender>();
  private _videoSenders = new Map<string, StreamSender>();

  private _audioReceivers: StreamReceiver[] = [];
  private _videoReceivers: StreamReceiver[] = [];

  private _log = _debug('atm0s:session');
  private _rpc: IRPC;

  constructor(
    private _cfg: ISessionConfig,
    private _socket: IRealtimeSocket,
    private _connector: IMediaGatewayConnector,
  ) {
    this._socket.on('message', (data) => {
      console.log('message', data);
    });
    this._socket.on('peer_state', (data) => {
      console.log('state', data);
    });
    this._socket.on('dc_state', (data) => {
      console.log('dc_state', data);
    });
    this._rpc = new RPC(this._socket);
  }

  async connect() {
    this._log('start to connect ...');
    this._cfg.senders.map((s) => {
      if (s.stream) {
        const senderTrack = this._socket.createSenderTrack(s);
        const sender = new StreamSender(this._rpc, senderTrack);
        if (senderTrack.info.kind === StreamKinds.AUDIO) {
          this._audioSenders.set(s.name, sender);
        }
        if (senderTrack.info.kind === StreamKinds.VIDEO) {
          this._videoSenders.set(s.name, sender);
        }
      }
    });
    for (let i = 0; i < this._cfg.receivers.audio; i++) {
      const recvrTrack = this._socket.createReceiverTrack(
        `audio_${i}`,
        StreamKinds.AUDIO,
      );
      const receiver = new StreamReceiver(this._rpc, recvrTrack);
      this._audioReceivers.push(receiver);
    }
    for (let i = 0; i < this._cfg.receivers.video; i++) {
      const recvrTrack = this._socket.createReceiverTrack(
        `video_${i}`,
        StreamKinds.VIDEO,
      );
      const receiver = new StreamReceiver(this._rpc, recvrTrack);
      this._videoReceivers.push(receiver);
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
    this.update();
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
    this.update();
    return receiver;
  }

  async takeReceiver(kind: StreamKinds) {
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

  async backReceiver(receiver: StreamReceiver) {
    if (receiver.kind === StreamKinds.AUDIO) {
      this._audioReceivers.push(receiver);
    }
    if (receiver.kind === StreamKinds.VIDEO) {
      this._videoReceivers.push(receiver);
    }
  }

  async getSender(name: string, kind: StreamKinds) {
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
    this._log('send updated sdp:', meta);
    const res = await this._rpc!.request<
      unknown,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { status: boolean; data: any }
    >('peer.updateSdp', meta);
    if (!res.status) {
      this._log('updateSdp :: Error response from server', res);
      throw new Error('SERVER_ERROR');
    }
    this._log('updateSdp :: received answer:', res.data);
    this._socket.updateSdp(offer, res.data.sdp);
  }
}
