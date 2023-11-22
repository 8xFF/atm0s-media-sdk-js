import { httpGet, httpPost } from '../utils/http';
import _debug from 'debug';

export interface IConnectConfig {
  room: string;
  peer: string;
  token: string;
  sdp: string;
  mix_minus_audio?: string;
  codecs?: string[];
  senders: {
    uuid: string;
    label: string;
    kind: string;
    simulcast?: boolean;
    max_bitrate?: number;
    content_hint?: string;
    screen?: boolean;
  }[];
  receivers: {
    audio: number;
    video: number;
  };
}

export interface IConnectResponse {
  status: boolean;
  data: {
    node_id: number;
    conn_id: string;
    sdp: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

/**
 * Represents a media server gateway connector.
 */
export interface IMediaGatewayConnector {
  /**
   * Selects a media stream from the given URLs.
   * @param urls - The URLs of the media streams.
   * @returns A promise that resolves to the selected media stream.
   */
  selectFromUrls(urls: string | string[]): Promise<string>;

  /**
   * Connects to the media server using the provided configuration.
   * @param url - The URL of the media server.
   * @param config - The connection configuration.
   */
  connect(url: string, config: IConnectConfig): Promise<IConnectResponse>;

  /**
   * Sends a ice candidate update to the media server.
   * @param url - The URL of the media server.
   * @param nodeId - The ID of the node.
   * @param connId - The ID of the connection.
   * @param ice - The ICE candidate event.
   */
  iceCandidate(
    url: string,
    nodeId: number,
    connId: string,
    ice: RTCPeerConnectionIceEvent,
  ): void;
}

export class MediaGatewayConnector implements IMediaGatewayConnector {
  private _log = _debug('atm0s:media-server');

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
        this._log('selectFromUrls :: error:', waiting_urls, url, err);
      }
    }

    throw new Error('No available media server');
  }

  async connect(
    url: string,
    config: IConnectConfig,
  ): Promise<IConnectResponse> {
    this._log('connect :: connect to media server:', this._url);
    return httpPost<IConnectResponse>(url + '/webrtc/connect', config);
  }

  async iceCandidate(
    url: string,
    nodeId: number,
    connId: string,
    ice: RTCPeerConnectionIceEvent,
  ) {
    this._log('iceCandidate :: ice candidate to media server:', url);

    const body = {
      node_id: nodeId,
      conn_id: connId,
      candidate: ice.candidate?.candidate || '',
      sdp_mid: ice.candidate?.sdpMid || '',
      sdp_mline_index: ice.candidate?.sdpMLineIndex || 0,
      username_fragment: ice.candidate?.usernameFragment || '',
    };

    const res = await httpPost(url + '/webrtc/ice_remote', body);
    this._log('iceCandidate :: ice candidate response:', res);
  }
}
