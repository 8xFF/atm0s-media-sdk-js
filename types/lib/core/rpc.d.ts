import type { AnyFunction } from '../utils/types';
import type { IRPC, RpcRequests, RpcResponse } from '../interfaces/rpc';
import { type IRealtimeSocket } from '../interfaces/rtsocket';
export declare class RpcRequest {
    reqId: number;
    private method;
    private params;
    resolve: (data: any) => void;
    reject: (error: any) => void;
    createdAt: Date;
    constructor(reqId: number, method: string, params: any, resolve: (data: any) => void, reject: (error: any) => void);
    toJson(): {
        req_id: number;
        type: string;
        request: string;
        data: any;
    };
}
export declare class RPC implements IRPC {
    private _socket;
    private _reqSeed;
    private _msgDecoder;
    private logger;
    private _handlers;
    private _reqs;
    connected: boolean;
    constructor(_socket: IRealtimeSocket);
    private emit;
    private _preprocess;
    private _handleEvent;
    private _handleAnswer;
    private _process;
    request<T>(cmd: keyof RpcRequests, data: RpcRequests[typeof cmd]): Promise<RpcResponse<T>>;
    on(cmd: string, handler: (event: string, data: any) => void): void;
    off(cmd: string, handler: AnyFunction): void;
    offAllListeners(cmd: string): void;
}
//# sourceMappingURL=rpc.d.ts.map