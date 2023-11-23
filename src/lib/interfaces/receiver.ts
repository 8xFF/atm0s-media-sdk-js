import type { StreamRemote } from '../remote';
import type { StreamKinds } from '../utils/types';

export interface IStreamReceiver {
  switch(remote: StreamRemote, priority?: number): Promise<boolean>;
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

export type ReceiverInfo = {
  remoteId: string;
  kind: StreamKinds;
};
