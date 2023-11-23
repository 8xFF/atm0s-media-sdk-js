import type { IConnectConfig, IConnectResponse, IMediaGatewayConnector } from '../interfaces/gateway';
export declare class MediaGatewayConnector implements IMediaGatewayConnector {
    private _url?;
    private logger;
    constructor(_url?: string | undefined);
    get url(): string | undefined;
    selectFromUrls(urls: string | string[]): Promise<string>;
    connect(url: string, config: IConnectConfig): Promise<IConnectResponse>;
    iceCandidate(url: string, nodeId: number, connId: string, ice: RTCPeerConnectionIceEvent): Promise<void>;
}
//# sourceMappingURL=gateway.d.ts.map