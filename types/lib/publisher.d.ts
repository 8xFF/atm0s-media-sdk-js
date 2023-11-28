import { StreamSenderState, type SenderConfig } from './interfaces';
import type { IPublisherCallbacks } from './interfaces/publisher';
import type { Session } from './session';
import { TypedEventEmitter } from './utils/typed-event-emitter';
export declare class StreamPublisher extends TypedEventEmitter<IPublisherCallbacks> {
    private _session;
    private _senderConfig;
    private sender?;
    constructor(_session: Session, _senderConfig: SenderConfig);
    get state(): StreamSenderState;
    get localStream(): MediaStream | undefined | null;
    private onState;
    private onAudioLevel;
    switch(stream: MediaStream): void;
    stop(): void;
}
//# sourceMappingURL=publisher.d.ts.map