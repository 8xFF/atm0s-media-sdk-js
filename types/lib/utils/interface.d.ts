import type { SenderConfig, StreamKinds } from './types';
export interface GatewayConnector {
    request(method: string, params: any): Promise<{
        status: boolean;
        data: any;
    }>;
}
export type SenderInfo = {
    label: string;
    kind: StreamKinds;
    name: string;
    screen: boolean;
};
export type ReceiverInfo = {
    remoteId: string;
    kind: StreamKinds;
};
export interface ISessionConfig {
    roomId: string;
    peerId: string;
    token: string;
    senders: SenderConfig[];
    receivers: {
        audio: number;
        video: number;
    };
}
//# sourceMappingURL=interface.d.ts.map