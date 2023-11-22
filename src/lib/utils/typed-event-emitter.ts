/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyMixin } from './shared';

class EventEmitter {
  events: any = {};

  emit(event: string, ...args: any) {
    for (const i of this.events[event] || []) {
      i(...args);
    }
  }

  on(event: string, cb: any) {
    (this.events[event] = this.events[event] || []).push(cb);
    return () =>
      (this.events[event] = this.events[event].filter((i: any) => i !== cb));
  }

  off(event: string, cb: any) {
    this.events[event] = this.events[event].filter((i: any) => i !== cb);
  }

  offAllListeners() {
    this.events = {};
  }

  removeAllListeners() {
    this.offAllListeners();
  }

  removeListener(event: string, cb: any) {
    this.off(event, cb);
  }

  listeners(event: string) {
    return this.events[event];
  }

  listenerCount(event: string) {
    return this.events[event].length;
  }
}

export type EventHandler =
  // Add more overloads as necessary
  | ((arg1: any, arg2: any, arg3: any, arg4: any) => void)
  | ((arg1: any, arg2: any, arg3: any) => void)
  | ((arg1: any, arg2: any) => void)
  | ((arg1: any) => void)
  | ((...args: any[]) => void);

export interface TypedEventEmitter<
  TEvents extends Record<keyof TEvents, EventHandler>,
> {
  on<TEvent extends keyof TEvents>(
    event: TEvent,
    callback: TEvents[TEvent],
  ): this;
  removeListener<TEvent extends keyof TEvents>(
    event: TEvent,
    callback: TEvents[TEvent],
  ): this;
  off<TEvent extends keyof TEvents>(
    event: TEvent,
    callback: TEvents[TEvent],
  ): this;

  offAllListeners(): this;
  removeAllListeners(): this;

  emit<TEvent extends keyof TEvents>(
    event: TEvent,
    ...args: Parameters<TEvents[TEvent]>
  ): boolean;

  listeners<TEvent extends keyof TEvents>(eventName: TEvent): TEvents[TEvent][];
  listenerCount<TEvent extends keyof TEvents>(
    event: TEvent,
    listener?: TEvents[TEvent],
  ): number;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class TypedEventEmitter<
  TEvents extends Record<keyof TEvents, EventHandler>,
> {}

// Make TypedEventEmitter inherit from EventEmitter without actually extending
applyMixin(TypedEventEmitter, EventEmitter);
