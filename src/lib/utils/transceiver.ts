import { configReceiverLatencyMode } from './latency-mode';
import { StreamKinds, type Codecs } from './types';
import { LatencyMode } from './types';

export interface RTCRtpTransceiverInitExtended {
  kind: StreamKinds;
  simulcast?: boolean;
  isScreen?: boolean;
  maxBitrate?: number;
  preferredCodecs?: Codecs[];
}

/**
 * Adds simulcast settings to an RTCRtpTransceiver.
 * @param transceiver - The RTCRtpTransceiver to add simulcast settings to.
 * @param opts - Optional parameters for simulcast settings.
 * @param opts.maxBitrate - The maximum bitrate for the simulcast streams.
 * @param opts.isScreen - Indicates whether the simulcast is for screen sharing.
 * @returns The modified RTCRtpTransceiver with simulcast settings.
 */
export function addTransceiverSimulcast(
  transceiver: RTCRtpTransceiver,
  opts?: { maxBitrate?: number; isScreen?: boolean },
): RTCRtpTransceiver {
  if (transceiver && transceiver.sender) {
    const parameters = transceiver.sender.getParameters();
    parameters.encodings = opts?.isScreen
      ? [
          { rid: '1', active: true },
          { rid: '0', active: true },
        ]
      : [
          {
            rid: '2',
            active: true,
            ...(opts?.maxBitrate && {
              maxBitrate: Math.floor((opts?.maxBitrate * 5) / 8),
            }),
          },
          {
            rid: '1',
            active: true,
            ...(opts?.maxBitrate && {
              maxBitrate: Math.floor((opts?.maxBitrate * 2) / 8),
            }),
            scaleResolutionDownBy: 2,
          },
          {
            rid: '0',
            active: true,
            ...(opts?.maxBitrate && {
              maxBitrate: Math.floor((opts?.maxBitrate * 1) / 8),
            }),
            scaleResolutionDownBy: 2,
          },
        ];
    transceiver.sender.setParameters(parameters);
  }
  return transceiver;
}

/**
 * Adds preferred codecs to the given RTCRtpTransceiver based on the specified kind of stream.
 * @param transceiver - The RTCRtpTransceiver to add preferred codecs to.
 * @param kind - The kind of stream (e.g., "audio" or "video").
 * @param preferred - An array of preferred codecs.
 * @returns The modified RTCRtpTransceiver with the preferred codecs added.
 */
export function addTransceiverPreferredCodecs(
  transceiver: RTCRtpTransceiver,
  kind: StreamKinds,
  preferred: Codecs[],
): RTCRtpTransceiver {
  if (preferred && preferred.length > 0) {
    const codecs = RTCRtpSender.getCapabilities(kind)?.codecs;
    if (!codecs) return transceiver;
    codecs.sort((c1, c2) => {
      let c1_index = (preferred as string[]).indexOf(c1.mimeType.replace('video/', ''));
      let c2_index = (preferred as string[]).indexOf(c2.mimeType.replace('video/', ''));

      if (c1_index! < 0) c1_index = 1000;
      if (c2_index! < 0) c2_index = 1000;
      if (c1_index! < c2_index!) {
        return -1;
      }
      if (c1_index! > c2_index!) {
        return 1;
      }
      return 0;
    });
    transceiver.setCodecPreferences(codecs);
  }
  return transceiver;
}

export function configLatencyMode(transceiver: RTCRtpTransceiver, latencyMode: LatencyMode) {
  configReceiverLatencyMode(transceiver.receiver, latencyMode);
}
