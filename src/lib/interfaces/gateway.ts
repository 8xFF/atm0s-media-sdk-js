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
  error: string;
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
  iceCandidate(url: string, nodeId: number, connId: string, ice: RTCPeerConnectionIceEvent): void;
}
