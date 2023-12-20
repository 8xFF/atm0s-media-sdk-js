import type { ISessionCallbacks } from '../interfaces';
export declare enum LogLevel {
    None = 0,
    Error = 1,
    Warn = 2,
    Info = 3,
    Debug = 4
}
export interface RoomStats {
    peers: number;
}
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
export declare enum MixMinusMode {
    AllAudioStreams = "AllAudioStreams",
    ManualAudioStreams = "ManualAudioStreams"
}
export declare enum StreamRemoteScalingType {
    SINGLE = "single",
    SIMULCAST = "simulcast",
    SVC = "svc"
}
export declare enum StreamRemoteStatus {
    New = "new",
    Connecting = "connecting",
    Connected = "connected",
    Reconnecting = "reconnecting",
    Disconnected = "disconnected"
}
export type RemoteStreamQuality = {
    peer: string;
    name: string;
    kind: StreamKinds;
    mos: number;
    slot?: number;
};
export type SessionEvent = keyof ISessionCallbacks;
//# sourceMappingURL=types.d.ts.map