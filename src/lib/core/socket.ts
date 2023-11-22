import type { IMediaGatewayConnector } from './gateway';
import type { ISessionConfig } from '../utils/interface';
import { TypedEventEmitter } from '../utils/typed-event-emitter';
import _debug from 'debug';
import {
  LatencyMode,
  LatencyMode2MaxPackets,
  StreamKinds,
  type SenderConfig,
} from '../utils/types';
import { delay, getTrack } from '../utils/shared';
import pako from 'pako';
import { RTCPeerConnectionAugmented } from '../utils/rtc-peer';
import { ReceiverTrack, SenderTrack } from './tracks';

export enum RealtimeSocketEvent {
  Message = 'message',
  State = 'state',
}

export enum RealtimeSocketState {
  Created = 'created',
  Connecting = 'connecting',
  Connected = 'connected',
  Disconnected = 'disconnected',
  Failed = 'failed',
  Closed = 'closed',
}

export interface IRealtimeSocketCallbacks {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: (data: any) => void;
  peer_state: (state: RealtimeSocketState) => void;
  dc_state: (state: RealtimeSocketState) => void;
}

export interface IRealtimeSocket
  extends TypedEventEmitter<IRealtimeSocketCallbacks> {
  connect(
    connector: IMediaGatewayConnector,
    config: ISessionConfig,
  ): Promise<void>;
  // reconnect(connector: IMediaGatewayConnector): Promise<void>;

  createReceiverTrack(id: string, kind: StreamKinds): ReceiverTrack;
  createSenderTrack(cfg: SenderConfig): SenderTrack;

  generateOffer(): Promise<{
    offer: RTCSessionDescriptionInit;
    meta: {
      sdp: string;
      senders: {
        uuid: string;
        label: string;
        kind: StreamKinds;
        screen: boolean;
      }[];
      receivers: {
        audio: number;
        video: number;
      };
    };
  }>;

  updateSdp(
    localOffer: RTCSessionDescriptionInit,
    remoteAnswerSdp: string,
  ): void;

  send(data: string | Uint8Array): void;

  close(): void;
}

export interface IRealtimeSocketOptions {
  iceServers?: RTCIceServer[];
  latencyMode?: LatencyMode;
}

