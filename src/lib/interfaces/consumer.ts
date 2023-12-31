import type { RemoteStreamQuality } from '../utils/types';
import type { StreamReceiverState } from './receiver';

export interface ViewInfo {
  priority: number;
  minSpatial: number;
  maxSpatial: number;
  minTemporal: number;
  maxTemporal: number;
}

export interface IConsumerCallbacks {
  state: (state: StreamReceiverState) => void;
  audio_level: (level: number) => void;
  quality: (quality: RemoteStreamQuality | undefined) => void;
  track_added: (track: MediaStreamTrack) => void;
}
