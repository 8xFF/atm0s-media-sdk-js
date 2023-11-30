import { StreamSenderState, type IRPC, type ISenderTrack } from './interfaces';
import { StreamSender } from './sender';

describe('Sender', () => {
  let sender: StreamSender;
  let mockTrack: ISenderTrack;
  let mockRpc: IRPC;

  beforeEach(() => {
    mockRpc = {
      request: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    } as unknown as IRPC;
    mockTrack = {
      info: {
        name: 'test-sender',
        kind: 'video',
        simulcast: false,
        maxBitrate: 1000,
        screen: false,
        label: 'test-sender',
      },
      uuid: 'test-uuid',
      trackId: 'test-track-id',
      stream: new MediaStream(),
      replaceStream: jest.fn(),
      getTrack: jest.fn(),
      stop: jest.fn(),
    } as unknown as ISenderTrack;
    sender = new StreamSender(mockRpc, mockTrack);
  });

  test('should switch stream and update state when stream is provided', () => {
    const mockStream = new MediaStream();

    sender.switch(mockStream);

    expect(mockTrack.replaceStream).toHaveBeenCalledWith(mockStream);
    expect(mockRpc.request).toHaveBeenCalledWith('sender.toggle', {
      name: 'test-sender',
      kind: 'video',
      track: mockTrack.trackId,
      label: 'test-sender',
    });
    expect(sender.state).toEqual(StreamSenderState.Connected);
  });

  test('should switch stream and update state when stream is null', () => {
    mockTrack.trackId = undefined;
    sender.switch(null);

    expect(mockTrack.replaceStream).toHaveBeenCalledWith(null);
    expect(mockRpc.request).toHaveBeenCalledWith('sender.toggle', {
      name: 'test-sender',
      kind: 'video',
      track: undefined,
      label: 'test-sender',
    });
    expect(sender.state).toEqual(StreamSenderState.Deactivated);
  });

  test('should stop stream', () => {
    mockTrack.trackId = undefined;
    sender.stop();

    expect(mockTrack.stop).toHaveBeenCalled();
    expect(mockRpc.off).toHaveBeenCalledWith(`remote_stream_${sender.name}_state`, expect.any(Function));
    expect(mockRpc.off).toHaveBeenCalledWith(`remote_stream_${sender.name}_audio_level`, expect.any(Function));
    expect(mockRpc.request).toHaveBeenCalledWith('sender.toggle', {
      name: 'test-sender',
      kind: 'video',
      track: null,
    });
    expect(sender.state).toEqual(StreamSenderState.Closed);
  });
});
