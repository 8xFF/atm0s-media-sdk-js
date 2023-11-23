export declare class TypedEventEmitter<TEvents extends Record<keyof TEvents, EventHandler>> {
    private events;
    constructor();
    emit(event: keyof TEvents, ...args: Parameters<TEvents[typeof event]>): void;
    on<TEvent extends keyof TEvents>(event: TEvent, cb: TEvents[TEvent]): () => any;
    onMany<TEvent extends keyof TEvents>(events: TEvent[], cb: TEvents[TEvent]): (() => any)[];
    removeListener<TEvent extends keyof TEvents>(event: TEvent, cb: TEvents[TEvent]): void;
    off<TEvent extends keyof TEvents>(event: TEvent, cb: TEvents[TEvent]): void;
    offAllListeners(): void;
    removeAllListeners(): void;
    listeners<TEvent extends keyof TEvents>(eventName: TEvent): TEvents[TEvent][] | undefined;
    listenerCount<TEvent extends keyof TEvents>(event: TEvent): number;
}
export type EventHandler = ((arg1: any, arg2: any, arg3: any, arg4: any) => void) | ((arg1: any, arg2: any, arg3: any) => void) | ((arg1: any, arg2: any) => void) | ((arg1: any) => void) | ((...args: any[]) => void);
//# sourceMappingURL=typed-event-emitter.d.ts.map