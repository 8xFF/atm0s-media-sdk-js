import { StreamKinds, type Codecs } from './types';
import { LatencyMode } from './types';
export interface RTCRtpTransceiverInitExtended {
    kind: StreamKinds;
    simulcast?: boolean;
    isScreen?: boolean;
    maxBitrate?: number;
    preferredCodecs?: Codecs[];
}
/**
 * Adds simulcast settings to an RTCRtpTransceiver.
 * @param transceiver - The RTCRtpTransceiver to add simulcast settings to.
 * @param opts - Optional parameters for simulcast settings.
 * @param opts.maxBitrate - The maximum bitrate for the simulcast streams.
 * @param opts.isScreen - Indicates whether the simulcast is for screen sharing.
 * @returns The modified RTCRtpTransceiver with simulcast settings.
 */
export declare function addTransceiverSimulcast(transceiver: RTCRtpTransceiver, opts?: {
    maxBitrate?: number;
    isScreen?: boolean;
}): RTCRtpTransceiver;
/**
 * Adds preferred codecs to the given RTCRtpTransceiver based on the specified kind of stream.
 * @param transceiver - The RTCRtpTransceiver to add preferred codecs to.
 * @param kind - The kind of stream (e.g., "audio" or "video").
 * @param preferred - An array of preferred codecs.
 * @returns The modified RTCRtpTransceiver with the preferred codecs added.
 */
export declare function addTransceiverPreferredCodecs(transceiver: RTCRtpTransceiver, kind: StreamKinds, preferred: Codecs[]): RTCRtpTransceiver;
export declare function configLatencyMode(transceiver: RTCRtpTransceiver, latencyMode: LatencyMode): void;
//# sourceMappingURL=transceiver.d.ts.map