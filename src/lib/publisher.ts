import {
  StreamSenderState,
  type IStreamSender,
  type SenderConfig,
} from './interfaces';
import type { IPublisherCallbacks } from './interfaces/publisher';
import type { Session } from './session';
import { TypedEventEmitter } from './utils/typed-event-emitter';

export class StreamPublisher extends TypedEventEmitter<IPublisherCallbacks> {
  private sender?: IStreamSender;

  constructor(
    private _session: Session,
    private _senderConfig: SenderConfig,
  ) {
    super();
    this.sender = this._session.getSender(
      this._senderConfig.name,
      this._senderConfig.kind,
    );
    if (!this.sender) {
      if (this._senderConfig.stream) {
        this.sender = this._session.createSender(this._senderConfig);
      }
    }

    if (!this.sender) {
      throw new Error('sender not found');
    }

    this.sender.on('state', this.onState);
    this.sender.on('audio_level', this.onAudioLevel);
    this.emit('state', this.sender.state);
  }

  public get state() {
    return this.sender?.state || StreamSenderState.Created;
  }

  public get localStream(): MediaStream | undefined | null {
    return this.sender?.stream;
  }

  private onState = (state: StreamSenderState) => {
    this.emit('state', state);
  };

  private onAudioLevel = (level: number) => {
    this.emit('audio_level', level);
  };

  switch(stream: MediaStream) {
    this.sender?.switch(stream);
  }

  stop() {
    if (this.sender) {
      this.emit('state', StreamSenderState.Closed);
      this.sender.off('state', this.onState);
      this.sender.off('audio_level', this.onAudioLevel);
      this.sender?.stop();
      this.sender = undefined;
    }
  }
}
