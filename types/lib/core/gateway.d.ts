import type { IConnectConfig, IConnectResponse, IMediaGatewayConnector } from '../interfaces/gateway';
export declare class HttpGatewayConnector implements IMediaGatewayConnector {
    private _url?;
    private logger;
    constructor(_url?: string | undefined);
    get url(): string | undefined;
    connect(url: string, config: IConnectConfig): Promise<IConnectResponse>;
    restartIce(url: string, nodeId: number, connId: string, sdp: string): Promise<IConnectResponse>;
    iceCandidate(url: string, nodeId: number, connId: string, ice: RTCPeerConnectionIceEvent): Promise<void>;
}
//# sourceMappingURL=gateway.d.ts.map