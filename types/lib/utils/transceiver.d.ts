import { StreamKinds, type Codecs } from './types';
import { LatencyMode } from './types';
export interface RTCRtpTransceiverInitExtended {
    kind: StreamKinds;
    simulcast?: boolean;
    isScreen?: boolean;
    maxBitrate?: number;
    preferredCodecs?: Codecs[];
}
export declare function addTransceiverSimulcast(transceiver: RTCRtpTransceiver, opts?: {
    maxBitrate?: number;
    isScreen?: boolean;
}): RTCRtpTransceiver;
export declare function addTransceiverPreferredCodecs(transceiver: RTCRtpTransceiver, kind: StreamKinds, preffered: Codecs[]): RTCRtpTransceiver;
export declare function configLatencyMode(transceiver: RTCRtpTransceiver, latencyMode: LatencyMode): void;
//# sourceMappingURL=transceiver.d.ts.map