/* eslint-disable @typescript-eslint/no-explicit-any */
import pako from 'pako';
import type { AnyFunction } from '../utils/types';
import { getLogger } from '../utils/logger';
import type { IRPC, RpcMessage, RpcRequests, RpcResponse } from '../interfaces/rpc';
import { RealtimeSocketState, type IRealtimeSocket } from '../interfaces/rtsocket';

export class RpcRequest {
  createdAt: Date;

  constructor(
    public reqId: number,
    private method: string,
    private params: any,
    public resolve: (data: any) => void,
    public reject: (error: any) => void,
  ) {
    this.createdAt = new Date();
  }

  toJson() {
    return {
      req_id: this.reqId,
      type: 'request',
      request: this.method,
      data: this.params,
    };
  }
}

export class RPC implements IRPC {
  private _reqSeed = 0;
  private _msgDecoder = new TextDecoder();
  private logger = getLogger('atm0s:rpc');
  private _handlers: Map<string, AnyFunction[]> = new Map();
  private _reqs: Map<number, RpcRequest> = new Map();

  connected = false;

  constructor(private _socket: IRealtimeSocket) {
    this._socket.on('message', this._preprocess);
    this._socket.on('dc_state', (state) => {
      if (state === RealtimeSocketState.Connected) {
        this.connected = true;
        this.emit('_rpc_connected');
      }
    });
  }

  private emit(event: string, data?: any) {
    const handlers = this._handlers.get(event);
    if (handlers) {
      handlers.map((h) => h(event, data));
    }
  }

  private _preprocess = (data: any) => {
    if (data instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => {
        const compressed = new Uint8Array(reader.result as ArrayBuffer);
        const decompressed = pako.inflate(compressed);
        const msg = this._msgDecoder.decode(decompressed);
        this._process(msg);
      };
      reader.readAsArrayBuffer(data);
    } else if (data instanceof ArrayBuffer) {
      const decompressed = pako.inflate(data);
      const msg = this._msgDecoder.decode(decompressed);
      this._process(msg);
    } else {
      this._process(data);
    }
  };

  private _handleEvent = (event: string, data: any) => {
    const handlers = this._handlers.get(event);
    if (handlers) {
      handlers.map((h) => h(event, data));
    }
  };

  private _handleAnswer = (reqId: number, success: boolean, data: any) => {
    const req = this._reqs.get(reqId);
    if (req) {
      if (success === true) {
        req.resolve({
          status: true,
          data,
        });
      } else {
        req.resolve({
          status: false,
          error: data,
        });
      }
      this._reqs.delete(reqId);
    } else {
      this.logger.log('RPC :: unknown req_id:', reqId);
    }
  };

  private _process = (msg: string) => {
    this.logger.log('datachannel on message:', msg);
    const json: RpcMessage = JSON.parse(msg);

    const type = json.type;
    switch (type) {
      case 'event':
        this._handleEvent(json.event!, json.data);
        break;
      case 'answer':
        this._handleAnswer(json.req_id!, json.success!, json.data);
        break;
      case 'request':
        this._socket.send(
          JSON.stringify({
            type: 'answer',
            status: false,
            error: 'NOT_SUPPORT',
          }),
        );
        break;
      default:
        this.logger.log('RPC :: unknown message type:', type);
        break;
    }
  };

  request<T>(cmd: keyof RpcRequests, data: RpcRequests[typeof cmd], timeout?: number): Promise<RpcResponse<T>> {
    this.logger.info('request:', cmd, data);
    return new Promise((resolve, reject) => {
      const req = new RpcRequest(this._reqSeed++, cmd, data, resolve, reject);
      this._reqs.set(req.reqId, req);
      this._socket.send(JSON.stringify(req.toJson()));

      if (timeout) {
        setTimeout(() => {
          if (this._reqs.has(req.reqId)) {
            this._reqs.delete(req.reqId);
            reject('Timed out');
          }
        }, timeout);
      }
    });
  }

  on(cmd: string, handler: (event: string, data: any) => void): void {
    this._handlers.set(cmd, [...(this._handlers.get(cmd) || []), handler]);
  }

  off(cmd: string, handler: AnyFunction): void {
    this._handlers.set(
      cmd,
      (this._handlers.get(cmd) || []).filter((h) => h !== handler),
    );
  }

  offAllListeners(cmd: string): void {
    this._handlers.delete(cmd);
  }
}
