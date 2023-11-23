import { StreamReceiverState, type IStreamReceiver } from './interfaces';
import type { IConsumerCallbacks, ViewInfo } from './interfaces/consumer';
import type { StreamRemote } from './remote';
import type { Session } from './session';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import { StreamKinds } from './utils/types';

export class StreamConsumer extends TypedEventEmitter<IConsumerCallbacks> {
  private receiver?: IStreamReceiver;
  private views: Map<string, ViewInfo> = new Map();

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

  public view(
    viewerId: string,
    priority: number = 50,
    maxSpatial: number = 2,
    maxTemporal: number = 2,
  ): MediaStream {
    this.views.set(viewerId, { priority, maxSpatial, maxTemporal });
    if (!this.receiver) {
      this.receiver = this._session.takeReceiver(this._remote.kind);
      this.receiver.on('state', this.onReceiverStateChanged);
      this.receiver.on('audio_level', this.onReceiverAudioLevelChanged);
      this.receiver.switch(this._remote, priority);
    }
    this.configLayer();
    return this.receiver.stream;
  }

  public limit(
    viewId: string,
    priority: number = 50,
    maxSpatial: number = 2,
    maxTemporal: number = 2,
  ) {
    this.views.set(viewId, { priority, maxSpatial, maxTemporal });
    this.configLayer();
  }

  public unview(viewerId: string) {
    this.views.delete(viewerId);
    if (this.views.size == 0) {
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

  private configLayer() {
    if (this._remote.kind !== StreamKinds.VIDEO) return;
    let selectedPriority = 0;
    let selectedMaxSpartial = 0;
    let selectedMaxTemporal = 0;
    Array.from(this.views.values()).map((viewer) => {
      selectedPriority = Math.max(selectedPriority, viewer.priority);
      selectedMaxSpartial = Math.max(selectedMaxSpartial, viewer.maxSpatial);
      selectedMaxTemporal = Math.max(selectedMaxTemporal, viewer.maxTemporal);
    });
    this.receiver?.limit(
      selectedPriority,
      selectedMaxSpartial,
      selectedMaxTemporal,
    );
  }

  private onReceiverAudioLevelChanged = (level: number) => {
    this.emit('audio_level', level);
  };

  private onReceiverStateChanged = (state: StreamReceiverState) => {
    this.emit('state', state);
  };
}
