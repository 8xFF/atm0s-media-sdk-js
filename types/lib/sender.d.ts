import type { SenderTrack } from './core/tracks';
import type { IRPC } from './interfaces/rpc';
import { type IStreamSenderCallbacks, type IStreamSender } from './interfaces/sender';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import { StreamKinds } from './utils/types';
export declare class StreamSender extends TypedEventEmitter<IStreamSenderCallbacks> implements IStreamSender {
    private _rpc;
    private _track;
    kind: StreamKinds;
    name: string;
    private _state;
    private logger;
    constructor(_rpc: IRPC, _track: SenderTrack);
    private _setState;
    switch(stream: MediaStream | null): void;
    stop(): Promise<void>;
}
//# sourceMappingURL=sender.d.ts.map