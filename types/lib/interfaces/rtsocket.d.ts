import { LatencyMode, StreamKinds } from '../utils/types';
import { TypedEventEmitter } from '../utils/typed-event-emitter';
import type { RealtimeSocketState } from '../core/socket';
import type { ReceiverTrack, SenderTrack } from '../core/tracks';
import type { IMediaGatewayConnector } from './gateway';
import type { ISessionConfig } from './session';
import type { SenderConfig } from './sender';
export interface IRealtimeSocketCallbacks {
    message: <T>(data: T) => void;
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
                screen?: boolean;
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
//# sourceMappingURL=rtsocket.d.ts.map