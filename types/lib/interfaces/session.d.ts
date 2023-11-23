import type { StreamRemote } from '../remote';
import type { BitrateControlMode, Codecs, MixMinusMode } from '../utils/types';
import type { SenderConfig } from './sender';
export interface ISessionCallbacks {
    mystream_added: (stream: StreamRemote) => void;
    mystream_removed: (stream: StreamRemote) => void;
    mystream_updated: (stream: StreamRemote) => void;
    stream_added: (stream: StreamRemote) => void;
    stream_removed: (stream: StreamRemote) => void;
    stream_updated: (stream: StreamRemote) => void;
}
export interface ISessionConfig {
    roomId: string;
    peerId: string;
    token: string;
    senders: SenderConfig[];
    receivers: {
        audio: number;
        video: number;
    };
    mixMinusAudio?: {
        elements?: [HTMLAudioElement, HTMLAudioElement, HTMLAudioElement];
        mode: MixMinusMode;
    };
    latencyMode?: LatencyMode;
    iceServers?: [{
        urls: string;
        username?: string;
        credential?: string;
    }];
    codecs?: Codecs[];
    bitrateControlMode?: BitrateControlMode;
}
//# sourceMappingURL=session.d.ts.map