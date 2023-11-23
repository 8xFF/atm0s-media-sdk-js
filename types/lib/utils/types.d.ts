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
export declare enum BitrateControlMode {
    SumBitrateWithClientSide = "SumBitrateWithClientSide",
    SumBitrateOnly = "SumBitrateOnly",
    PerStream = "PerStream"
}
export declare enum StreamReceiverState {
    NoSource = "no_source",
    Connecting = "connecting",
    Live = "live",
    Pause = "paused",
    KeyOnly = "key_only",
    SourceDeactived = "source_deactived"
}
export declare enum MixMinusMode {
    AllAudioStreams = "AllAudioStreams",
    ManualAudioStreams = "ManualAudioStreams"
}
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
export declare enum StreamRemoteEvent {
    STATE = "state",
    CLOSED = "closed"
}
export declare enum StreamRemoteScalingType {
    SINGLE = "single",
    SIMULCAT = "simulcast",
    SVC = "svc"
}
export declare enum StreamRemoteStatus {
    New = "new",
    Connecting = "connecting",
    Connected = "connected",
    Reconnecting = "reconnecting",
    Disconnected = "disconnected"
}
//# sourceMappingURL=types.d.ts.map