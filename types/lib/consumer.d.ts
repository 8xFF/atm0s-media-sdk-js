import { StreamReceiverState } from './interfaces';
import type { IConsumerCallbacks } from './interfaces/consumer';
import type { StreamRemote } from './remote';
import type { Session } from './session';
import { TypedEventEmitter } from './utils/typed-event-emitter';
/**
 * Represents a stream consumer that sets up views for specific viewers and configures layer settings.
 */
export declare class StreamConsumer extends TypedEventEmitter<IConsumerCallbacks> {
    private _session;
    private _remote;
    private receiver?;
    private keys;
    constructor(_session: Session, _remote: StreamRemote);
    get state(): StreamReceiverState;
    get stream(): MediaStream | undefined;
    /**
     * Sets up a view for a specific viewer key.
     * @param key - The key of the viewer.
     * @param priority - The priority of the view (default: 50).
     * @param maxSpatial - The maximum spatial layer for the view (default: 2).
     * @param maxTemporal - The maximum temporal layer for the view (default: 2).
     * @returns The MediaStream of the view.
     */
    view(key: string, priority?: number, maxSpatial?: number, maxTemporal?: number): MediaStream;
    /**
     * Sets the limit for a specific view by key.
     * @param key - The key of the view to set the limit for.
     * @param priority - The priority of the view (default: 50).
     * @param maxSpatial - The maximum spatial limit (default: 2).
     * @param maxTemporal - The maximum temporal limit (default: 2).
     */
    limit(key: string, priority?: number, maxSpatial?: number, maxTemporal?: number): void;
    /**
     * Removes a key from the set of viewed keys.
     * If the set becomes empty, stops the receiver and emits the 'state' event with StreamReceiverState.NoSource.
     * Otherwise, reconfigures the layer.
     * @param key - The key to be removed from the set of viewed keys.
     */
    unview(key: string): void;
    /**
     * Configures the layer based on the selected viewers' priorities and maximum spatial/temporal values.
     * This method is only applicable for video streams.
     */
    private configLayer;
    private onReceiverAudioLevelChanged;
    private onReceiverStateChanged;
    private onAddTrack;
}
//# sourceMappingURL=consumer.d.ts.map