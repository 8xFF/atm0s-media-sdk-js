import type { ReceiverInfo } from '../interfaces/receiver';
import type {
  IReceiverTrack,
  IReceiverTrackCallbacks,
  ISenderTrack,
  ISenderTrackCallbacks,
} from '../interfaces/tracks';
import { addTransceiverPreferredCodecs, addTransceiverSimulcast, configLatencyMode } from '../utils/transceiver';
import { getTrack } from '../utils/shared';
import { TypedEventEmitter } from '../utils/typed-event-emitter';
import { ContentHint, LatencyMode, StreamKinds } from '../utils/types';
import type { SenderConfig } from '../interfaces';

export class SenderTrack extends TypedEventEmitter<ISenderTrackCallbacks> implements ISenderTrack {
  private static seed = 0;
  public uuid: string;
  public stream: MediaStream | null = null;
  public get label() {
    return this.trackId ? this.info.label || this.getTrack()?.label || 'unknown' : undefined;
  }
  public get name() {
    return this.info.name;
  }
  public get kind() {
    return this.info.kind;
  }
  public get screen() {
    return this.info.screen;
  }
  public get simulcast() {
    return this.info.simulcast;
  }
  public get maxBitrate() {
    return this.info.maxBitrate;
  }

  get trackId() {
    return this.getTrack()?.id;
  }

  constructor(
    private info: SenderConfig,
    public transceiver?: RTCRtpTransceiver,
  ) {
    super();
    this.uuid = `sender-${info.kind}-${SenderTrack.seed++}`;
    this.stream = info.stream || new MediaStream();
    if (info.contentHint && this.getTrack() && info.contentHint !== ContentHint.None) {
      this.getTrack()!.contentHint = info.contentHint;
    }
    if (transceiver?.sender && info.kind === StreamKinds.VIDEO) {
      if (info.simulcast) {
        addTransceiverSimulcast(transceiver, {
          maxBitrate: this.maxBitrate,
          isScreen: this.screen,
        });
      }
      if (info.preferredCodecs) {
        addTransceiverPreferredCodecs(transceiver, this.kind, info.preferredCodecs);
      }
    }
  }

  replaceStream(stream: MediaStream | null, label?: string) {
    if (label && label !== this.info.label) {
      this.info.label = label;
    }
    if (this.stream && stream === this.stream) {
      return;
    }
    this.stream = stream;
    if (this.transceiver) {
      this.transceiver.sender.replaceTrack(getTrack(stream, this.info.kind) || null);
    } else {
      this.uuid = `sender-${this.kind}-${SenderTrack.seed++}`;
    }

    if (this.info.contentHint && this.getTrack()) {
      this.getTrack()!.contentHint = this.info.contentHint;
    }
  }

  getTrack() {
    return getTrack(this.stream, this.kind);
  }

  stop() {
    this.stream?.getTracks().forEach((track) => track.stop());
    this.emit('stopped', this);
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
  get kind() {
    return this.info.kind;
  }
  get remoteId() {
    return this.info.remoteId;
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
    this.emit('stopped', this);
  }

  pause() {
    this.stream.getTracks().forEach((track) => (track.enabled = false));
  }
}
