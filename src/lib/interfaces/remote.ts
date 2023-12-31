import type { RemoteStreamQuality, StreamRemoteScalingType, StreamRemoteStatus } from '../utils/types';

export interface StreamRemoteState {
  scaling: StreamRemoteScalingType;
  layers: number[];
  status: StreamRemoteStatus;
  active: boolean;
}

export interface IStreamRemoteCallbacks {
  state: (state: StreamRemoteState) => void;
  quality: (quality: RemoteStreamQuality | null) => void;
  closed: () => void;
}
