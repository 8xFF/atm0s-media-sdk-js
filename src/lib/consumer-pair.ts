import type { StreamConsumer } from './consumer';
import type { StreamReceiverState } from './interfaces';
import type { IConsumerCallbacks } from './interfaces/consumer';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import type { RemoteStreamQuality, StreamLimit } from './utils/types';

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
    this._combinedStream = new MediaStream();

    this._videoConsumer.on('state', this.onVideoConsumerStateChanged);
    this._audioConsumer.on('audio_level', this.onAudioConsumerAudioLevelChanged);
    this._videoConsumer.on('quality', this.onQuality);
    this._audioConsumer.on('quality', this.onQuality);

    this._audioConsumer.on('track_added', (track) => {
      this._combinedStream.addTrack(track);
      this.emit('track_added', track);
    });

    this._videoConsumer.on('track_added', (track) => {
      this._combinedStream.addTrack(track);
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

  limit(key: string, limit: StreamLimit) {
    this._videoConsumer.limit(key, limit);
  }

  view(key: string, limit?: StreamLimit): MediaStream {
    const audioStream = this._audioConsumer.view(key, limit);
    const videoStream = this._videoConsumer.view(key, limit);
    this._combinedStream.getTracks().forEach((track) => {
      this._combinedStream.removeTrack(track);
    });
    audioStream.getAudioTracks().forEach((track) => {
      this._combinedStream.addTrack(track);
    });
    videoStream.getVideoTracks().forEach((track) => {
      this._combinedStream.addTrack(track);
    });
    return this._combinedStream;
  }

  unview(key: string) {
    this._combinedStream.getTracks().forEach((track) => {
      this._combinedStream.removeTrack(track);
    });
    this._audioConsumer.unview(key);
    this._videoConsumer.unview(key);
  }
}
