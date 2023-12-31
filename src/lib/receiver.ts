import { TypedEventEmitter } from './utils/typed-event-emitter';
import { getLogger } from './utils/logger';
import type { AnyFunction, RemoteStreamQuality, StreamLimit } from './utils/types';
import type { StreamRemote } from './remote';
import { type IStreamReceiverCallbacks, type IStreamReceiver, StreamReceiverState } from './interfaces/receiver';
import type { IRPC } from './interfaces/rpc';
import type { IReceiverTrack } from './interfaces';
import type { StreamMapping } from './stream-mapping';

export class StreamReceiver extends TypedEventEmitter<IStreamReceiverCallbacks> implements IStreamReceiver {
  readyPromises: AnyFunction[] = [];
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
    private _streams: StreamMapping,
  ) {
    super();
    this.logger.log('remoteId', this.remoteId);
    this._rpc.on(`local_stream_${this.remoteId}_state`, this._handleStateChange);
    this._rpc.on(`local_stream_${this.remoteId}_audio_level`, this._handleAudioLevelChange);
    this._rpc.on(`local_stream_${this.remoteId}_quality`, this._handleOnQuality);
    this._rpc.on('_rpc_connected', this._ready);
    this._track.on('track_added', this._handleOnTrackAdded);
  }

  private _ready = () => {
    this.readyPromises.forEach((resolve) => resolve(true));
    this.readyPromises = [];
  };

  private _handleOnQuality = (_: string, info: RemoteStreamQuality) => {
    const { mos, peer, name } = info;
    if (mos && peer && name) {
      const stream = this._streams.get(peer, name);
      if (stream) {
        const quality = { peer: stream.peerId, name, kind: this.kind, mos: mos / 1000 };
        this.emit('quality', quality);
        stream.updateQuality(quality);

        // TODO: Why this
        // if (stream != preMountedQuality) {
        //   if (!!preMountedQuality) {
        //     preMountedQuality.updateQuality(null);
        //   }
        //   preMountedQuality = stream;
        // }
      }
    }
  };

  private _handleOnTrackAdded = (track: MediaStreamTrack) => {
    this.logger.log('track added', this._track.stream);
    this.emit('track_added', track);
    if (this._rpc.connected) this._ready();
  };

  private _handleAudioLevelChange = (_: string, { level }: { level: number }) => {
    this.emit('audio_level', level);
  };

  private _handleStateChange = (_: string, { state }: { state: StreamReceiverState }) => {
    this._setState(state);

    this.logger.log('on receiver state', state);
    switch (state) {
      case 'live':
        if (
          [StreamReceiverState.Connecting, StreamReceiverState.SourceDeactived, StreamReceiverState.KeyOnly].includes(
            this._state,
          )
        ) {
          this._setState(StreamReceiverState.Live);
        }
        break;
      case 'key_only':
        if ([StreamReceiverState.SourceDeactived, StreamReceiverState.KeyOnly].includes(this._state)) {
          this._setState(StreamReceiverState.KeyOnly);
        }
        break;
      case 'source_deactived':
        if ([StreamReceiverState.Live, StreamReceiverState.KeyOnly].includes(this._state)) {
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
    if (this._rpc?.connected) return true;
    return new Promise((resolve) => {
      this.readyPromises.push(resolve); //this ensure checking order
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

  async limit(limit: StreamLimit): Promise<boolean> {
    this.logger.log('limit stream', limit.priority, limit.maxSpatial, limit.maxTemporal);
    await this.internalReady();
    if (this._track.stream) {
      const res = await this._rpc.request('receiver.limit', {
        id: this.remoteId,
        limit: {
          priority: limit.priority,
          min_spatial: limit.minSpatial,
          min_temporal: limit.minTemporal,
          max_spatial: limit.maxSpatial,
          max_temporal: limit.maxTemporal,
        },
      });
      if (res.status === true) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  async disconnect() {
    if (this._state === StreamReceiverState.NoSource) {
      return true;
    }
    const res = await this._rpc.request('receiver.disconnect', {
      id: this.remoteId,
    });
    if (res.status === false) {
      return false;
    }
    this._setState(StreamReceiverState.NoSource);
    this.emit('disconnected', this);
    return true;
  }
}
