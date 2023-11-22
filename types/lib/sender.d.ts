import type { IRPC } from './core/rpc';
import type { SenderTrack } from './core/tracks';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import { StreamKinds } from './utils/types';
export interface IStreamSender extends TypedEventEmitter<IStreamSenderCallbacks> {
    switch(stream: MediaStream): void;
    stop(): Promise<void>;
}
export declare enum StreamSenderState {
    Created = "created",
    Connecting = "connecting",
    Connected = "connected",
    Deactivated = "deactived",
    Closed = "closed"
}
export interface IStreamSenderCallbacks {
    state: (state: StreamSenderState) => void;
    audio_level: (level: number) => void;
}
export declare class StreamSender extends TypedEventEmitter<IStreamSenderCallbacks> implements IStreamSender {
    private _rpc;
    private _track;
    kind: StreamKinds;
    name: string;
    private _state;
    private _log;
    constructor(_rpc: IRPC, _track: SenderTrack);
    private _setState;
    switch(stream: MediaStream | null): void;
    stop(): Promise<void>;
}
//# sourceMappingURL=sender.d.ts.map