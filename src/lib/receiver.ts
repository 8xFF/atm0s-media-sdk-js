import { TypedEventEmitter } from './utils/typed-event-emitter';
import { getLogger } from './utils/logger';
import type { AnyFunction } from './utils/types';
import type { StreamRemote } from './remote';
import {
  type IStreamReceiverCallbacks,
  type IStreamReceiver,
  StreamReceiverState,
} from './interfaces/receiver';
import type { IRPC } from './interfaces/rpc';
import type { IReceiverTrack } from './interfaces';

export class StreamReceiver
  extends TypedEventEmitter<IStreamReceiverCallbacks>
  implements IStreamReceiver
{
  hasTrackPromises: AnyFunction[] = [];
  private _state: StreamReceiverState = StreamReceiverState.NoSource;
  private logger = getLogger('atm0s:stream-receiver');

  get state() {
    return this._state;
  }

  get stream() {
    return this._track.stream;
  }

  get kind() {
    return this._track.info.kind;
  }

  get remoteId() {
    return this._track.info.remoteId;
  }

  constructor(
    private _rpc: IRPC,
    private _track: IReceiverTrack,
  ) {
    super();
    this.logger.log('remoteId', this.remoteId);
    this._rpc.on(
      `local_stream_${this.remoteId}_state`,
      this._handleStateChange,
    );
    this._rpc.on(
      `local_stream_${this.remoteId}_audio_level`,
      this._handleAudioLevelChange,
    );
    this._track.on('track_added', this._handleOnTrackAdded);
  }

  private _handleOnTrackAdded = () => {
    this.logger.log('track added', this._track.stream);
    this.hasTrackPromises.forEach((resolve) => resolve(true));
    this.hasTrackPromises = [];
  };

  private _handleAudioLevelChange = (
    _: string,
    { level }: { level: number },
  ) => {
    this.emit('audio_level', level);
  };

  private _handleStateChange = (
    _: string,
    { state }: { state: StreamReceiverState },
  ) => {
    this._setState(state);

    this.logger.log('on receiver state', state);
    switch (state) {
      case 'live':
        if (
          [
            StreamReceiverState.Connecting,
            StreamReceiverState.SourceDeactived,
            StreamReceiverState.KeyOnly,
          ].includes(this._state)
        ) {
          this._setState(StreamReceiverState.Live);
        }
        break;
      case 'key_only':
        if (
          [
            StreamReceiverState.SourceDeactived,
            StreamReceiverState.KeyOnly,
          ].includes(this._state)
        ) {
          this._setState(StreamReceiverState.KeyOnly);
        }
        break;
      case 'source_deactived':
        if (
          [StreamReceiverState.Live, StreamReceiverState.KeyOnly].includes(
            this._state,
          )
        ) {
          this._setState(StreamReceiverState.SourceDeactived);
        }
        break;
    }
  };

  private _setState(state: StreamReceiverState) {
    this._state = state;
    this.emit('state', state);
  }

  private async internalReady() {
    if (this._track.hasTrack) return true;
    return new Promise((resolve) => {
      this.hasTrackPromises.push(resolve); //this ensure checking order
    });
  }

  async switch(remote: StreamRemote, priority: number = 50) {
    this.logger.log('switch stream', remote.name, remote.peerId, this.remoteId);
    await this.internalReady();
    if (this._track.stream) {
      this._setState(StreamReceiverState.Connecting);
      const res = await this._rpc.request('receiver.switch', {
        id: this.remoteId,
        priority,
        remote: { peer: remote.peerId, stream: remote.name },
      });
      this.logger.info('switch stream response', res);
      if (res.status === true) {
        return true;
      } else {
        this._setState(StreamReceiverState.NoSource);
        return false;
      }
    }
    return false;
  }

  async limit(
    priority: number,
    maxSpatial: number,
    maxTemporal: number,
  ): Promise<boolean> {
    this.logger.log('limit stream', priority, maxSpatial, maxTemporal);
    await this.internalReady();
    if (this._track.stream) {
      const res = await this._rpc.request('receiver.limit', {
        id: this.remoteId,
        priority,
        max_spatial: maxSpatial,
        max_temporal: maxTemporal,
      });
      if (res.status === true) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  async stop() {
    if (this._state === StreamReceiverState.NoSource) {
      return true;
    }
    this._track.stop();
    const res = await this._rpc.request('receiver.disconnect', {
      id: this.remoteId,
    });
    if (res.status === true) {
      this._setState(StreamReceiverState.NoSource);
      return true;
    }
    this._rpc.off(
      `local_stream_${this.remoteId}_state`,
      this._handleStateChange,
    );
    this._rpc.off(
      `local_stream_${this.remoteId}_audio_level`,
      this._handleAudioLevelChange,
    );
    return false;
  }
}
