import { LatencyMode, StreamKinds } from '../utils/types';
import { TypedEventEmitter } from '../utils/typed-event-emitter';
import type { ReceiverTrack, SenderTrack } from '../core/tracks';
import type { ISessionConfig } from './session';
import type { SenderConfig } from './sender';

export interface IRealtimeSocketCallbacks {
  message: <T>(data: T) => void;
  peer_state: (state: RealtimeSocketState) => void;
  dc_state: (state: RealtimeSocketState) => void;
  ice_state: (state: RTCIceConnectionState) => void;
}

export type OfferMeta = {
  sdp: string;
  senders: {
    uuid: string;
    label: string;
    kind: StreamKinds;
    screen?: boolean;
  }[];
  receivers: {
    audio: number;
    video: number;
  };
};

/**
 * Represents a real-time socket used for communication with a media gateway.
 */
export interface IRealtimeSocket extends TypedEventEmitter<IRealtimeSocketCallbacks> {
  /**
   * Connects the socket to the media gateway using the provided connector and session configuration.
   * @param connector - The media gateway connector.
   * @param config - The session configuration.
   * @returns A promise that resolves when the connection is established.
   */
  connect(config: ISessionConfig): Promise<void>;

  /**
   * Creates a `ReceiverTrack` with the specified ID and kind.
   * @param kind - The kind of the receiver track.
   * @returns The created receiver track.
   */
  createReceiverTrack(kind: StreamKinds): ReceiverTrack;

  /**
   * Creates a `SenderTrack` with the specified configuration.
   * @param cfg - The configuration of the sender track.
   * @returns The created sender track.
   */
  createSenderTrack(cfg: SenderConfig): SenderTrack;

  /**
   * Generates an offer for establishing a connection with the media gateway.
   * @returns A promise that resolves with the generated offer and metadata.
   */
  generateOffer(): Promise<{
    offer: RTCSessionDescriptionInit;
    meta: OfferMeta;
  }>;

  /**
   * Reconnects the socket.
   * @returns A promise that resolves when the socket is reconnected.
   * @remarks This method is used when the ICE connection is lost.
   *
   */
  reconnect(): Promise<void>;

  /**
   * Updates the SDP (Session Description Protocol) with the local offer and remote answer SDP.
   * @param localOffer - The local offer SDP.
   * @param remoteAnswerSdp - The remote answer SDP.
   */
  updateSdp(localOffer: RTCSessionDescriptionInit, remoteAnswerSdp: string): void;

  /**
   * Sends data over the socket.
   * @param data - The data to send.
   */
  send(data: string | Uint8Array): void;

  /**
   * Closes the socket.
   */
  close(): void;
}

export interface IRealtimeSocketOptions {
  iceServers?: RTCIceServer[];
  latencyMode?: LatencyMode;
}

export enum RealtimeSocketState {
  Created = 'created',
  Connecting = 'connecting',
  Connected = 'connected',
  Disconnected = 'disconnected',
  Reconnected = 'reconnected',
  Reconnecting = 'reconnecting',
  Failed = 'failed',
  Closed = 'closed',
}
