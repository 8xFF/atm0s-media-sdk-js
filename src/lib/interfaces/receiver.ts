import type { StreamRemote } from '../remote';
import type { TypedEventEmitter } from '../utils/typed-event-emitter';
import type { Codecs, StreamKinds, LatencyMode, RemoteStreamQuality } from '../utils/types';

/**
 * Represents a stream receiver.
 */
export interface IStreamReceiver extends TypedEventEmitter<IStreamReceiverCallbacks> {
  state: StreamReceiverState;
  stream: MediaStream;
  kind: StreamKinds;
  remoteId: string;

  /**
   * Switches to a remote stream.
   * @param remote The remote stream to switch to.
   * @param priority? The priority of the stream.
   * @returns A promise that resolves to a boolean indicating whether the switch was successful.
   */
  switch(remote: StreamRemote, priority?: number): Promise<boolean>;

  /**
   * Limits the stream with the specified priority to the given maximum spatial and temporal values.
   * `spatial` is a value indicating the definition clarity of the stream.
   * `temporal` is a value indicating the smoothness, or frame rate of the stream.
   *
   * @param priority The priority of the stream to limit.
   * @param maxSpatial The maximum spatial value.
   * @param maxTemporal The maximum temporal value.
   * @returns A promise that resolves to a boolean indicating whether the limit was successful.
   */
  limit(
    priority: number,
    minSpatial: number,
    maxSpatial: number,
    minTemporal: number,
    maxTemporal: number,
  ): Promise<boolean>;

  /**
   * Stops the stream.
   * @returns A promise that resolves to a boolean indicating whether the stop was successful.
   */
  disconnect(): Promise<boolean>;
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
  disconnected: (receiver: IStreamReceiver) => void;
  track_added: (track: MediaStreamTrack) => void;
  quality: (quality: RemoteStreamQuality) => void;
}

export type ReceiverInfo = {
  remoteId: string;
  kind: StreamKinds;
  codecs?: Codecs[];
  latencyMode?: LatencyMode;
};
