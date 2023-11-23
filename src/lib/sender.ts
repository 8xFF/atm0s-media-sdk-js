import type { SenderTrack } from './core/tracks';
import type { IRPC } from './interfaces/rpc';
import {
  type IStreamSenderCallbacks,
  type IStreamSender,
  StreamSenderState,
} from './interfaces/sender';
import { getLogger } from './utils/logger';
import { TypedEventEmitter } from './utils/typed-event-emitter';
import { StreamKinds } from './utils/types';

export class StreamSender
  extends TypedEventEmitter<IStreamSenderCallbacks>
  implements IStreamSender
{
  kind: StreamKinds;
  name: string;

  get state() {
    return this._state;
  }

  get simulcast() {
    return this._track.info.simulcast;
  }

  get maxBitrate() {
    return this._track.info.maxBitrate;
  }

  get isScreen() {
    return this._track.info.screen;
  }

  get uuid() {
    return this._track.uuid;
  }

  get label() {
    return this._track.info.label;
  }

  get stream() {
    return this._track.stream;
  }

  private _state: StreamSenderState = StreamSenderState.Created;
  private logger = getLogger('atm0s:stream-sender');
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
    this._rpc.on(
      `remote_stream_${this.name}_audio_level`,
      (_: unknown, info: { level: number }) => {
        this.emit('audio_level', info.level);
      },
    );
  }

  private _setState(state: StreamSenderState) {
    this._state = state;
    this.emit('state', state);
  }

  switch(stream: MediaStream | null) {
    this.logger.log('switch stream', stream);
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
