import type { ReceiverTrack } from './utils/interface';
import type { IRPC } from './core/rpc';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import _debug from 'debug';

export interface IStreamReceiver {
  switch(name: string, peerId: string, priority?: number): Promise<boolean>;
  limit(
    priority: number,
    max_spatial: number,
    max_temporal: number,
  ): Promise<boolean>;
  stop(): Promise<boolean>;
}

export enum StreamReceiverState {
  NoSource = 'no_source',
  Connecting = 'connecting',
  Live = 'live',
  Pause = 'paused',
  KeyOnly = 'key_only',
  SourceDeactived = 'source_deactived',
}

export interface IStreamReceiverCallbacks {
  state: (state: StreamReceiverState) => void;
  audio_level: (level: number) => void;
}

export class StreamReceiver
  extends TypedEventEmitter<IStreamReceiverCallbacks>
  implements IStreamReceiver
{
  kind: string;
  remoteId: string;
  hasTrack: boolean = false;
  hasTrackPromises: Array<(value: unknown) => void> = [];
  private _state: StreamReceiverState = StreamReceiverState.NoSource;
  private _log = _debug('atm0s:stream-receiver');

  constructor(
    private _rpc: IRPC,
    private _track: ReceiverTrack,
  ) {
    super();
    this.kind = this._track.info.kind;
    this.remoteId = this._track.info.remoteId;
    this._rpc.on(`local_stream_${this.remoteId}_audio_level`, (_, info) => {
      this._setState(info.state);
    });
    this._rpc.on(`local_stream_${this.remoteId}_state`, (_, info) => {
      this.emit('audio_level', info.level);
    });
  }

  private _setState(state: StreamReceiverState) {
    this._state = state;
    this.emit('state', state);
  }

  private async internalReady() {
    if (this.hasTrack) return true;
    return new Promise((resolve) => {
      this.hasTrackPromises.push(resolve); //this ensure checking order
    });
  }

  async switch(name: string, peerId: string, priority: number = 50) {
    this._log('switch stream', name, peerId);
    await this.internalReady();
    if (this._track.stream) {
      this._setState(StreamReceiverState.Connecting);
      const res = await this._rpc.request<unknown, { status: boolean }>(
        'receiver.switch',
        {
          id: this.remoteId,
          priority,
          remote: { peer: peerId, stream: name },
        },
      );
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
    this._log('limit stream', priority, max_spatial, max_temporal);
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
