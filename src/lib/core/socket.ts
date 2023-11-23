import { TypedEventEmitter } from '../utils/typed-event-emitter';
import {
  Codecs,
  LatencyMode2MaxPackets,
  StreamKinds,
  LatencyMode,
} from '../utils/types';
import { delay, getTrack } from '../utils/shared';
import pako from 'pako';
import { ReceiverTrack, SenderTrack } from './tracks';
import { getLogger } from '../utils/logger';
import type { IMediaGatewayConnector } from '../interfaces/gateway';
import {
  type IRealtimeSocketCallbacks,
  type IRealtimeSocket,
  type IRealtimeSocketOptions,
  RealtimeSocketState,
} from '../interfaces/rtsocket';
import type { ISessionConfig } from '../interfaces/session';
import type { SenderConfig } from '../interfaces/sender';

export class RealtimeSocket
  extends TypedEventEmitter<IRealtimeSocketCallbacks>
  implements IRealtimeSocket
{
  private logger = getLogger('atm0s:realtime-socket');
  private _pConnState: RealtimeSocketState = RealtimeSocketState.Created;
  private _dcState: RealtimeSocketState = RealtimeSocketState.Created;
  private _lc: RTCPeerConnection;
  private _dc: RTCDataChannel;
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
    this._lc = new RTCPeerConnection(peerConfig);
    this._dc = this._lc.createDataChannel('data', {
      ordered: false,
      maxPacketLifeTime: 10000,
    });

    this._lc.ontrack = (event: RTCTrackEvent) => {
      if (event.streams.length === 0) {
        this.logger.log('connect :: no stream found');
        return;
      }
      const stream = event.streams[0];
      const track = event.track;

      this.logger.log('connect :: received track:', track, stream);

      for (const receiver of this._recvStreams.values()) {
        if (
          receiver.info.remoteId === stream?.id &&
          receiver.stream.getTracks().length === 0 &&
          receiver.info.kind === track.kind
        ) {
          receiver.stream = stream;
          receiver.addTrack(track);
        }
      }
    };

    this._lc.onconnectionstatechange = () => {
      this.logger.log('connection state changed:', this._lc.connectionState);
      switch (this._lc.connectionState) {
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

    this._dc.onmessage = (event) => {
      this.emit('message', event.data);
    };
    this._dc.onopen = () => {
      this.setDcState(RealtimeSocketState.Connected);
      this.logger.log('datachannel connect :: opended');
    };
    this._dc.onerror = (err) => {
      this.setDcState(RealtimeSocketState.Failed);
      this.logger.error('datachannel connect :: error:', err);
    };
    this._dc.onclose = () => {
      this.setDcState(RealtimeSocketState.Closed);
      this.logger.log('datachannel connect :: closed');
    };
  }

  public async connect(
    connector: IMediaGatewayConnector,
    config: ISessionConfig,
  ) {
    this.logger.log('connect :: connecting to %s', this._urls);
    this._pConnState = RealtimeSocketState.Connecting;

    const serverUrl = await connector.selectFromUrls(this._urls);
    this.logger.log('connect :: try connect to media server:', serverUrl);

    const offer = await this._lc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    this.logger.log('connect :: transceivers:', this._lc.getTransceivers());
    this.logger.log('connect :: created offer:', offer.sdp);

    const res = await connector.connect(serverUrl, {
      // TODO: consider remove session config dependency
      room: config.roomId,
      peer: config.peerId,
      token: config.token,
      sdp: offer.sdp!,
      mix_minus_audio: config.mixMinusAudio?.mode,
      codecs: config.codecs,
      senders: Array.from(this._sendStreams.values()).map((s) => ({
        uuid: s.uuid,
        label: s.info.label,
        kind: s.info.kind,
        screen: s.info.screen,
        name: s.info.name,
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
      this.logger.error('connect :: failed to connect:', res);
      throw new Error(res.error);
    }
    const nodeId = res.data.node_id;
    const connId = res.data.conn_id;
    const sdp = res.data.sdp;

    this.logger.log('connect :: received answer:', nodeId, connId, sdp);
    this._lc.onicecandidate = async (ice) => {
      if (ice && ice.candidate)
        await connector.iceCandidate(serverUrl, nodeId, connId, ice);
    };
    this._lc.setLocalDescription(offer);
    this._lc.setRemoteDescription(
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

  public createReceiverTrack(
    id: string,
    kind: StreamKinds,
    opts?: {
      codecs?: Codecs[];
      latencyMode?: LatencyMode;
    },
  ): ReceiverTrack {
    this.logger.log('createReceiverTrack :: (id, kind):', id, kind);
    const transceiver = this._lc.addTransceiver(kind, {
      direction: 'recvonly',
    });
    this.logger.debug('createReceiverTrack :: transceiver:', transceiver);
    const track = new ReceiverTrack(
      {
        remoteId: id,
        kind: kind,
        codecs: opts?.codecs,
        latencyMode: opts?.latencyMode,
      },
      transceiver,
    );
    this._recvStreams.set(track.uuid, track);
    return track;
  }

  public createSenderTrack(cfg: SenderConfig): SenderTrack {
    this.logger.log('createSenderTrack :: cfg:', cfg);
    const track = getTrack(cfg.stream, cfg.kind);
    const label = track?.label || 'not-supported';

    const transceiver = this._lc.addTransceiver(track!, {
      direction: 'sendonly',
      streams: [cfg.stream!],
    });
    const senderTrack = new SenderTrack({ ...cfg, label }, transceiver);
    this._sendStreams.set(senderTrack.uuid, senderTrack);
    return senderTrack;
  }

  public async generateOffer() {
    const offer = await this._lc.createOffer({
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
    this.logger.log('updateSdp :: local offer:', localOffer);
    this.logger.log('updateSdp :: remote answer sdp:', remoteAnswerSdp);
    this._lc.setLocalDescription(localOffer);
    this._lc.setRemoteDescription(
      new RTCSessionDescription({ sdp: remoteAnswerSdp, type: 'answer' }),
    );
  }

  public send(data: string) {
    if (data.length < 1000) {
      this._dc?.send(data);
    } else {
      const compressed = pako.deflate(this._msg_encoder.encode(data));
      this._dc?.send(compressed);
    }
  }

  async close() {
    this._dc?.close();
    await delay(500);
    this._lc?.close();
  }
}
