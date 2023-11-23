import { TypedEventEmitter } from './utils/typed-event-emitter';
import type { ReceiverTrack } from './core/tracks';
import type { AnyFunction, StreamKinds } from './utils/types';
import type { StreamRemote } from './remote';
import { type IStreamReceiverCallbacks, type IStreamReceiver, StreamReceiverState } from './interfaces/receiver';
import type { IRPC } from './interfaces/rpc';
export declare class StreamReceiver extends TypedEventEmitter<IStreamReceiverCallbacks> implements IStreamReceiver {
    private _rpc;
    private _track;
    kind: StreamKinds;
    remoteId: string;
    hasTrackPromises: AnyFunction[];
    private _state;
    private logger;
    get state(): StreamReceiverState;
    get stream(): MediaStream;
    constructor(_rpc: IRPC, _track: ReceiverTrack);
    private _setState;
    private internalReady;
    switch(remote: StreamRemote, priority?: number): Promise<boolean>;
    limit(priority: number, max_spatial: number, max_temporal: number): Promise<boolean>;
    stop(): Promise<boolean>;
}
//# sourceMappingURL=receiver.d.ts.map