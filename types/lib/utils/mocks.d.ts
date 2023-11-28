/// <reference types="jest" />
import { RealtimeSocketState, type IRealtimeSocket } from '../interfaces';
import { TypedEventEmitter } from './typed-event-emitter';
export declare class MockRTSocket extends TypedEventEmitter<any> implements IRealtimeSocket {
    private _id;
    private _state;
    get id(): string;
    get state(): RealtimeSocketState;
    constructor();
    connect: jest.Mock<any, any, any>;
    send: jest.Mock<any, any, any>;
    createReceiverTrack: jest.Mock<any, any, any>;
    createSenderTrack: jest.Mock<any, any, any>;
    generateOffer: jest.Mock<any, any, any>;
    updateSdp: jest.Mock<any, any, any>;
    close(): void;
}
//# sourceMappingURL=mocks.d.ts.map