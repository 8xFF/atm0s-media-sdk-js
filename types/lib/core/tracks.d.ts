import type { ReceiverInfo } from '../interfaces/receiver';
import type { IReceiverTrackCallbacks, SenderTrackInfo } from '../interfaces/tracks';
import { TypedEventEmitter } from '../utils/typed-event-emitter';
export declare class SenderTrack {
    info: SenderTrackInfo;
    transceiver?: RTCRtpTransceiver | undefined;
    private static seed;
    uuid: string;
    stream: MediaStream | null;
    constructor(info: SenderTrackInfo, transceiver?: RTCRtpTransceiver | undefined);
    replaceStream(stream: MediaStream | null): void;
    getTrack(): MediaStreamTrack | undefined;
}
export declare class ReceiverTrack extends TypedEventEmitter<IReceiverTrackCallbacks> {
    info: ReceiverInfo;
    transceiver?: RTCRtpTransceiver | undefined;
    private static seed;
    uuid: string;
    hasTrack: boolean;
    stream: MediaStream;
    constructor(info: ReceiverInfo, transceiver?: RTCRtpTransceiver | undefined);
    getTrack(): MediaStreamTrack | undefined;
    addTrack(track: MediaStreamTrack): void;
}
//# sourceMappingURL=tracks.d.ts.map