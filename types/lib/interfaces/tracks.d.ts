import type { TypedEventEmitter } from '../utils/typed-event-emitter';
import type { StreamKinds } from '../utils/types';
import type { ReceiverInfo } from './receiver';
export interface IReceiverTrackCallbacks {
    track_added: (track: MediaStreamTrack) => void;
    stopped: (uuid: string) => void;
}
export interface ISenderTrackCallbacks {
    stopped: (uuid: string) => void;
}
export interface ISenderTrack {
    uuid: string;
    transceiver?: RTCRtpTransceiver;
    label?: string;
    kind: StreamKinds;
    name: string;
    screen?: boolean;
    simulcast?: boolean;
    maxBitrate?: number;
    stream: MediaStream | null;
    trackId: string | undefined;
    replaceStream(stream: MediaStream | null, label?: string): void;
    getTrack(): MediaStreamTrack | null | undefined;
    stop(): void;
    pause(): void;
}
export interface IReceiverTrack extends TypedEventEmitter<IReceiverTrackCallbacks> {
    uuid: string;
    info: ReceiverInfo;
    kind: StreamKinds;
    remoteId: string;
    transceiver?: RTCRtpTransceiver;
    hasTrack: boolean;
    stream: MediaStream;
    trackId: string | undefined;
    getTrack(): MediaStreamTrack | null | undefined;
    addTrack(track: MediaStreamTrack): void;
    stop(): void;
    pause(): void;
}
//# sourceMappingURL=tracks.d.ts.map