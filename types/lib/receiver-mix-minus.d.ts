import type { IRPC, IStreamReceiver } from './interfaces';
import { StreamRemote } from './remote';
import type { Session } from './session';
import EventEmitter from './utils/simple-event-emiiter';
import { type RemoteStreamQuality } from './utils/types';
export interface MixMinusRemoteStreamQuality extends RemoteStreamQuality {
    slot: number;
}
export interface ReceiverMixMinusAudioState {
    active: ([string, number] | null)[];
    sources: {
        [peerId: string]: number;
    };
}
export declare class ReceiverMixMinusAudio extends EventEmitter {
    private id;
    private _session;
    private _rpc;
    receivers: IStreamReceiver[];
    elements: (HTMLAudioElement | null)[];
    sources: Map<string, {
        peerId: string;
        streamName: string;
    }>;
    _state: ReceiverMixMinusAudioState;
    constructor(id: string, _session: Session, _rpc: IRPC, elements?: [HTMLAudioElement, HTMLAudioElement, HTMLAudioElement]);
    get state(): ReceiverMixMinusAudioState;
    createElement(): HTMLAudioElement | null;
    releaseElements(): void;
    connect(): Promise<void>;
    play(): void;
    addSource(remote: StreamRemote): Promise<void>;
    removeSource(remote: StreamRemote): Promise<void>;
    addSourceManual(peerId: string, stream_name: string): Promise<void>;
    removeSourceManual(peerId: string, stream_name: string): Promise<void>;
}
//# sourceMappingURL=receiver-mix-minus.d.ts.map