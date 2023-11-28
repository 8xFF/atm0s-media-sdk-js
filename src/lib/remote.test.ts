import { StreamRemote } from './remote';
import {
  StreamKinds,
  StreamRemoteScalingType,
  StreamRemoteStatus,
} from './utils/types';

describe('StreamRemote', () => {
  const kind = 'video' as StreamKinds;
  const peerId = 'peer123';
  const peerHash = 'hash123';
  const name = 'stream';

  let streamRemote: StreamRemote;

  beforeEach(() => {
    streamRemote = new StreamRemote(kind, peerId, peerHash, name);
  });

  test('should initialize with default state', () => {
    expect(streamRemote.state).toEqual({
      scaling: StreamRemoteScalingType.SINGLE,
      layers: [],
      status: StreamRemoteStatus.New,
      active: true,
    });
  });

  test('should update state and emit event', () => {
    const newState = {
      scaling: StreamRemoteScalingType.SIMULCAST,
      layers: [0, 1],
      status: StreamRemoteStatus.Connected,
      active: false,
    };

    const stateEventCallback = jest.fn();
    streamRemote.on('state', stateEventCallback);

    streamRemote.updateState(newState);

    expect(streamRemote.state).toEqual(newState);
    expect(stateEventCallback).toHaveBeenCalledWith(
      newState,
      undefined,
      undefined,
      undefined,
    );
  });

  test('should emit CLOSED event when closed', () => {
    const closedEventCallback = jest.fn();
    streamRemote.on('closed', closedEventCallback);

    streamRemote.close();

    expect(closedEventCallback).toHaveBeenCalled();
  });
});
