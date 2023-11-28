import { LatencyMode } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function configPeerLatencyMode(
  config: RTCConfiguration,
  mode?: LatencyMode,
) {
  switch (mode) {
    case LatencyMode.UltraLow:
      (config as any).audioJitterBufferMaxPackets = 10; //for react native
      (config as any).rtcAudioJitterBufferMaxPackets = 10;
      break;
    case LatencyMode.Smooth200:
      (config as any).audioJitterBufferMaxPackets = 20; //for react native
      (config as any).rtcAudioJitterBufferMaxPackets = 20;
      break;
    case LatencyMode.Smooth500:
      (config as any).audioJitterBufferMaxPackets = 25; //for react native
      (config as any).rtcAudioJitterBufferMaxPackets = 25;
      break;
    case LatencyMode.Smooth800:
      (config as any).audioJitterBufferMaxPackets = 40; //for react native
      (config as any).rtcAudioJitterBufferMaxPackets = 40;
      break;
    case LatencyMode.Smooth1000:
      (config as any).audioJitterBufferMaxPackets = 50; //for react native
      (config as any).rtcAudioJitterBufferMaxPackets = 50;
      break;
    case LatencyMode.Smooth2000:
      (config as any).audioJitterBufferMaxPackets = 100; //for react native
      (config as any).rtcAudioJitterBufferMaxPackets = 100;
      break;
  }
}

export function configReceiverLatencyMode(
  receiver: RTCRtpReceiver,
  mode?: LatencyMode,
) {
  switch (mode) {
    case LatencyMode.UltraLow:
      (receiver as any).playoutDelayHint = 0;
      break;
    case LatencyMode.Smooth200:
      (receiver as any).playoutDelayHint = 0.2;
      break;
    case LatencyMode.Smooth500:
      (receiver as any).playoutDelayHint = 0.5;
      break;
    case LatencyMode.Smooth800:
      (receiver as any).playoutDelayHint = 0.8;
      break;
    case LatencyMode.Smooth1000:
      (receiver as any).playoutDelayHint = 1;
      break;
    case LatencyMode.Smooth2000:
      (receiver as any).playoutDelayHint = 2;
      break;
  }
}
