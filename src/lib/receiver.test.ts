/* eslint-disable @typescript-eslint/no-explicit-any */
import { StreamReceiverState, type IReceiverTrack } from './interfaces';
import { StreamReceiver } from './receiver';
import type { StreamRemote } from './remote';
import type { StreamKinds } from './utils/types';

describe('StreamReceiver', () => {
  let rpc: any;
  let track: IReceiverTrack;
  let receiver: StreamReceiver;

  beforeEach(() => {
    rpc = {
      on: jest.fn(),
      off: jest.fn(),
      request: jest.fn(),
      connected: true,
    } as any;
    track = {
      stream: new MediaStream(),
      info: {
        kind: 'video' as StreamKinds,
        remoteId: '123',
      },
      hasTrack: false,
      on: jest.fn(),
      stop: jest.fn(),
    } as unknown as IReceiverTrack;

    receiver = new StreamReceiver(rpc, track, {} as any);
  });

  test('should initialize with correct state and properties', () => {
    expect(receiver.state).toBe(StreamReceiverState.NoSource);
    expect(receiver.kind).toBe('video');
    expect(receiver.remoteId).toBe('123');
  });

  test('should set state and emit event when receiving state update', () => {
    const stateUpdate = { state: 'live' };
    receiver.emit = jest.fn();

    const callback = rpc.on.mock.calls[0][1];
    callback('state', stateUpdate);

    expect(receiver.emit).toHaveBeenCalledWith('state', 'live');
    expect(receiver.state).toBe(StreamReceiverState.Live);
  });

  test('should emit audio_level event when receiving audio level update', () => {
    const audioLevelUpdate = { level: 50 };
    receiver.emit = jest.fn();

    const callback = (rpc.on as any).mock.calls[1][1];
    callback('audio', audioLevelUpdate);

    expect(receiver.emit).toHaveBeenCalledWith('audio_level', 50);
  });

  test('should resolve internalReady when track is added', async () => {
    receiver['_setState'] = jest.fn();
    receiver['_track'].hasTrack = true;

    const promise = receiver['internalReady']();
    const result = await promise;

    expect(result).toBe(true);
    expect(receiver['_setState']).not.toHaveBeenCalled();
  });

  test('should switch stream and return true if successful', async () => {
    receiver['_setState'] = jest.fn();
    receiver['_track'].stream = {} as any;
    receiver['_track'].hasTrack = true;

    rpc.request.mockResolvedValueOnce({ status: true });

    const remote: StreamRemote = {
      name: 'stream1',
      peerId: 'peer1',
    } as unknown as StreamRemote;
    const result = await receiver.switch(remote);

    expect(result).toBe(true);
    expect(receiver['_setState']).toHaveBeenCalledWith(StreamReceiverState.Connecting);
    expect(rpc.request).toHaveBeenCalledWith('receiver.switch', {
      id: '123',
      priority: 50,
      remote: { peer: 'peer1', stream: 'stream1' },
    });
  });

  test('should switch stream and return false if unsuccessful', async () => {
    receiver['_setState'] = jest.fn();
    receiver['_track'].stream = {} as any;
    receiver['_track'].hasTrack = true;

    rpc.request.mockResolvedValueOnce({ status: false });

    const remote: StreamRemote = {
      name: 'stream1',
      peerId: 'peer1',
    } as unknown as StreamRemote;
    const result = await receiver.switch(remote);

    expect(result).toBe(false);
    expect(receiver['_setState']).toHaveBeenCalledWith(StreamReceiverState.NoSource);
    expect(rpc.request).toHaveBeenCalledWith('receiver.switch', {
      id: '123',
      priority: 50,
      remote: { peer: 'peer1', stream: 'stream1' },
    });
  });

  test('should limit stream and return true if successful', async () => {
    receiver['_track'].stream = {} as any;
    receiver['_track'].hasTrack = true;

    rpc.request.mockResolvedValueOnce({ status: true });

    const result = await receiver.limit(50, 2, 3);

    expect(result).toBe(true);
    expect(rpc.request).toHaveBeenCalledWith('receiver.limit', {
      id: '123',
      priority: 50,
      max_spatial: 2,
      max_temporal: 3,
    });
  });

  test('should limit stream and return false if unsuccessful', async () => {
    receiver['_track'].stream = {} as any;
    receiver['_track'].hasTrack = true;

    rpc.request.mockResolvedValueOnce({ status: false });

    const result = await receiver.limit(50, 2, 3);

    expect(result).toBe(false);
    expect(rpc.request).toHaveBeenCalledWith('receiver.limit', {
      id: '123',
      priority: 50,
      max_spatial: 2,
      max_temporal: 3,
    });
  });

  test('should disconnect stream and return true if successful', async () => {
    receiver['_state'] = StreamReceiverState.Live;

    rpc.request.mockResolvedValueOnce({ status: true });

    const result = await receiver.disconnect();

    expect(result).toBe(true);
    expect(receiver.state).toBe(StreamReceiverState.NoSource);
    expect(rpc.request).toHaveBeenCalledWith('receiver.disconnect', {
      id: '123',
    });
  });

  test('should disconnect stream and return false if unsuccessful', async () => {
    receiver['_state'] = StreamReceiverState.Live;

    rpc.request.mockResolvedValueOnce({ status: false });

    const result = await receiver.disconnect();

    expect(receiver.state).toBe(StreamReceiverState.Live);
    expect(result).toBe(false);
    expect(rpc.request).toHaveBeenCalledWith('receiver.disconnect', {
      id: '123',
    });
  });
});
