import { StreamReceiver } from './receiver';
import { StreamSender } from './sender';
import { StreamKinds } from './utils/types';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import type { IMediaGatewayConnector } from './interfaces/gateway';
import type { IRealtimeSocket } from './interfaces/rtsocket';
import type { ISessionCallbacks, ISessionConfig } from './interfaces/session';
import type { SenderConfig } from './interfaces/sender';
export declare class Session extends TypedEventEmitter<ISessionCallbacks> {
    private _cfg;
    private _socket;
    private _connector;
    private _audioSenders;
    private _videoSenders;
    private _audioReceivers;
    private _videoReceivers;
    private _remotes;
    private logger;
    private _rpc;
    constructor(_cfg: ISessionConfig, _socket: IRealtimeSocket, _connector: IMediaGatewayConnector);
    connect(): Promise<void>;
    createSender(cfg: SenderConfig): Promise<StreamSender>;
    createReceiver(kind: StreamKinds): Promise<StreamReceiver>;
    takeReceiver(kind: StreamKinds): StreamReceiver;
    backReceiver(receiver: StreamReceiver): void;
    getSender(name: string, kind: StreamKinds): StreamSender;
    update: {
        (this: unknown, ...args: [] & any[]): Promise<Promise<void>>;
        cancel: (reason?: any) => void;
    };
    private updateSdp;
    private onStreamEvent;
}
//# sourceMappingURL=session.d.ts.map