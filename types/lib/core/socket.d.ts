import { TypedEventEmitter } from '../utils/typed-event-emitter';
import { Codecs, StreamKinds, LatencyMode } from '../utils/types';
import { ReceiverTrack, SenderTrack } from './tracks';
import type { IMediaGatewayConnector } from '../interfaces/gateway';
import { type IRealtimeSocketCallbacks, type IRealtimeSocket, type IRealtimeSocketOptions } from '../interfaces/rtsocket';
import type { ISessionConfig } from '../interfaces/session';
import type { SenderConfig } from '../interfaces/sender';
export declare class RealtimeSocket extends TypedEventEmitter<IRealtimeSocketCallbacks> implements IRealtimeSocket {
    private _urls;
    private _connector;
    private _options?;
    private logger;
    private _pConnState;
    private _dcState;
    private _pc;
    private _dc;
    private _sendStreams;
    private _recvStreams;
    private _msg_encoder;
    private _connected;
    private _nodeId;
    private _connId;
    constructor(_urls: string | string[], _connector: IMediaGatewayConnector, _options?: IRealtimeSocketOptions | undefined);
    connect(config: ISessionConfig): Promise<void>;
    private getActiveSendTracks;
    private setConnState;
    private setDcState;
    reconnect(): Promise<void>;
    createReceiverTrack(id: string, kind: StreamKinds, opts?: {
        codecs?: Codecs[];
        latencyMode?: LatencyMode;
    }): ReceiverTrack;
    createSenderTrack(cfg: SenderConfig): SenderTrack;
    private onReceiverTrackStopped;
    private onSenderTrackStopped;
    generateOffer(): Promise<{
        offer: RTCSessionDescriptionInit;
        meta: {
            sdp: string;
            senders: {
                uuid: string;
                label: string;
                kind: StreamKinds;
                screen: boolean | undefined;
                name: string;
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