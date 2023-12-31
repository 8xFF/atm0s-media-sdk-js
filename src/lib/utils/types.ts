import type { ISessionCallbacks } from '../interfaces';

export enum LogLevel {
  None = 0,
  Error = 1,
  Warn = 2,
  Info = 3,
  Debug = 4,
}

export interface RoomStats {
  peers: number;
}

export enum StreamKinds {
  AUDIO = 'audio',
  VIDEO = 'video',
}

export enum Codecs {
  OPUS = 'OPUS',
  VP8 = 'VP8',
  VP9 = 'VP9',
  H264 = 'H264',
}

export enum ContentHint {
  None = 'none',
  Motion = 'motion',
  Detail = 'detail',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;

export enum LatencyMode {
  UltraLow = 'ultra-low',
  Default = 'default',
  Smooth200 = 'smooth-200',
  Smooth500 = 'smooth-500',
  Smooth800 = 'smooth-800',
  Smooth1000 = 'smooth-1000',
  Smooth2000 = 'smooth-2000',
}

export enum BitrateControlMode {
  SumBitrateWithClientSide = 'SumBitrateWithClientSide',
  SumBitrateOnly = 'SumBitrateOnly',
  PerStream = 'PerStream',
}

export enum MixMinusMode {
  AllAudioStreams = 'AllAudioStreams',
  ManualAudioStreams = 'ManualAudioStreams',
}

export enum StreamRemoteScalingType {
  SINGLE = 'single',
  SIMULCAST = 'simulcast',
  SVC = 'svc',
}

export enum StreamRemoteStatus {
  New = 'new',
  Connecting = 'connecting',
  Connected = 'connected',
  Reconnecting = 'reconnecting',
  Disconnected = 'disconnected',
}

export type RemoteStreamQuality = {
  peer: string;
  name: string;
  kind: StreamKinds;
  mos: number;
  slot?: number;
};

export type SessionEvent = keyof ISessionCallbacks;

/**
 * @param priority - The priority of the stream (default: 50).
 * @param minSpatial - The minimum spatial limit for the stream (default: 0).
 * @param maxSpatial - The maximum spatial limit (default: 2).
 * @param minTemporal - The minimum temporal layer for the stream (default: 0).
 * @param maxTemporal - The maximum temporal limit (default: 2).
 */
export type StreamLimit = {
  priority: number;
  minSpatial?: number;
  maxSpatial: number;
  minTemporal?: number;
  maxTemporal: number;
};
