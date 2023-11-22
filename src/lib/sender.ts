import type { IRPC } from './core/rpc';
import type { SenderTrack } from './core/tracks';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import { StreamKinds } from './utils/types';
import _debug from 'debug';

export interface IStreamSender
  extends TypedEventEmitter<IStreamSenderCallbacks> {
  switch(stream: MediaStream): void;
  stop(): Promise<void>;
}

export enum StreamSenderState {
  Created = 'created',
  Connecting = 'connecting',
  Connected = 'connected',
  Deactivated = 'deactived',
  Closed = 'closed',
}

export interface IStreamSenderCallbacks {
  state: (state: StreamSenderState) => void;
  audio_level: (level: number) => void;
}

export class StreamSender
  extends TypedEventEmitter<IStreamSenderCallbacks>
  implements IStreamSender
{
  kind: StreamKinds;
  name: string;

  private _state: StreamSenderState = StreamSenderState.Created;
  private _log = _debug('atm0s:stream-sender');
  constructor(
    private _rpc: IRPC,
    private _track: SenderTrack,
  ) {
    super();
    this.kind = this._track.info.kind;
    this.name = this._track.info.name;
    this._rpc.on(`remote_stream_${this.name}_state`, () => {
      if (this._state === StreamSenderState.Connecting) {
        this._setState(StreamSenderState.Connected);
      }
    });
    this._rpc.on(`remote_stream_${this.name}_audio_level`, (_, info) => {
      this.emit('audio_level', info.level);
    });
  }

  private _setState(state: StreamSenderState) {
    this._state = state;
    this.emit('state', state);
  }

  switch(stream: MediaStream | null) {
    this._log('switch stream', stream);
    this._track.replaceStream(stream);
    this._rpc.request('sender.toggle', {
      name: this.name,
      kind: this.kind,
      track: this._track.uuid,
    });
    if (stream) {
      this._setState(StreamSenderState.Connected);
    } else {
      this._setState(StreamSenderState.Deactivated);
    }
  }

  async stop() {
    if (this._state === StreamSenderState.Closed) {
      return;
    }
    this._setState(StreamSenderState.Closed);
  }
}
