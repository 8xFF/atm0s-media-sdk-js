/* eslint-disable @typescript-eslint/no-explicit-any */
export default class EventEmitter {
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
}
