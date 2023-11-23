import type { ReceiverInfo } from '../interfaces/receiver';
import type {
  IReceiverTrackCallbacks,
  SenderTrackInfo,
} from '../interfaces/tracks';
import { addTransceiverConfigs } from '../utils/rtc-peer';
import { getTrack } from '../utils/shared';
import { TypedEventEmitter } from '../utils/typed-event-emitter';

export class SenderTrack {
  private static seed = 0;
  public uuid: string;
  public stream: MediaStream | null = null;
  constructor(
    public info: SenderTrackInfo,
    public transceiver?: RTCRtpTransceiver,
  ) {
    this.uuid = `sender-${info.kind}-${SenderTrack.seed++}`;
    if (info.stream) {
      this.stream = info.stream;
    }
    if (transceiver) {
      addTransceiverConfigs(transceiver, {
        kind: info.kind,
        preferredCodecs: info.preferredCodecs!,
        simulcast: info.simulcast,
        maxBitrate: info.maxBitrate,
        isScreen: info.screen,
      });
    }
  }

  replaceStream(stream: MediaStream | null) {
    if (stream === this.stream) {
      return;
    }
    this.stream = stream;
    if (this.transceiver) {
      this.transceiver.sender.replaceTrack(
        getTrack(stream, this.info.kind) || null,
      );
    }
  }

  getTrack() {
    return getTrack(this.stream, this.info.kind);
  }
}

export class ReceiverTrack extends TypedEventEmitter<IReceiverTrackCallbacks> {
  private static seed = 0;
  public uuid: string;
  public hasTrack: boolean = false;
  public stream: MediaStream;
  constructor(
    public info: ReceiverInfo,
    public transceiver?: RTCRtpTransceiver,
  ) {
    super();
    const track = this.getTrack();
    this.stream = new MediaStream();
    this.uuid = track?.id || `receiver-${info.kind}-${ReceiverTrack.seed++}`;
  }

  getTrack() {
    return getTrack(this.stream, this.info.kind);
  }

  addTrack(track: MediaStreamTrack) {
    this.stream.addTrack(track);
    this.hasTrack = true;
    this.emit('track_added', track);
  }
}
