import type { StreamKinds } from './types';
export interface RTCRtpTransceiverInitExtended {
    kind: StreamKinds;
    simulcast?: boolean;
    isScreen?: boolean;
    maxBitrate?: number;
    preferredCodecs?: string[];
}
export declare function addTransceiverConfigs(transceiver: RTCRtpTransceiver, init?: RTCRtpTransceiverInitExtended): RTCRtpTransceiver;
//# sourceMappingURL=rtc-peer.d.ts.map