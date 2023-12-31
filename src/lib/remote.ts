import type { IStreamRemoteCallbacks, StreamRemoteState } from './interfaces/remote';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import { StreamRemoteScalingType, StreamRemoteStatus, type StreamKinds, type RemoteStreamQuality } from './utils/types';

export class StreamRemote extends TypedEventEmitter<IStreamRemoteCallbacks> {
  _state: StreamRemoteState = {
    scaling: StreamRemoteScalingType.SINGLE,
    layers: [],
    status: StreamRemoteStatus.New,
    active: true,
  };

  constructor(
    public readonly kind: StreamKinds,
    public readonly peerId: string,
    public readonly peerHash: string,
    public readonly name: string,
  ) {
    super();
  }

  get state() {
    return this._state;
  }

  updateState(_state: StreamRemoteState) {
    if (JSON.stringify(this._state) !== JSON.stringify(_state)) {
      this._state = _state;
      this.emit('state', _state);
    }
  }

  updateQuality(quality: RemoteStreamQuality | null) {
    this.emit('quality', quality);
  }

  close() {
    this.emit('closed');
  }
}
