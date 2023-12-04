import type { ISenderTrack } from './interfaces';
import type { IRPC } from './interfaces/rpc';
import { type IStreamSenderCallbacks, type IStreamSender, StreamSenderState } from './interfaces/sender';
import { getLogger } from './utils/logger';
import { TypedEventEmitter } from './utils/typed-event-emitter';

export class StreamSender extends TypedEventEmitter<IStreamSenderCallbacks> implements IStreamSender {
  get name() {
    return this._track.name;
  }

  get state() {
    return this._state;
  }

  get simulcast() {
    return this._track.simulcast;
  }

  get maxBitrate() {
    return this._track.maxBitrate;
  }

  get isScreen() {
    return this._track.screen;
  }

  get uuid() {
    return this._track.uuid;
  }

  get label() {
    return this._track.label;
  }

  get stream() {
    return this._track.stream;
  }

  get kind() {
    return this._track.kind;
  }

  private _state: StreamSenderState = StreamSenderState.Created;
  private logger = getLogger('atm0s:stream-sender');
  constructor(
    private _rpc: IRPC,
    private _track: ISenderTrack,
  ) {
    super();
    this._rpc.on(`remote_stream_${this.name}_state`, this._handleStateChange);
    this._rpc.on(`remote_stream_${this.name}_audio_level`, this._handleAudioLevelChange);
  }

  private _handleStateChange = () => {
    if (this._state === StreamSenderState.Connecting) {
      this._setState(StreamSenderState.Connected);
    }
  };

  private _handleAudioLevelChange = (_: string, { level }: { level: number }) => {
    this.emit('audio_level', level);
  };

  private _setState(state: StreamSenderState) {
    this._state = state;
    this.emit('state', state);
  }

  switch(stream: MediaStream | null, label?: string) {
    this.logger.debug('switch stream', stream);
    this._track.replaceStream(stream, label);
    this._rpc.request('sender.toggle', {
      name: this.name,
      kind: this.kind,
      track: this._track.trackId,
      label: this.label,
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
    this._rpc.request('sender.toggle', {
      name: this.name,
      kind: this.kind,
      track: null,
    });
    this._track.stop();
    this._rpc.off(`remote_stream_${this.name}_state`, this._handleStateChange);
    this._rpc.off(`remote_stream_${this.name}_audio_level`, this._handleAudioLevelChange);
    this._setState(StreamSenderState.Closed);
    this.emit('stopped', this);
  }
}
