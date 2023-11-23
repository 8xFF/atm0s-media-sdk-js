import { TypedEventEmitter } from './utils/typed-event-emitter';
import { getLogger } from './utils/logger';
import type { ReceiverTrack } from './core/tracks';
import type { AnyFunction } from './utils/types';
import type { StreamRemote } from './remote';
import {
  type IStreamReceiverCallbacks,
  type IStreamReceiver,
  StreamReceiverState,
} from './interfaces/receiver';
import type { IRPC } from './interfaces/rpc';

export class StreamReceiver
  extends TypedEventEmitter<IStreamReceiverCallbacks>
  implements IStreamReceiver
{
  kind: string;
  remoteId: string;
  hasTrackPromises: AnyFunction[] = [];
  private _state: StreamReceiverState = StreamReceiverState.NoSource;
  private logger = getLogger('atm0s:stream-receiver');

  constructor(
    private _rpc: IRPC,
    private _track: ReceiverTrack,
  ) {
    super();
    this.kind = this._track.info.kind;
    this.remoteId = this._track.info.remoteId;
    this.logger.log('remoteId', this.remoteId);
    this._rpc.on(
      `local_stream_${this.remoteId}_state`,
      (_: unknown, info: { state: StreamReceiverState }) => {
        this._setState(info.state);

        this.logger.log('on state', info);
        switch (info.state) {
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
      },
    );
    this._rpc.on(
      `local_stream_${this.remoteId}_state`,
      (_: unknown, info: { level: number }) => {
        this.emit('audio_level', info.level);
      },
    );
    this._track.on('track_added', () => {
      this.logger.log('track added', this._track.stream);
      this.hasTrackPromises.forEach((resolve) => resolve(true));
      this.hasTrackPromises = [];
    });
  }

  get stream() {
    return this._track.stream;
  }

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
      const res = await this._rpc.request<
        {
          id: string;
          priority: number;
          remote: { peer: string; stream: string };
        },
        { status: boolean }
      >('receiver.switch', {
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
    max_spatial: number,
    max_temporal: number,
  ): Promise<boolean> {
    this.logger.log('limit stream', priority, max_spatial, max_temporal);
    await this.internalReady();
    if (this._track.stream) {
      const res = await this._rpc.request<unknown, { status: boolean }>(
        'receiver.limit',
        {
          id: this.remoteId,
          priority,
          max_spatial,
          max_temporal,
        },
      );
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
    const res = await this._rpc.request<{ id: string }, { status: boolean }>(
      'receiver.disconnect',
      {
        id: this.remoteId,
      },
    );
    if (res.status === true) {
      this._setState(StreamReceiverState.NoSource);
      return true;
    }
    return false;
  }
}
