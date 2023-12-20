import type { IConnectConfig, IConnectResponse, IMediaGatewayConnector } from '../interfaces/gateway';
import { httpPost } from '../utils/http';
import { getLogger } from '../utils/logger';

export class HttpGatewayConnector implements IMediaGatewayConnector {
  private logger = getLogger('atm0s:media-server');

  constructor(private _url?: string) {}

  public get url(): string | undefined {
    return this._url;
  }

  async connect(url: string, config: IConnectConfig): Promise<IConnectResponse> {
    this.logger.log('connect :: connect to media server:', url);
    return httpPost<IConnectResponse>(url + '/webrtc/connect', config);
  }

  async restartIce(url: string, nodeId: number, connId: string, sdp: string): Promise<IConnectResponse> {
    this.logger.log('reconnect :: reconnect to media server:', url);
    return httpPost<IConnectResponse>(url + '/webrtc/ice_restart', { node_id: nodeId, conn_id: connId, sdp });
  }

  async iceCandidate(url: string, nodeId: number, connId: string, ice: RTCPeerConnectionIceEvent) {
    this.logger.log('iceCandidate :: ice candidate to media server:', url);

    const body = {
      node_id: nodeId,
      conn_id: connId,
      candidate: ice.candidate?.candidate || '',
      sdp_mid: ice.candidate?.sdpMid || '',
      sdp_mline_index: ice.candidate?.sdpMLineIndex || 0,
      username_fragment: ice.candidate?.usernameFragment || '',
    };

    const res = await httpPost(url + '/webrtc/ice_remote', body);
    this.logger.log('iceCandidate :: ice candidate response:', res);
  }
}
