export default class EventEmitter {
    events: any;
    emit(event: string, ...args: any): void;
    on(event: string, cb: any): () => any;
    off(event: string, cb: any): void;
    offAllListeners(): void;
    removeAllListeners(): void;
    removeListener(event: string, cb: any): void;
}
//# sourceMappingURL=simple-event-emiiter.d.ts.map