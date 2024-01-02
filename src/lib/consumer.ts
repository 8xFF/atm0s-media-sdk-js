import { StreamReceiverState, type IStreamReceiver } from './interfaces';
import type { IConsumerCallbacks, ViewInfo } from './interfaces/consumer';
import type { StreamRemote } from './remote';
import type { Session } from './session';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import { StreamKinds, type RemoteStreamQuality, type StreamLimit } from './utils/types';

/**
 * Represents a stream consumer that sets up views for specific viewers and configures layer settings.
 */
export class StreamConsumer extends TypedEventEmitter<IConsumerCallbacks> {
  private receiver?: IStreamReceiver;
  private keys: Map<string, ViewInfo> = new Map();

  constructor(
    private _session: Session,
    private _remote: StreamRemote,
  ) {
    super();
  }

  public get state() {
    return this.receiver?.state || StreamReceiverState.NoSource;
  }

  public get stream() {
    return this.receiver?.stream;
  }

  /**
   * Sets up a view for a specific viewer key.
   * @param key - The key of the viewer.
   * @param limit - The limit to set for the view.
   *
   * @returns The MediaStream of the view.
   */
  public view(
    key: string,
    limit: StreamLimit = { priority: 50, maxSpatial: 2, minSpatial: 0, maxTemporal: 2, minTemporal: 0 },
  ): MediaStream {
    this.keys.set(key, {
      priority: limit?.priority,
      maxSpatial: limit?.maxSpatial,
      maxTemporal: limit?.maxTemporal,
      minSpatial: limit?.minSpatial || 0,
      minTemporal: limit?.minTemporal || 0,
    });
    if (!this.receiver) {
      this.receiver = this._session.takeReceiver(this._remote.kind);
      this.receiver.on('state', this.onReceiverStateChanged);
      this.receiver.on('audio_level', this.onReceiverAudioLevelChanged);
      this.receiver.on('track_added', this.onAddTrack);
      this.receiver.on('quality', this.onQuality);

      this.receiver.switch(this._remote, limit?.priority);
    }
    this.configLayer();
    return this.receiver.stream;
  }

  /**
   * Sets the limit for a specific view by key.
   * @param key - The key of the view to set the limit for.
   * @param limit - The limit to set for the view.
   */
  public limit(key: string, limit: StreamLimit) {
    this.keys.set(key, {
      priority: limit?.priority || 50,
      maxSpatial: limit?.maxSpatial || 2,
      maxTemporal: limit?.maxTemporal || 2,
      minSpatial: limit?.minSpatial || 0,
      minTemporal: limit?.minTemporal || 0,
    });
    this.configLayer();
  }

  /**
   * Removes a key from the set of viewed keys.
   * If the set becomes empty, stops the receiver and emits the 'state' event with StreamReceiverState.NoSource.
   * Otherwise, reconfigures the layer.
   * @param key - The key to be removed from the set of viewed keys.
   */
  public unview(key: string) {
    this.keys.delete(key);
    if (this.keys.size === 0) {
      if (this.receiver) {
        this.receiver.off('state', this.onReceiverStateChanged);
        this.receiver.off('audio_level', this.onReceiverAudioLevelChanged);
        this.emit('state', StreamReceiverState.NoSource);
        this.receiver.disconnect();
        this._session.backReceiver(this.receiver);
        this.receiver = undefined;
      }
    } else {
      this.configLayer();
    }
  }

  /**
   * Configures the layer based on the selected viewers' priorities and maximum spatial/temporal values.
   * This method is only applicable for video streams.
   */
  private configLayer() {
    if (this._remote.kind !== StreamKinds.VIDEO) return;
    let selectedPriority = 0;
    let selectedMaxSpartial = 0;
    let selectedMaxTemporal = 0;
    let selectedMinSpartial = 0;
    let selectedMinTemporal = 0;
    Array.from(this.keys.values()).map((viewer) => {
      selectedPriority = Math.max(selectedPriority, viewer.priority);
      selectedMaxSpartial = Math.max(selectedMaxSpartial, viewer.maxSpatial);
      selectedMaxTemporal = Math.max(selectedMaxTemporal, viewer.maxTemporal);
      selectedMinSpartial = Math.max(selectedMinSpartial, viewer.minSpatial);
      selectedMinTemporal = Math.max(selectedMinTemporal, viewer.minTemporal);
    });
    this.receiver?.limit({
      priority: selectedPriority,
      maxSpatial: selectedMaxSpartial,
      maxTemporal: selectedMaxTemporal,
      minTemporal: selectedMinTemporal,
      minSpatial: selectedMinSpartial,
    });
  }

  private onReceiverAudioLevelChanged = (level: number) => {
    this.emit('audio_level', level);
  };

  private onReceiverStateChanged = (state: StreamReceiverState) => {
    this.emit('state', state);
  };

  private onAddTrack = (track: MediaStreamTrack) => {
    this.emit('track_added', track);
  };

  private onQuality = (quality: RemoteStreamQuality) => {
    this.emit('quality', quality);
  };
}
