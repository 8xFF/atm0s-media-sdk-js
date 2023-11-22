import type { ReceiverInfo, SenderInfo } from '../utils/interface';
import { getTrack } from '../utils/shared';

export class SenderTrack {
  private static seed = 0;
  public uuid: string;
  constructor(
    public stream: MediaStream | null,
    public info: SenderInfo,
    public transceiver?: RTCRtpTransceiver,
  ) {
    this.uuid = `sender-${info.kind}-${SenderTrack.seed++}`;
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

export class ReceiverTrack {
  private static seed = 0;
  public uuid: string;
  constructor(
    public stream: MediaStream,
    public info: ReceiverInfo,
  ) {
    const track = this.getTrack();
    this.uuid = track?.id || `receiver-${info.kind}-${ReceiverTrack.seed++}`;
  }

  getTrack() {
    return getTrack(this.stream, this.info.kind);
  }
}
