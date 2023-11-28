import type { ISenderTrack } from './interfaces';
import type { IRPC } from './interfaces/rpc';
import { type IStreamSenderCallbacks, type IStreamSender, StreamSenderState } from './interfaces/sender';
import { TypedEventEmitter } from './utils/typed-event-emitter';
export declare class StreamSender extends TypedEventEmitter<IStreamSenderCallbacks> implements IStreamSender {
    private _rpc;
    private _track;
    get name(): string;
    get state(): StreamSenderState;
    get simulcast(): boolean | undefined;
    get maxBitrate(): number | undefined;
    get isScreen(): boolean | undefined;
    get uuid(): string;
    get label(): string;
    get stream(): MediaStream | null;
    get kind(): import("..").StreamKinds;
    private _state;
    private logger;
    constructor(_rpc: IRPC, _track: ISenderTrack);
    private _handleStateChange;
    private _handleAudioLevelChange;
    private _setState;
    switch(stream: MediaStream | null): void;
    stop(): Promise<void>;
}
//# sourceMappingURL=sender.d.ts.map