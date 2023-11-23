import type { StreamSenderState } from './sender';

export interface IPublisherCallbacks {
  state: (state: StreamSenderState) => void;
  audio_level: (level: number) => void;
}
