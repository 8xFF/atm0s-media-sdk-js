import { TypedEventEmitter } from '../utils/typed-event-emitter';
import { Codecs, StreamKinds, LatencyMode } from '../utils/types';
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
import { configPeerLatencyMode } from '../utils/latency-mode';
import type { IReceiverTrack, ISenderTrack } from '../interfaces';

export class RealtimeSocket extends TypedEventEmitter<IRealtimeSocketCallbacks> implements IRealtimeSocket {
  private logger = getLogger('atm0s:realtime-socket');
  private _pConnState: RealtimeSocketState = RealtimeSocketState.Created;
  private _dcState: RealtimeSocketState = RealtimeSocketState.Created;
  private _lc: RTCPeerConnection;
  private _dc: RTCDataChannel;
  private _sendStreams = new Map<string, ISenderTrack>();
  private _recvStreams = new Map<string, IReceiverTrack>();

  private _msg_encoder = new TextEncoder();
  private _connected = false;

  constructor(
    private _urls: string | string[],
    private _options?: IRealtimeSocketOptions,
  ) {
    super();
    const peerConfig: RTCConfiguration = {
      iceServers: this._options?.iceServers || [],
    };
    configPeerLatencyMode(peerConfig, this._options?.latencyMode);
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

    this._lc.oniceconnectionstatechange = () => {
      this.logger.log('ice connection state changed:', this._lc.iceConnectionState);
      switch (this._lc.iceConnectionState) {
        case 'connected':
          if (this._connected) {
            this.setConnState(RealtimeSocketState.Reconnected);
          }
          break;
        case 'disconnected':
          this.setConnState(RealtimeSocketState.Reconnecting);
          // TODO: Restart ICE
          break;
      }
    };

    this._dc.onmessage = (event) => {
      this.emit('message', event.data);
    };
    this._dc.onopen = () => {
      this.setDcState(RealtimeSocketState.Connected);
      this._connected = true;
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

  public async connect(connector: IMediaGatewayConnector, config: ISessionConfig) {
    this.logger.log('connect :: connecting to %s', this._urls);
    this._pConnState = RealtimeSocketState.Connecting;

    const serverUrl = await connector.selectFromUrls(this._urls);
    this.logger.log('connect :: try connect to media server:', serverUrl);

    const offer = await this._lc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    this.logger.log('connect :: transceivers:', this._lc.getTransceivers());
    this.logger.debug('connect :: created offer:', offer.sdp);

    const res = await connector.connect(serverUrl, {
      room: config.roomId,
      peer: config.peerId,
      token: config.token,
      sdp: offer.sdp!,
      mix_minus_audio: config.mixMinusAudio?.mode,
      codecs: config.codecs,
      senders: this.getActiveSendTracks().map((s) => ({
        uuid: s.uuid,
        label: s.label || 'unknown',
        kind: s.kind,
        screen: s.screen,
        name: s.name,
      })),
      receivers: {
        audio: Array.from(this._recvStreams.values()).filter((s) => s.info.kind === StreamKinds.AUDIO).length,
        video: Array.from(this._recvStreams.values()).filter((s) => s.info.kind === StreamKinds.VIDEO).length,
      },
    });
    if (!res.status) {
      this.logger.error('connect :: failed to connect:', res);
      throw new Error(res.error);
    }
    const nodeId = res.data.node_id;
    const connId = res.data.conn_id;
    const sdp = res.data.sdp;

    this.logger.debug('connect :: received answer:', nodeId, connId, sdp);
    this._lc.onicecandidate = async (ice) => {
      if (ice && ice.candidate) await connector.iceCandidate(serverUrl, nodeId, connId, ice);
    };
    this._lc.setLocalDescription(offer);
    this._lc.setRemoteDescription(new RTCSessionDescription({ sdp, type: 'answer' }));
  }

  private getActiveSendTracks() {
    return Array.from(this._sendStreams.values());
  }

  private setConnState(state: RealtimeSocketState) {
    this._pConnState = state;
    this.emit('peer_state', this._pConnState);
  }

  private setDcState(state: RealtimeSocketState) {
    this.logger.log('setDcState :: state:', state);
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
      this._recvStreams,
      transceiver,
    );
    return track;
  }

  public createSenderTrack(cfg: SenderConfig): SenderTrack {
    this.logger.log('createSenderTrack :: cfg:', cfg);
    const stream = cfg.stream || new MediaStream();
    const track = getTrack(stream, cfg.kind);
    const label = track?.label || 'not-supported';

    const transceiver = this._lc.addTransceiver(track || cfg.kind, {
      direction: 'sendonly',
      streams: [stream],
      sendEncodings: cfg.maxBitrate ? [{ maxBitrate: cfg.maxBitrate }] : undefined,
    });
    return new SenderTrack({ ...cfg, stream, label }, this._sendStreams, transceiver);
  }

  public async generateOffer() {
    const offer = await this._lc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    const meta = {
      sdp: offer.sdp!,
      senders: this.getActiveSendTracks().map((s) => ({
        uuid: s.uuid,
        label: s.label || 'unknown',
        kind: s.kind,
        screen: s.screen,
        name: s.name,
      })),
      receivers: {
        audio: Array.from(this._recvStreams.values()).filter((s) => s.info.kind === StreamKinds.AUDIO).length,
        video: Array.from(this._recvStreams.values()).filter((s) => s.info.kind === StreamKinds.VIDEO).length,
      },
    };
    return { offer, meta };
  }

  public updateSdp(localOffer: RTCSessionDescriptionInit, remoteAnswerSdp: string) {
    this.logger.debug('updateSdp :: local offer:', localOffer.sdp);
    this.logger.debug('updateSdp :: remote answer sdp:', remoteAnswerSdp);
    this._lc.setLocalDescription(localOffer);
    this._lc.setRemoteDescription(new RTCSessionDescription({ sdp: remoteAnswerSdp, type: 'answer' }));
  }

  public send(data: string) {
    this.logger.debug('send :: data:', data);
    if (data.length < 1000) {
      this._dc?.send(data);
    } else {
      const compressed = pako.deflate(this._msg_encoder.encode(data));
      this.logger.debug('compress for sending', data.length, compressed.length);
      this._dc?.send(compressed);
    }
  }

  async close() {
    this._dc?.close();
    await delay(500);
    this._lc?.close();
  }
}
