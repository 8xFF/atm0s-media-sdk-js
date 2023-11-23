import { TypedEventEmitter } from '../utils/typed-event-emitter';
import { StreamKinds } from '../utils/types';
import { ReceiverTrack, SenderTrack } from './tracks';
import type { IMediaGatewayConnector } from '../interfaces/gateway';
import type { IRealtimeSocketCallbacks, IRealtimeSocket, IRealtimeSocketOptions } from '../interfaces/rtsocket';
import type { ISessionConfig } from '../interfaces/session';
import type { SenderConfig } from '../interfaces/sender';
export declare enum RealtimeSocketState {
    Created = "created",
    Connecting = "connecting",
    Connected = "connected",
    Disconnected = "disconnected",
    Failed = "failed",
    Closed = "closed"
}
export declare class RealtimeSocket extends TypedEventEmitter<IRealtimeSocketCallbacks> implements IRealtimeSocket {
    private _urls;
    private _options?;
    private logger;
    private _pConnState;
    private _dcState;
    private _lc;
    private _dc;
    private _sendStreams;
    private _recvStreams;
    private _msg_encoder;
    constructor(_urls: string | string[], _options?: IRealtimeSocketOptions | undefined);
    connect(connector: IMediaGatewayConnector, config: ISessionConfig): Promise<void>;
    private setConnState;
    private setDcState;
    createReceiverTrack(id: string, kind: StreamKinds): ReceiverTrack;
    createSenderTrack(cfg: SenderConfig): SenderTrack;
    generateOffer(): Promise<{
        offer: RTCSessionDescriptionInit;
        meta: {
            sdp: string;
            senders: {
                uuid: string;
                label: string;
                kind: StreamKinds;
                screen: boolean | undefined;
            }[];
            receivers: {
                audio: number;
                video: number;
            };
        };
    }>;
    updateSdp(localOffer: RTCSessionDescriptionInit, remoteAnswerSdp: string): void;
    send(data: string): void;
    close(): Promise<void>;
}
//# sourceMappingURL=socket.d.ts.map