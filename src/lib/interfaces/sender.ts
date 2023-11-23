import type { TypedEventEmitter } from '../utils/typed-event-emitter';
import type { Codecs, ContentHint, StreamKinds } from '../utils/types';

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

export type SenderConfig = {
  stream?: MediaStream | null;
  name: string;
  kind: StreamKinds;
  preferredCodecs?: Codecs[];
  simulcast?: boolean;
  maxBitrate?: number;
  contentHint?: ContentHint;
  screen?: boolean;
};
