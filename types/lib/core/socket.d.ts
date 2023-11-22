import type { IMediaGatewayConnector } from './gateway';
import type { ISessionConfig } from '../utils/interface';
import { TypedEventEmitter } from '../utils/typed-event-emitter';
import { LatencyMode, StreamKinds, type SenderConfig } from '../utils/types';
import { ReceiverTrack, SenderTrack } from './tracks';
export declare enum RealtimeSocketEvent {
    Message = "message",
    State = "state"
}
export declare enum RealtimeSocketState {
    Created = "created",
    Connecting = "connecting",
    Connected = "connected",
    Disconnected = "disconnected",
    Failed = "failed",
    Closed = "closed"
}
export interface IRealtimeSocketCallbacks {
    message: (data: any) => void;
    peer_state: (state: RealtimeSocketState) => void;
    dc_state: (state: RealtimeSocketState) => void;
}
export interface IRealtimeSocket extends TypedEventEmitter<IRealtimeSocketCallbacks> {
    connect(connector: IMediaGatewayConnector, config: ISessionConfig): Promise<void>;
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
                screen: boolean;
            }[];
            receivers: {
                audio: number;
                video: number;
            };
        };
    }>;
    updateSdp(localOffer: RTCSessionDescriptionInit, remoteAnswerSdp: string): void;
    send(data: string | Uint8Array): void;
    close(): void;
}
export interface IRealtimeSocketOptions {
    iceServers?: RTCIceServer[];
    latencyMode?: LatencyMode;
}
export declare class RealtimeSocket extends TypedEventEmitter<IRealtimeSocketCallbacks> implements IRealtimeSocket {
    private _urls;
    private _options?;
    private _log;
    private _pConnState;
    private _dcState;
    private _lc?;
    private _dc?;
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
                screen: boolean;
            }[];
            receivers: {
                audio: number;
                video: number;
            };
        };
    }>;
    updateSdp(localOffer: RTCSessionDescriptionInit, remoteAnswerSdp: string): void;
    send(data: string | Uint8Array): void;
    close(): Promise<void>;
}
//# sourceMappingURL=socket.d.ts.map