import type { StreamConsumer } from './consumer';
import type { StreamReceiverState } from './interfaces';
import type { IConsumerCallbacks } from './interfaces/consumer';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import type { RemoteStreamQuality } from './utils/types';

export class StreamConsumerPair extends TypedEventEmitter<IConsumerCallbacks> {
  private _combinedStream: MediaStream;

  get state() {
    return this._videoConsumer.state;
  }

  get stream() {
    return this._combinedStream;
  }

  constructor(
    private _videoConsumer: StreamConsumer,
    private _audioConsumer: StreamConsumer,
  ) {
    super();
    this._combinedStream = new MediaStream([
      ...(this._videoConsumer.stream?.getVideoTracks() || []),
      ...(this._audioConsumer.stream?.getAudioTracks() || []),
    ]);

    this._videoConsumer.on('state', this.onVideoConsumerStateChanged);
    this._audioConsumer.on('audio_level', this.onAudioConsumerAudioLevelChanged);
    this._videoConsumer.on('quality', this.onQuality);
    this._audioConsumer.on('quality', this.onQuality);

    this._audioConsumer.on('track_added', (track) => {
      this._combinedStream.addTrack(track);
      console.log('view', this._combinedStream.getTracks());
      this.emit('track_added', track);
    });

    this._videoConsumer.on('track_added', (track) => {
      this._combinedStream.addTrack(track);
      console.log('view', this._combinedStream.getTracks());
      this.emit('track_added', track);
    });
  }

  private onAudioConsumerAudioLevelChanged = (level: number) => {
    this.emit('audio_level', level);
  };

  private onVideoConsumerStateChanged = (state: StreamReceiverState) => {
    this.emit('state', state);
  };

  private onQuality = (quality: RemoteStreamQuality | undefined) => {
    this.emit('quality', quality);
  };

  limit(key: string, priority: number = 50, maxSpatial: number = 2, maxTemporal: number = 2) {
    this._videoConsumer.limit(key, priority, maxSpatial, maxTemporal);
  }

  view(key: string, priority: number = 50, maxSpatial: number = 2, maxTemporal: number = 2): MediaStream {
    this._audioConsumer.view(key);
    this._videoConsumer.view(key, priority, maxSpatial, maxTemporal);
    return this._combinedStream;
  }

  unview(key: string) {
    this._audioConsumer.unview(key);
    this._videoConsumer.unview(key);
  }
}
