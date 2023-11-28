import { TypedEventEmitter } from './typed-event-emitter';

// Define event handlers
type EventHandler = (arg1: string, arg2: number) => void;

// Define events
interface Events {
  event1: EventHandler;
  event2: EventHandler;
  event3: EventHandler;
}

describe('TypedEventEmitter', () => {
  let emitter: TypedEventEmitter<Events>;

  beforeEach(() => {
    emitter = new TypedEventEmitter();
  });

  afterEach(() => {
    emitter.offAllListeners();
  });

  test('should emit and handle events', () => {
    const event1Handler = jest.fn();
    const event2Handler = jest.fn();

    emitter.on('event1', event1Handler);
    emitter.on('event2', event2Handler);

    emitter.emit('event1', 'arg1', 123);
    emitter.emit('event2', 'arg2', 456);

    expect(event1Handler).toHaveBeenCalledWith(
      'arg1',
      123,
      undefined,
      undefined,
    );
    expect(event2Handler).toHaveBeenCalledWith(
      'arg2',
      456,
      undefined,
      undefined,
    );
  });

  test('should remove event listener', () => {
    const event1Handler = jest.fn();
    const event2Handler = jest.fn();

    emitter.on('event1', event1Handler);
    emitter.on('event2', event2Handler);

    emitter.removeListener('event1', event1Handler);
    emitter.emit('event1', 'arg1', 123);
    emitter.emit('event2', 'arg2', 456);

    expect(event1Handler).not.toHaveBeenCalled();
    expect(event2Handler).toHaveBeenCalledWith(
      'arg2',
      456,
      undefined,
      undefined,
    );
  });

  test('should remove all event listeners', () => {
    const event1Handler = jest.fn();
    const event2Handler = jest.fn();

    emitter.on('event1', event1Handler);
    emitter.on('event2', event2Handler);

    emitter.removeAllListeners();
    emitter.emit('event1', 'arg1', 123);
    emitter.emit('event2', 'arg2', 456);

    expect(event1Handler).not.toHaveBeenCalled();
    expect(event2Handler).not.toHaveBeenCalled();
  });

  test('should return the correct number of listeners', () => {
    const event1Handler1 = jest.fn();
    const event1Handler2 = jest.fn();
    const event2Handler = jest.fn();

    emitter.on('event1', event1Handler1);
    emitter.on('event1', event1Handler2);
    emitter.on('event2', event2Handler);

    expect(emitter.listenerCount('event1')).toBe(2);
    expect(emitter.listenerCount('event2')).toBe(1);
    expect(emitter.listenerCount('event3')).toBe(0);
  });

  test('should return the registered listeners', () => {
    const event1Handler1 = jest.fn();
    const event1Handler2 = jest.fn();
    const event2Handler = jest.fn();

    emitter.on('event1', event1Handler1);
    emitter.on('event1', event1Handler2);
    emitter.on('event2', event2Handler);

    expect(emitter.listeners('event1')).toEqual([
      event1Handler1,
      event1Handler2,
    ]);
    expect(emitter.listeners('event2')).toEqual([event2Handler]);
    expect(emitter.listeners('event3')).toBeUndefined();
  });

  test('should handle multiple events with the same handler', () => {
    const event1Handler = jest.fn();

    emitter.onMany(['event1', 'event2'], event1Handler);

    emitter.emit('event1', 'arg1', 123);
    emitter.emit('event2', 'arg2', 456);

    expect(event1Handler).toHaveBeenCalledTimes(2);
    expect(event1Handler).toHaveBeenCalledWith(
      'arg1',
      123,
      undefined,
      undefined,
    );
    expect(event1Handler).toHaveBeenCalledWith(
      'arg2',
      456,
      undefined,
      undefined,
    );
  });
});
