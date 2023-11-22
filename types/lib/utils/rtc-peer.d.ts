export interface RTCRtpTransceiverInitExtended extends RTCRtpTransceiverInit {
    simulcast?: boolean;
    isScreen?: boolean;
    maxBitrate?: number;
    preferredCodecs?: {
        kind: string;
        codecs: string[];
    };
}
export declare class RTCPeerConnectionAugmented extends RTCPeerConnection {
    constructor(configuration?: RTCConfiguration);
    addTransceiver(trackOrKind: MediaStreamTrack | string, init?: RTCRtpTransceiverInitExtended): RTCRtpTransceiver;
}
//# sourceMappingURL=rtc-peer.d.ts.map