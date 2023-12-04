import type { StreamRemote } from '../remote';
import type { LatencyMode, Codecs, MixMinusMode, BitrateControlMode } from '../utils/types';
import type { RealtimeSocketState } from './rtsocket';
import type { SenderConfig } from './sender';
/**
 * Represents the callbacks for a session.
 */
export interface ISessionCallbacks {
    /**
     * Callback function triggered when my stream is added.
     * @param stream The added my stream.
     */
    mystream_added: (stream: StreamRemote) => void;
    /**
     * Callback function triggered when my stream is removed.
     * @param stream The removed my stream.
     */
    mystream_removed: (stream: StreamRemote) => void;
    /**
     * Callback function triggered when my stream is updated.
     * @param stream The updated my stream.
     */
    mystream_updated: (stream: StreamRemote) => void;
    /**
     * Callback function triggered when a stream is added.
     * @param stream The added stream.
     */
    stream_added: (stream: StreamRemote) => void;
    /**
     * Callback function triggered when a stream is removed.
     * @param stream The removed stream.
     */
    stream_removed: (stream: StreamRemote) => void;
    /**
     * Callback function triggered when a stream is updated.
     * @param stream The updated stream.
     */
    stream_updated: (stream: StreamRemote) => void;
    /**
     * Callback function triggered when the peer state changes.
     * @param state The new state of the peer.
     */
    peer_state: (state: RealtimeSocketState) => void;
    /**
     * Callback function triggered when the data channel state changes.
     * @param state The new state of the data channel.
     */
    dc_state: (state: RealtimeSocketState) => void;
    /**
     * Callback function triggered when the session is disconnected.
     * @param reason The reason for the disconnection.
     */
    disconnected: (reason: string) => void;
    /**
     * Callback function triggered when the session is reconnected.
     */
    reconnected: () => void;
    /**
     * Callback function triggered when the session is reconnected.
     */
    reconnecting: () => void;
    /**
     * Callback function triggered when the session is connected.
     */
    connected: () => void;
}
/**
 * Represents the configuration for a session.
 */
export interface ISessionConfig {
    /**
     * The ID of the room.
     * @example 'room1'
     * @example 'room2'
     */
    roomId: string;
    /**
     * The ID of the peer.
     * @example 'peer1'
     * @example 'peer2'
     */
    peerId: string;
    /**
     * The token for the session.
     * Can be retrieved from the media server.
     */
    token: string;
    /**
     * Initialized Senders for the session.
     * @example [{ name: 'video_camera', kind: 'audio', stream: stream1 },
     * { name: 'screen', kind: 'video', stream: stream2, screen: true }}]
     *
     */
    senders?: SenderConfig[];
    receivers: {
        audio: number;
        video: number;
    };
    /**
     * Optional configuration for mix-minus audio.
     */
    mixMinusAudio?: {
        /**
         * The elements for mix-minus audio.
         */
        elements?: [HTMLAudioElement, HTMLAudioElement, HTMLAudioElement];
        /**
         * The mode for mix-minus audio.
         */
        mode: MixMinusMode;
    };
    /**
     * Optional latency mode for the session.
     */
    latencyMode?: LatencyMode;
    /**
     * Optional ICE servers for the session.
     */
    iceServers?: [{
        urls: string;
        username?: string;
        credential?: string;
    }];
    /**
     * Optional codecs for the session.
     */
    codecs?: Codecs[];
    /**
     * Optional bitrate control mode for the session.
     */
    bitrateControlMode?: BitrateControlMode;
}
//# sourceMappingURL=session.d.ts.map