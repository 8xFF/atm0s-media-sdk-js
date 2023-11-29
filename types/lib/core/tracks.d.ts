import type { ReceiverInfo } from '../interfaces/receiver';
import type { IReceiverTrack, IReceiverTrackCallbacks, ISenderTrack, ISenderTrackCallbacks, SenderTrackInfo } from '../interfaces/tracks';
import { TypedEventEmitter } from '../utils/typed-event-emitter';
export declare class SenderTrack extends TypedEventEmitter<ISenderTrackCallbacks> implements ISenderTrack {
    info: SenderTrackInfo;
    private catalog;
    transceiver?: RTCRtpTransceiver | undefined;
    private static seed;
    uuid: string;
    stream: MediaStream | null;
    get trackId(): string | undefined;
    constructor(info: SenderTrackInfo, catalog: Map<string, ISenderTrack>, transceiver?: RTCRtpTransceiver | undefined);
    replaceStream(stream: MediaStream | null): void;
    getTrack(): MediaStreamTrack | undefined;
    stop(): void;
    pause(): void;
}
export declare class ReceiverTrack extends TypedEventEmitter<IReceiverTrackCallbacks> implements IReceiverTrack {
    info: ReceiverInfo;
    private catalog;
    transceiver?: RTCRtpTransceiver | undefined;
    private static seed;
    uuid: string;
    hasTrack: boolean;
    stream: MediaStream;
    get trackId(): string | undefined;
    constructor(info: ReceiverInfo, catalog: Map<string, IReceiverTrack>, transceiver?: RTCRtpTransceiver | undefined);
    getTrack(): MediaStreamTrack | undefined;
    addTrack(track: MediaStreamTrack): void;
    stop(): void;
    pause(): void;
}
//# sourceMappingURL=tracks.d.ts.map