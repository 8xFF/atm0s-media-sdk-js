import type { TypedEventEmitter } from '../utils/typed-event-emitter';
import type { ReceiverInfo } from './receiver';
import type { SenderConfig } from './sender';

export interface IReceiverTrackCallbacks {
  track_added: (track: MediaStreamTrack) => void;
}

export interface SenderTrackInfo extends SenderConfig {
  label: string;
}

export interface ISenderTrack {
  uuid: string;
  info: SenderTrackInfo;
  transceiver?: RTCRtpTransceiver;
  stream: MediaStream | null;
  trackId: string | undefined;
  replaceStream(stream: MediaStream | null): void;
  getTrack(): MediaStreamTrack | null | undefined;
  stop(): void;
  pause(): void;
}

export interface IReceiverTrack
  extends TypedEventEmitter<IReceiverTrackCallbacks> {
  uuid: string;
  info: ReceiverInfo;
  transceiver?: RTCRtpTransceiver;
  hasTrack: boolean;
  stream: MediaStream;
  trackId: string | undefined;
  getTrack(): MediaStreamTrack | null | undefined;
  addTrack(track: MediaStreamTrack): void;
  stop(): void;
  pause(): void;
}
