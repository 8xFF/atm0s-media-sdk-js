import type { StreamConsumer } from './consumer';
import type { StreamReceiverState } from './interfaces';
import type { IConsumerCallbacks } from './interfaces/consumer';
import { TypedEventEmitter } from './utils/typed-event-emitter';
export declare class StreamConsumerPair extends TypedEventEmitter<IConsumerCallbacks> {
    private _videoConsumer;
    private _audioConsumer;
    private _combinedStream;
    get state(): StreamReceiverState;
    get stream(): MediaStream;
    constructor(_videoConsumer: StreamConsumer, _audioConsumer: StreamConsumer);
    private onAudioConsumerAudioLevelChanged;
    private onVideoConsumerStateChanged;
    private onQuality;
    limit(key: string, priority?: number, maxSpatial?: number, maxTemporal?: number): void;
    view(key: string, priority?: number, maxSpatial?: number, maxTemporal?: number): MediaStream;
    unview(key: string): void;
}
//# sourceMappingURL=consumer-pair.d.ts.map