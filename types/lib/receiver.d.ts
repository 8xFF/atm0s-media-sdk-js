import type { ReceiverTrack } from './utils/interface';
import type { IRPC } from './core/rpc';
import { TypedEventEmitter } from './utils/typed-event-emitter';
export interface IStreamReceiver {
    switch(name: string, peerId: string, priority?: number): Promise<boolean>;
    limit(priority: number, max_spatial: number, max_temporal: number): Promise<boolean>;
    stop(): Promise<boolean>;
}
export declare enum StreamReceiverState {
    NoSource = "no_source",
    Connecting = "connecting",
    Live = "live",
    Pause = "paused",
    KeyOnly = "key_only",
    SourceDeactived = "source_deactived"
}
export interface IStreamReceiverCallbacks {
    state: (state: StreamReceiverState) => void;
    audio_level: (level: number) => void;
}
export declare class StreamReceiver extends TypedEventEmitter<IStreamReceiverCallbacks> implements IStreamReceiver {
    private _rpc;
    private _track;
    kind: string;
    remoteId: string;
    hasTrack: boolean;
    hasTrackPromises: Array<(value: unknown) => void>;
    private _state;
    private _log;
    constructor(_rpc: IRPC, _track: ReceiverTrack);
    private _setState;
    private internalReady;
    switch(name: string, peerId: string, priority?: number): Promise<boolean>;
    limit(priority: number, max_spatial: number, max_temporal: number): Promise<boolean>;
    stop(): Promise<boolean>;
}
//# sourceMappingURL=receiver.d.ts.map