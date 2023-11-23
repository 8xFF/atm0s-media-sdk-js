/* eslint-disable @typescript-eslint/no-explicit-any */
export class TypedEventEmitter<
  TEvents extends Record<keyof TEvents, EventHandler>,
> {
  private events: { [K in keyof TEvents]?: TEvents[K][] };

  constructor() {
    this.events = {};
  }

  emit(event: keyof TEvents, ...args: Parameters<TEvents[typeof event]>) {
    for (const i of this.events[event] || []) {
      i(args[0], args[1], args[2], args[3]);
    }
  }

  on<TEvent extends keyof TEvents>(
    event: TEvent,
    cb: TEvents[TEvent],
  ): () => any {
    (this.events[event] = this.events[event] || []).push(cb);
    return () =>
      (this.events[event] = this.events[event]!.filter((i: any) => i !== cb));
  }

  onMany<TEvent extends keyof TEvents>(
    events: TEvent[],
    cb: TEvents[TEvent],
  ): (() => any)[] {
    return events.map((event) => this.on(event, cb));
  }

  removeListener<TEvent extends keyof TEvents>(
    event: TEvent,
    cb: TEvents[TEvent],
  ) {
    this.off(event, cb);
  }

  off<TEvent extends keyof TEvents>(event: TEvent, cb: TEvents[TEvent]) {
    this.events[event] = this.events[event]!.filter((i: any) => i !== cb);
  }

  offAllListeners() {
    this.events = {};
  }

  removeAllListeners() {
    return this.offAllListeners();
  }

  listeners<TEvent extends keyof TEvents>(
    eventName: TEvent,
  ): TEvents[TEvent][] | undefined {
    return this.events[eventName];
  }

  listenerCount<TEvent extends keyof TEvents>(event: TEvent): number {
    if (!this.events[event]) {
      return 0;
    }
    return this.events[event]!.length;
  }
}

export type EventHandler =
  // Add more overloads as necessary
  | ((arg1: any, arg2: any, arg3: any, arg4: any) => void)
  | ((arg1: any, arg2: any, arg3: any) => void)
  | ((arg1: any, arg2: any) => void)
  | ((arg1: any) => void)
  | ((...args: any[]) => void);
