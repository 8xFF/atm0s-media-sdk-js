import { StreamKinds, type Codecs, LatencyMode2DelayHint } from './types';
import { LatencyMode } from './types';

export interface RTCRtpTransceiverInitExtended {
  kind: StreamKinds;
  simulcast?: boolean;
  isScreen?: boolean;
  maxBitrate?: number;
  preferredCodecs?: Codecs[];
}

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

export function addTransceiverPreferredCodecs(
  transceiver: RTCRtpTransceiver,
  kind: StreamKinds,
  preffered: Codecs[],
): RTCRtpTransceiver {
  if (preffered && preffered.length > 0) {
    const codecs = RTCRtpSender.getCapabilities(kind)?.codecs;
    if (!codecs) return transceiver;
    codecs.sort((c1, c2) => {
      let c1_index = (preffered as string[]).indexOf(
        c1.mimeType.replace('video/', ''),
      );
      let c2_index = (preffered as string[]).indexOf(
        c2.mimeType.replace('video/', ''),
      );

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

export function configLatencyMode(
  transceiver: RTCRtpTransceiver,
  latencyMode: LatencyMode,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (transceiver.receiver as any).playoutDelayHint =
    LatencyMode2DelayHint[latencyMode];
}
