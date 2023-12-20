import type { ReceiverInfo } from '../interfaces/receiver';
import type { IReceiverTrack, IReceiverTrackCallbacks, ISenderTrack, ISenderTrackCallbacks } from '../interfaces/tracks';
import { TypedEventEmitter } from '../utils/typed-event-emitter';
import { StreamKinds } from '../utils/types';
import type { SenderConfig } from '../interfaces';
export declare class SenderTrack extends TypedEventEmitter<ISenderTrackCallbacks> implements ISenderTrack {
    private info;
    transceiver?: RTCRtpTransceiver | undefined;
    private static seed;
    uuid: string;
    stream: MediaStream | null;
    get label(): string | undefined;
    get name(): string;
    get kind(): StreamKinds;
    get screen(): boolean | undefined;
    get simulcast(): boolean | undefined;
    get maxBitrate(): number | undefined;
    get trackId(): string | undefined;
    constructor(info: SenderConfig, transceiver?: RTCRtpTransceiver | undefined);
    replaceStream(stream: MediaStream | null, label?: string): void;
    getTrack(): MediaStreamTrack | undefined;
    stop(): void;
    pause(): void;
}
export declare class ReceiverTrack extends TypedEventEmitter<IReceiverTrackCallbacks> implements IReceiverTrack {
    info: ReceiverInfo;
    transceiver?: RTCRtpTransceiver | undefined;
    private static seed;
    uuid: string;
    hasTrack: boolean;
    stream: MediaStream;
    get trackId(): string | undefined;
    get kind(): StreamKinds;
    get remoteId(): string;
    constructor(info: ReceiverInfo, transceiver?: RTCRtpTransceiver | undefined);
    getTrack(): MediaStreamTrack | undefined;
    addTrack(track: MediaStreamTrack): void;
    stop(): void;
    pause(): void;
}
//# sourceMappingURL=tracks.d.ts.map