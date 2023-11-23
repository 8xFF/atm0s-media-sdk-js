import { StreamReceiverState } from './interfaces';
import type { IConsumerCallbacks } from './interfaces/consumer';
import type { StreamRemote } from './remote';
import type { Session } from './session';
import { TypedEventEmitter } from './utils/typed-event-emitter';
export declare class StreamConsumer extends TypedEventEmitter<IConsumerCallbacks> {
    private _session;
    private _remote;
    private receiver?;
    private views;
    constructor(_session: Session, _remote: StreamRemote);
    get state(): StreamReceiverState;
    get stream(): MediaStream | undefined;
    view(viewerId: string, priority?: number, maxSpatial?: number, maxTemporal?: number): MediaStream;
    limit(viewId: string, priority?: number, maxSpatial?: number, maxTemporal?: number): void;
    unview(viewerId: string): void;
    private configLayer;
    private onReceiverAudioLevelChanged;
    private onReceiverStateChanged;
}
//# sourceMappingURL=consumer.d.ts.map