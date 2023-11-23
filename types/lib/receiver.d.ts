import { TypedEventEmitter } from './utils/typed-event-emitter';
import type { ReceiverTrack } from './core/tracks';
import type { AnyFunction } from './utils/types';
import type { StreamRemote } from './remote';
import { type IStreamReceiverCallbacks, type IStreamReceiver } from './interfaces/receiver';
import type { IRPC } from './interfaces/rpc';
export declare class StreamReceiver extends TypedEventEmitter<IStreamReceiverCallbacks> implements IStreamReceiver {
    private _rpc;
    private _track;
    kind: string;
    remoteId: string;
    hasTrackPromises: AnyFunction[];
    private _state;
    private logger;
    constructor(_rpc: IRPC, _track: ReceiverTrack);
    get stream(): MediaStream;
    private _setState;
    private internalReady;
    switch(remote: StreamRemote, priority?: number): Promise<boolean>;
    limit(priority: number, max_spatial: number, max_temporal: number): Promise<boolean>;
    stop(): Promise<boolean>;
}
//# sourceMappingURL=receiver.d.ts.map