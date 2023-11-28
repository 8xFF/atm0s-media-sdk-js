/* eslint-disable @typescript-eslint/no-explicit-any */
import { RealtimeSocketState, type IRealtimeSocket } from '../interfaces';
import { TypedEventEmitter } from './typed-event-emitter';

export class MockRTSocket
  extends TypedEventEmitter<any>
  implements IRealtimeSocket
{
  private _id = 'mock-socket-id';
  private _state = RealtimeSocketState.Connecting;

  get id() {
    return this._id;
  }

  get state() {
    return this._state;
  }

  constructor() {
    super();
  }

  connect = jest.fn();
  send = jest.fn();
  createReceiverTrack = jest.fn();
  createSenderTrack = jest.fn();
  generateOffer = jest.fn();
  updateSdp = jest.fn();

  close() {
    this._state = RealtimeSocketState.Closed;
  }
}
