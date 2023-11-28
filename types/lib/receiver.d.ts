import { TypedEventEmitter } from './utils/typed-event-emitter';
import type { AnyFunction } from './utils/types';
import type { StreamRemote } from './remote';
import { type IStreamReceiverCallbacks, type IStreamReceiver, StreamReceiverState } from './interfaces/receiver';
import type { IRPC } from './interfaces/rpc';
import type { IReceiverTrack } from './interfaces';
export declare class StreamReceiver extends TypedEventEmitter<IStreamReceiverCallbacks> implements IStreamReceiver {
    private _rpc;
    private _track;
    hasTrackPromises: AnyFunction[];
    private _state;
    private logger;
    get state(): StreamReceiverState;
    get stream(): MediaStream;
    get kind(): import("./utils/types").StreamKinds;
    get remoteId(): string;
    constructor(_rpc: IRPC, _track: IReceiverTrack);
    private _handleOnTrackAdded;
    private _handleAudioLevelChange;
    private _handleStateChange;
    private _setState;
    private internalReady;
    switch(remote: StreamRemote, priority?: number): Promise<boolean>;
    limit(priority: number, maxSpatial: number, maxTemporal: number): Promise<boolean>;
    stop(): Promise<boolean>;
}
//# sourceMappingURL=receiver.d.ts.map