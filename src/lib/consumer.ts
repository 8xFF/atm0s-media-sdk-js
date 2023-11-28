import { StreamReceiverState, type IStreamReceiver } from './interfaces';
import type { IConsumerCallbacks, ViewInfo } from './interfaces/consumer';
import type { StreamRemote } from './remote';
import type { Session } from './session';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import { StreamKinds } from './utils/types';

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
   * @param priority - The priority of the view (default: 50).
   * @param maxSpatial - The maximum spatial layer for the view (default: 2).
   * @param maxTemporal - The maximum temporal layer for the view (default: 2).
   * @returns A promise that resolves to a MediaStream object representing the view.
   */
  public async view(
    key: string,
    priority: number = 50,
    maxSpatial: number = 2,
    maxTemporal: number = 2,
  ): Promise<MediaStream> {
    this.keys.set(key, { priority, maxSpatial, maxTemporal });
    if (!this.receiver) {
      this.receiver = this._session.takeReceiver(this._remote.kind);
      this.receiver.on('state', this.onReceiverStateChanged);
      this.receiver.on('audio_level', this.onReceiverAudioLevelChanged);
      await this.receiver.switch(this._remote, priority);
    }
    await this.configLayer();
    return this.receiver.stream;
  }

  /**
   * Sets the limit for a specific view by key.
   * @param key - The key of the view to set the limit for.
   * @param priority - The priority of the view (default: 50).
   * @param maxSpatial - The maximum spatial limit (default: 2).
   * @param maxTemporal - The maximum temporal limit (default: 2).
   */
  public async limit(key: string, priority: number = 50, maxSpatial: number = 2, maxTemporal: number = 2) {
    this.keys.set(key, { priority, maxSpatial, maxTemporal });
    await this.configLayer();
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
        this.receiver.stop();
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
   * @returns {Promise<void>} A promise that resolves when the layer configuration is complete.
   */
  private async configLayer() {
    if (this._remote.kind !== StreamKinds.VIDEO) return;
    let selectedPriority = 0;
    let selectedMaxSpartial = 0;
    let selectedMaxTemporal = 0;
    Array.from(this.keys.values()).map((viewer) => {
      selectedPriority = Math.max(selectedPriority, viewer.priority);
      selectedMaxSpartial = Math.max(selectedMaxSpartial, viewer.maxSpatial);
      selectedMaxTemporal = Math.max(selectedMaxTemporal, viewer.maxTemporal);
    });
    await this.receiver?.limit(selectedPriority, selectedMaxSpartial, selectedMaxTemporal);
  }

  private onReceiverAudioLevelChanged = (level: number) => {
    this.emit('audio_level', level);
  };

  private onReceiverStateChanged = (state: StreamReceiverState) => {
    this.emit('state', state);
  };
}
