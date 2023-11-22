import type { ReceiverInfo, SenderInfo } from '../utils/interface';
export declare class SenderTrack {
    stream: MediaStream | null;
    info: SenderInfo;
    transceiver?: RTCRtpTransceiver | undefined;
    private static seed;
    uuid: string;
    constructor(stream: MediaStream | null, info: SenderInfo, transceiver?: RTCRtpTransceiver | undefined);
    replaceStream(stream: MediaStream | null): void;
    getTrack(): MediaStreamTrack | undefined;
}
export declare class ReceiverTrack {
    stream: MediaStream;
    info: ReceiverInfo;
    private static seed;
    uuid: string;
    constructor(stream: MediaStream, info: ReceiverInfo);
    getTrack(): MediaStreamTrack | undefined;
}
//# sourceMappingURL=tracks.d.ts.map