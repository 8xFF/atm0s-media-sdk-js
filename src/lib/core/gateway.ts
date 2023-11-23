import type {
  IConnectConfig,
  IConnectResponse,
  IMediaGatewayConnector,
} from '../interfaces/gateway';
import { httpGet, httpPost } from '../utils/http';
import { getLogger } from '../utils/logger';

export class MediaGatewayConnector implements IMediaGatewayConnector {
  private logger = getLogger('atm0s:media-server');

  constructor(private _url?: string) {}

  public get url(): string | undefined {
    return this._url;
  }

  public async selectFromUrls(urls: string | string[]): Promise<string> {
    if (typeof urls === 'string') {
      return (this._url = urls);
    }

    const waiting_urls: { [url: string]: boolean } = {};

    for (const url of urls) {
      waiting_urls[url] = true;
      try {
        const res = await httpGet<{
          status: boolean;
          data: { ready: boolean };
        }>(url + '/healthcheck?ts=' + new Date().getTime());
        if (res.status === true && res.data && res.data.ready === true) {
          return url;
        }
      } catch (err) {
        delete waiting_urls[url];
        this.logger.error('selectFromUrls :: error:', waiting_urls, url, err);
      }
    }

    throw new Error('No available media server');
  }

  async connect(
    url: string,
    config: IConnectConfig,
  ): Promise<IConnectResponse> {
    this.logger.log('connect :: connect to media server:', this._url);
    return httpPost<IConnectResponse>(url + '/webrtc/connect', config);
  }

  async iceCandidate(
    url: string,
    nodeId: number,
    connId: string,
    ice: RTCPeerConnectionIceEvent,
  ) {
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
