import type { IMediaGatewayConnector } from './core/gateway';
import type { ISessionConfig } from './utils/interface';
import { StreamReceiver } from './receiver';
import { StreamSender } from './sender';
import { type IRealtimeSocket } from './core/socket';
import { StreamKinds, type SenderConfig } from './utils/types';
export declare class Session {
    private _cfg;
    private _socket;
    private _connector;
    private _audioSenders;
    private _videoSenders;
    private _audioReceivers;
    private _videoReceivers;
    private _log;
    private _rpc;
    constructor(_cfg: ISessionConfig, _socket: IRealtimeSocket, _connector: IMediaGatewayConnector);
    connect(): Promise<void>;
    createSender(cfg: SenderConfig): Promise<StreamSender>;
    createReceiver(kind: StreamKinds): Promise<StreamReceiver>;
    takeReceiver(kind: StreamKinds): Promise<StreamReceiver>;
    backReceiver(receiver: StreamReceiver): Promise<void>;
    getSender(name: string, kind: StreamKinds): Promise<StreamSender>;
    update: {
        (this: unknown, ...args: [] & any[]): Promise<Promise<void>>;
        cancel: (reason?: any) => void;
    };
    private updateSdp;
}
//# sourceMappingURL=session.d.ts.map