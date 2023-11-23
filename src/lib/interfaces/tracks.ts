import type { SenderConfig } from './sender';

export interface IReceiverTrackCallbacks {
  track_added: (track: MediaStreamTrack) => void;
}

export interface SenderTrackInfo extends SenderConfig {
  label: string;
}
