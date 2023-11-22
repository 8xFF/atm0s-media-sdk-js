export declare enum StreamKinds {
    AUDIO = "audio",
    VIDEO = "video"
}
export declare enum Codecs {
    OPUS = "OPUS",
    VP8 = "VP8",
    VP9 = "VP9",
    H264 = "H264"
}
export declare enum ContentHint {
    None = "none",
    Motion = "motion",
    Detail = "detail"
}
export type AnyFunction = (...args: any[]) => any;
export declare enum LatencyMode {
    UltraLow = "ultra-low",
    Default = "default",
    Smooth200 = "smooth-200",
    Smooth500 = "smooth-500",
    Smooth800 = "smooth-800",
    Smooth1000 = "smooth-1000",
    Smooth2000 = "smooth-2000"
}
export type SenderConfig = {
    stream?: MediaStream | null;
    name: string;
    kind: StreamKinds;
    preferredCodecs?: Codecs[];
    simulcast?: boolean;
    maxBitrate?: number;
    contentHint?: ContentHint;
    screen?: boolean;
};
/**
 * Mapping of latency modes to maximum packets.
 * This is to configure Audio Jitter Buffer Max Packets for React Native WebRTC.
 *
 */
export declare const LatencyMode2MaxPackets: {
    "ultra-low": number[];
    "smooth-200": number[];
    "smooth-500": number[];
    "smooth-800": number[];
    "smooth-1000": number[];
    "smooth-2000": number[];
    default: undefined[];
};
/**
 * Mapping of latency modes to playout delay hints. Also for React Native WebRTC, maybe?
 */
export declare const LatencyMode2DelayHint: {
    "ultra-low": number;
    "smooth-200": number;
    "smooth-500": number;
    "smooth-800": number;
    "smooth-1000": number;
    "smooth-2000": number;
    default: undefined;
};
//# sourceMappingURL=types.d.ts.map