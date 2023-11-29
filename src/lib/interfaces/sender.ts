import type { TypedEventEmitter } from '../utils/typed-event-emitter';
import type { Codecs, ContentHint, StreamKinds } from '../utils/types';

/**
 * Represents a stream sender.
 */
export interface IStreamSender extends TypedEventEmitter<IStreamSenderCallbacks> {
  state: StreamSenderState;
  stream: MediaStream | undefined | null;
  uuid: string;
  label: string;
  name: string;
  kind: StreamKinds;

  simulcast?: boolean;
  maxBitrate?: number;
  isScreen?: boolean;
  /**
   * Switches to the specified media stream.
   * @param stream The media stream to switch to.
   */
  switch(stream: MediaStream): void;

  /**
   * Stops the streaming process.
   * @returns A promise that resolves when the streaming is stopped.
   */
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
  stopped: (sender: IStreamSender) => void;
}

/**
 * Configuration options for a sender.
 */
export type SenderConfig = {
  /**
   * The name of the sender.
   * @remarks
   * This name must be unique within the session.
   * @example 'video_main'
   */
  name: string;

  /**
   * The kind of the sender. This can be either 'video' or 'audio'.
   */
  kind: StreamKinds;

  /**
   * The stream of the sender.
   */
  stream?: MediaStream | null;

  /**
   * The preferred codecs of the sender.
   * This will be used to determine the order of the codecs in the SDP.
   *
   * @example ['VP8', 'H264']
   */
  preferredCodecs?: Codecs[];

  /**
   * Whether the sender should be simulcasted.
   * @default false
   */
  simulcast?: boolean;

  /**
   * The maximum bitrate of the sender.
   * @default 0
   */
  maxBitrate?: number;

  /**
   * The content hint of the sender.
   */
  contentHint?: ContentHint;

  /**
   * Whether the sender is a screen share.
   * @default false
   */
  screen?: boolean;
};