export class RealtimeSocket
  extends TypedEventEmitter<IRealtimeSocketCallbacks>
  implements IRealtimeSocket
{
  private _log = _debug('atm0s:realtime-socket');
  private _pConnState: RealtimeSocketState = RealtimeSocketState.Created;
  private _dcState: RealtimeSocketState = RealtimeSocketState.Created;
  private _lc?: RTCPeerConnectionAugmented;
  private _dc?: RTCDataChannel;
  private _sendStreams = new Map<string, SenderTrack>();
  private _recvStreams = new Map<string, ReceiverTrack>();

  private _msg_encoder = new TextEncoder();

  constructor(
    private _urls: string | string[],
    private _options?: IRealtimeSocketOptions,
  ) {
    super();
    const peerConfig: RTCConfiguration = {
      iceServers: this._options?.iceServers || [],
      ...(this._options?.latencyMode &&
        this._options.latencyMode in LatencyMode2MaxPackets && {
          audioJitterBufferMaxPackets:
            LatencyMode2MaxPackets[this._options.latencyMode],
          rtcAudioJitterBufferMaxPackets:
            LatencyMode2MaxPackets[this._options.latencyMode],
        }),
    };
    this._lc = new RTCPeerConnectionAugmented(peerConfig);
    this._dc = this._lc.createDataChannel('data', {
      ordered: false,
      maxPacketLifeTime: 10000,
    });
  }

  public async connect(
    connector: IMediaGatewayConnector,
    config: ISessionConfig,
  ) {
    this._log('connect :: connecting to %s', this._urls);
    this._pConnState = RealtimeSocketState.Connecting;

    const serverUrl = await connector.selectFromUrls(this._urls);
    this._log('connect :: try connect to media server:', serverUrl);

    this._lc!.ontrack = (event: RTCTrackEvent) => {
      if (event.streams.length === 0) {
        this._log('connect :: no stream found');
        return;
      }
      const stream = event.streams[0];
      const track = event.track;

      this._log('connect :: received track:', track, stream);

      for (const receiver of this._recvStreams.values()) {
        if (
          receiver.info.remoteId === stream?.id &&
          receiver.stream.getTracks().length === 0 &&
          receiver.info.kind === track.kind
        ) {
          receiver.stream = stream;
          receiver.stream.addTrack(track);
          // this.emit(RealtimeSocketEvent.Message, receiver);
        }
      }
    };

    this._lc!.onconnectionstatechange = () => {
      this._log('connection state changed:', this._lc!.connectionState);
      switch (this._lc!.connectionState) {
        case 'connected':
          this.setConnState(RealtimeSocketState.Connected);
          break;
        case 'disconnected':
          this.setConnState(RealtimeSocketState.Disconnected);
          break;
        case 'failed':
          this.setConnState(RealtimeSocketState.Failed);
          throw new Error('Peer Connection failed');
          break;
        case 'closed':
          this.setConnState(RealtimeSocketState.Closed);
          break;
      }
    };

    this._dc!.onmessage = (event) => {
      this.emit(RealtimeSocketEvent.Message, event.data);
    };
    this._dc!.onopen = () => {
      this.setDcState(RealtimeSocketState.Connected);
      this._log('datachannel connect :: opended');
    };
    this._dc!.onerror = (err) => {
      this.setDcState(RealtimeSocketState.Failed);
      this._log('datachannel connect :: error:', err);
    };
    this._dc!.onclose = () => {
      this.setDcState(RealtimeSocketState.Closed);
      this._log('datachannel connect :: closed');
    };

    const offer = await this._lc!.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: false,
    });
    this._log('connect :: created offer:', offer);

    const res = await connector.connect(serverUrl, {
      // TODO: consider remove session config dependency
      room: config.roomId,
      peer: config.peerId,
      token: config.token,
      sdp: offer.sdp!,
      // mix_minus_audio: config.mix_minus_audio?.mode,
      // codecs: config.codecs,
      senders: Array.from(this._sendStreams.values()).map((s) => ({
        uuid: s.uuid,
        label: s.info.label,
        kind: s.info.kind,
        screen: s.info.screen,
      })),
      receivers: {
        audio: Array.from(this._recvStreams.values()).filter(
          (s) => s.info.kind === StreamKinds.AUDIO,
        ).length,
        video: Array.from(this._recvStreams.values()).filter(
          (s) => s.info.kind === StreamKinds.VIDEO,
        ).length,
      },
    });
    if (!res.status) {
      this._log('connect :: failed to connect:', res);
      throw new Error(res.error);
    }
    const nodeId = res.data.node_id;
    const connId = res.data.conn_id;
    const sdp = res.data.sdp;

    this._log('connect :: received answer:', nodeId, connId, sdp);
    this._lc!.onicecandidate = async (ice) => {
      if (ice && ice.candidate)
        await connector.iceCandidate(serverUrl, nodeId, connId, ice);
    };
    this._lc!.setLocalDescription(offer);
    this._lc!.setRemoteDescription(
      new RTCSessionDescription({ sdp, type: 'answer' }),
    );
  }

  private setConnState(state: RealtimeSocketState) {
    this._pConnState = state;
    this.emit('peer_state', this._pConnState);
  }

  private setDcState(state: RealtimeSocketState) {
    this._dcState = state;
    this.emit('dc_state', this._dcState);
  }

  // public async reconnect(connector: IMediaGatewayConnector) {
  //   // TODO: implement reconnect
  //   // this.close();
  //   // this.connect(connector);
  // }

  public createReceiverTrack(id: string, kind: StreamKinds): ReceiverTrack {
    this._log('createReceiverTrack :: kind:', kind);
    const stream = new MediaStream();
    this._lc?.addTransceiver(kind, {
      direction: 'recvonly',
    });
    const track = new ReceiverTrack(stream, {
      remoteId: id,
      kind: kind,
    });
    this._recvStreams.set(track.uuid, track);
    // TODO: Latency mode
    return track;
  }

  public createSenderTrack(cfg: SenderConfig): SenderTrack {
    this._log('createSenderTrack :: kind:', cfg.kind);
    const track = getTrack(cfg.stream, cfg.kind);
    const label = track?.label || 'not-supported';

    const transceiver = this._lc?.addTransceiver(track!, {
      direction: 'sendonly',
      streams: [cfg.stream!],
      preferredCodecs: {
        kind: cfg.kind,
        codecs: cfg.preferredCodecs!,
      },
      simulcast: cfg.simulcast,
      maxBitrate: cfg.maxBitrate,
      isScreen: cfg.screen,
    });
    const senderTrack = new SenderTrack(
      cfg.stream || null,
      {
        label: label,
        kind: cfg.kind,
        name: cfg.name,
        screen: !!cfg.screen,
      },
      transceiver,
    );
    this._sendStreams.set(senderTrack.uuid, senderTrack);
    return senderTrack;
  }

  public async generateOffer() {
    const offer = await this._lc!.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    const meta = {
      sdp: offer.sdp!,
      senders: Array.from(this._sendStreams.values()).map((s) => ({
        uuid: s.uuid,
        label: s.info.label,
        kind: s.info.kind,
        screen: s.info.screen,
      })),
      receivers: {
        audio: Array.from(this._recvStreams.values()).filter(
          (s) => s.info.kind === StreamKinds.AUDIO,
        ).length,
        video: Array.from(this._recvStreams.values()).filter(
          (s) => s.info.kind === StreamKinds.VIDEO,
        ).length,
      },
    };
    return { offer, meta };
  }

  public updateSdp(
    localOffer: RTCSessionDescriptionInit,
    remoteAnswerSdp: string,
  ) {
    this._log('updateSdp :: local offer:', localOffer);
    this._log('updateSdp :: remote answer sdp:', remoteAnswerSdp);
    this._lc!.setLocalDescription(localOffer);
    this._lc!.setRemoteDescription(
      new RTCSessionDescription({ sdp: remoteAnswerSdp, type: 'answer' }),
    );
  }

  public send(data: string | Uint8Array) {
    const msg =
      typeof data !== 'string' ? data : this._msg_encoder.encode(data);
    if (data.length < 1000) {
      this._dc?.send(msg);
    } else {
      const compressed = pako.deflate(msg);
      this._dc?.send(compressed);
    }
  }

  async close() {
    this._dc?.close();
    await delay(500);
    this._lc?.close();
  }
}
