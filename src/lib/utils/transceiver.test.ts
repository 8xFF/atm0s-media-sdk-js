import { addTransceiverPreferredCodecs, addTransceiverSimulcast } from './transceiver';
import type { Codecs, StreamKinds } from './types';

describe('addTransceiverSimulcast', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let transceiver: any;

  beforeEach(() => {
    transceiver = {
      sender: {
        getParameters: jest.fn(),
        setParameters: jest.fn(),
      },
    } as unknown as RTCRtpTransceiver;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set simulcast encodings for non-screen transceiver', () => {
    const opts = { maxBitrate: 1000, isScreen: false };

    const expectedParameters = {
      encodings: [
        { rid: '2', active: true, maxBitrate: 625 },
        { rid: '1', active: true, maxBitrate: 250, scaleResolutionDownBy: 2 },
        { rid: '0', active: true, maxBitrate: 125, scaleResolutionDownBy: 2 },
      ],
    };

    transceiver.sender.getParameters.mockReturnValueOnce({});
    addTransceiverSimulcast(transceiver, opts);

    expect(transceiver.sender.getParameters).toHaveBeenCalled();
    expect(transceiver.sender.setParameters).toHaveBeenCalledWith(expectedParameters);
  });

  test('should set simulcast encodings for screen transceiver', () => {
    const opts = { maxBitrate: 2000, isScreen: true };

    const expectedParameters = {
      encodings: [
        { rid: '1', active: true },
        { rid: '0', active: true },
      ],
    };

    transceiver.sender.getParameters.mockReturnValueOnce({});
    addTransceiverSimulcast(transceiver, opts);

    expect(transceiver.sender.getParameters).toHaveBeenCalled();
    expect(transceiver.sender.setParameters).toHaveBeenCalledWith(expectedParameters);
  });
});

describe('addTransceiverPreferredCodecs', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let transceiver: any;

  beforeEach(() => {
    transceiver = {
      sender: {
        getParameters: jest.fn(),
        setParameters: jest.fn(),
      },
      setCodecPreferences: jest.fn(),
    } as unknown as RTCRtpTransceiver;

    if (!globalThis.RTCRtpSender) {
      globalThis.RTCRtpSender = {
        getCapabilities: jest.fn(),
      } as unknown as typeof RTCRtpSender;
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set codec preferences for transceiver with preferred codecs', () => {
    const kind = 'video' as StreamKinds;
    const preferred = ['VP9', 'H264'] as Codecs[];

    const codecs = [{ mimeType: 'video/vp9' }, { mimeType: 'video/h264' }, { mimeType: 'video/vp8' }];

    const expectedCodecs = [{ mimeType: 'video/vp9' }, { mimeType: 'video/h264' }, { mimeType: 'video/vp8' }];

    RTCRtpSender.getCapabilities = jest.fn().mockReturnValueOnce({ codecs });

    addTransceiverPreferredCodecs(transceiver, kind, preferred);

    expect(RTCRtpSender.getCapabilities).toHaveBeenCalledWith(kind);
    expect(transceiver.setCodecPreferences).toHaveBeenCalledWith(expectedCodecs);
  });

  test('should not set codec preferences if preferred codecs are not provided', () => {
    const kind = 'video' as StreamKinds;
    const preferred: Codecs[] = [];

    addTransceiverPreferredCodecs(transceiver, kind, preferred);

    expect(RTCRtpSender.getCapabilities).not.toHaveBeenCalled();
    expect(transceiver.setCodecPreferences).not.toHaveBeenCalled();
  });
});
