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

export enum StreamReceiverState {
  NoSource = 'no_source',
  Connecting = 'connecting',
  Live = 'live',
  Pause = 'paused',
  KeyOnly = 'key_only',
  SourceDeactived = 'source_deactived',
}

export enum MixMinusMode {
  AllAudioStreams = 'AllAudioStreams',
  ManualAudioStreams = 'ManualAudioStreams',
}

/**
 * Mapping of latency modes to maximum packets.
 * This is to configure Audio Jitter Buffer Max Packets for React Native WebRTC.
 *
 */
export const LatencyMode2MaxPackets = {
  [LatencyMode.UltraLow]: [10, 10],
  [LatencyMode.Smooth200]: [20, 20],
  [LatencyMode.Smooth500]: [25, 25],
  [LatencyMode.Smooth800]: [40, 40],
  [LatencyMode.Smooth1000]: [50, 50],
  [LatencyMode.Smooth2000]: [100, 100],
  [LatencyMode.Default]: [undefined, undefined],
};

/**
 * Mapping of latency modes to playout delay hints. Also for React Native WebRTC, maybe?
 */
export const LatencyMode2DelayHint = {
  [LatencyMode.UltraLow]: 0,
  [LatencyMode.Smooth200]: 0.2,
  [LatencyMode.Smooth500]: 0.5,
  [LatencyMode.Smooth800]: 0.8,
  [LatencyMode.Smooth1000]: 1,
  [LatencyMode.Smooth2000]: 2,
  [LatencyMode.Default]: undefined,
};

export enum StreamRemoteEvent {
  STATE = 'state',
  CLOSED = 'closed',
}

export enum StreamRemoteScalingType {
  SINGLE = 'single',
  SIMULCAT = 'simulcast',
  SVC = 'svc',
}

export enum StreamRemoteStatus {
  New = 'new',
  Connecting = 'connecting',
  Connected = 'connected',
  Reconnecting = 'reconnecting',
  Disconnected = 'disconnected',
}
