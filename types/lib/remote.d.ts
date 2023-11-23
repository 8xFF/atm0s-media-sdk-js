import type { IStreamRemoteCallbacks, StreamRemoteState } from './interfaces/remote';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import { type StreamKinds } from './utils/types';
export declare class StreamRemote extends TypedEventEmitter<IStreamRemoteCallbacks> {
    readonly kind: StreamKinds;
    readonly peerId: string;
    readonly peerHash: string;
    readonly name: string;
    _state: StreamRemoteState;
    constructor(kind: StreamKinds, peerId: string, peerHash: string, name: string);
    get state(): StreamRemoteState;
    updateState(_state: StreamRemoteState): void;
    close(): void;
}
//# sourceMappingURL=remote.d.ts.map