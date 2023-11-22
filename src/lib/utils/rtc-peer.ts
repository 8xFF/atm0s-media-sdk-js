export interface RTCRtpTransceiverInitExtended extends RTCRtpTransceiverInit {
  simulcast?: boolean;
  isScreen?: boolean;
  maxBitrate?: number;
  preferredCodecs?: { kind: string; codecs: string[] };
}

export class RTCPeerConnectionAugmented extends RTCPeerConnection {
  constructor(configuration?: RTCConfiguration) {
    super(configuration);
  }

  override addTransceiver(
    trackOrKind: MediaStreamTrack | string,
    init?: RTCRtpTransceiverInitExtended,
  ): RTCRtpTransceiver {
    const transceiver = super.addTransceiver(trackOrKind, init);
    if (init?.simulcast) {
      if (transceiver && transceiver.sender) {
        const parameters = transceiver.sender.getParameters();
        parameters.encodings = init?.isScreen
          ? [
              { rid: '1', active: true },
              { rid: '0', active: true },
            ]
          : [
              {
                rid: '2',
                active: true,
                ...(init?.maxBitrate && {
                  maxBitrate: Math.floor((init?.maxBitrate * 5) / 8),
                }),
              },
              {
                rid: '1',
                active: true,
                ...(init?.maxBitrate && {
                  maxBitrate: Math.floor((init?.maxBitrate * 2) / 8),
                }),
                scaleResolutionDownBy: 2,
              },
              {
                rid: '0',
                active: true,
                ...(init?.maxBitrate && {
                  maxBitrate: Math.floor((init?.maxBitrate * 1) / 8),
                }),
                scaleResolutionDownBy: 2,
              },
            ];
        transceiver.sender.setParameters(parameters);
      }
    }

    if (init?.preferredCodecs) {
      const codecs = RTCRtpSender.getCapabilities(init.preferredCodecs.kind)
        ?.codecs;
      if (!codecs) return transceiver;
      codecs.sort((c1, c2) => {
        let c1_index = init.preferredCodecs?.codecs.indexOf(
          c1.mimeType.replace('video/', ''),
        );
        let c2_index = init.preferredCodecs?.codecs.indexOf(
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
}
