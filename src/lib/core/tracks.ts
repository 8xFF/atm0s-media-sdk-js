import type { ReceiverInfo } from '../interfaces/receiver';
import type { IReceiverTrack, IReceiverTrackCallbacks, ISenderTrack, SenderTrackInfo } from '../interfaces/tracks';
import { addTransceiverPreferredCodecs, addTransceiverSimulcast, configLatencyMode } from '../utils/transceiver';
import { getTrack } from '../utils/shared';
import { TypedEventEmitter } from '../utils/typed-event-emitter';
import { ContentHint, LatencyMode, StreamKinds } from '../utils/types';

export class SenderTrack implements ISenderTrack {
  private static seed = 0;
  public uuid: string;
  public stream: MediaStream | null = null;

  get trackId() {
    return this.getTrack()?.id;
  }

  constructor(
    public info: SenderTrackInfo,
    public transceiver?: RTCRtpTransceiver,
  ) {
    this.uuid = `sender-${info.kind}-${SenderTrack.seed++}`;
    if (info.stream) {
      this.stream = info.stream;
    }
    if (info.contentHint && this.getTrack() && info.contentHint !== ContentHint.None) {
      this.getTrack()!.contentHint = info.contentHint;
    }
    if (transceiver?.sender && info.kind === StreamKinds.VIDEO) {
      if (info.simulcast) {
        addTransceiverSimulcast(transceiver, {
          maxBitrate: info.maxBitrate,
          isScreen: info.screen,
        });
      }
      if (info.preferredCodecs) {
        addTransceiverPreferredCodecs(transceiver, info.kind, info.preferredCodecs);
      }
    }
  }

  replaceStream(stream: MediaStream | null) {
    if (stream === this.stream) {
      return;
    }
    this.stream = stream;
    if (this.transceiver) {
      this.transceiver.sender.replaceTrack(getTrack(stream, this.info.kind) || null);
    }

    if (this.info.contentHint && this.getTrack()) {
      this.getTrack()!.contentHint = this.info.contentHint;
    }
  }

  getTrack() {
    return getTrack(this.stream, this.info.kind);
  }

  stop() {
    this.stream?.getTracks().forEach((track) => track.stop());
  }

  pause() {
    this.stream?.getTracks().forEach((track) => (track.enabled = false));
  }
}

export class ReceiverTrack extends TypedEventEmitter<IReceiverTrackCallbacks> implements IReceiverTrack {
  private static seed = 0;
  public uuid: string;
  public hasTrack: boolean = false;
  public stream: MediaStream;
  get trackId() {
    return this.getTrack()?.id;
  }
  constructor(
    public info: ReceiverInfo,
    public transceiver?: RTCRtpTransceiver,
  ) {
    super();
    const track = this.getTrack();
    this.stream = new MediaStream();
    this.uuid = track?.id || `receiver-${info.kind}-${ReceiverTrack.seed++}`;
    if (transceiver?.receiver) {
      if (info.codecs && info.kind === StreamKinds.VIDEO) {
        addTransceiverPreferredCodecs(transceiver, info.kind, info.codecs);
      }
      if (info.latencyMode && info.latencyMode !== LatencyMode.Default) {
        configLatencyMode(transceiver, info.latencyMode);
      }
    }
  }

  getTrack() {
    return getTrack(this.stream, this.info.kind);
  }

  addTrack(track: MediaStreamTrack) {
    this.stream.addTrack(track);
    this.hasTrack = true;
    this.emit('track_added', track);
  }

  stop() {
    this.stream.getTracks().forEach((track) => track.stop());
  }

  pause() {
    this.stream.getTracks().forEach((track) => (track.enabled = false));
  }
}
