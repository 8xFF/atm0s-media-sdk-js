/* eslint-disable @typescript-eslint/no-explicit-any */
import pako from 'pako';
import { RealtimeSocketState, type IRealtimeSocket } from './socket';
import _debug from 'debug';
import type { AnyFunction } from '../utils/types';

export interface IRPC {
  request<DataType, ResponseType>(
    cmd: string,
    data: DataType,
  ): Promise<ResponseType>;
  // event<T>(cmd: string, data: T): void;

  on(cmd: string, handler: AnyFunction): void;
  off(cmd: string): void;
}

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
  private _log = _debug('atm0s:rpc');
  private _handlers: Map<string, AnyFunction> = new Map();
  private _reqs: Map<number, RpcRequest> = new Map();

  connected = false;

  constructor(private _socket: IRealtimeSocket) {
    this._socket.on('message', this._prereceiveMessage);
    this._socket.on('dc_state', (state) => {
      if (state === RealtimeSocketState.Connected) {
        this.connected = true;
      }
    });
  }

  private _prereceiveMessage = (data: any) => {
    if (data instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => {
        const compressed = new Uint8Array(reader.result as ArrayBuffer);
        const decompressed = pako.inflate(compressed);
        const msg = this._msgDecoder.decode(decompressed);
        this._onReceiveMessage(msg);
      };
      reader.readAsArrayBuffer(data);
    } else if (data instanceof ArrayBuffer) {
      const decompressed = pako.inflate(data);
      const msg = this._msgDecoder.decode(decompressed);
      this._log('decompress', data.byteLength, msg, msg.length);
      this._onReceiveMessage(msg);
    } else {
      this._onReceiveMessage(data);
    }
  };

  private _onReceiveMessage = (msg: string) => {
    this._log('datachannel on message:', msg);
    const json = JSON.parse(msg);

    const type = json.type;
    if (type === 'event') {
      const handler = this._handlers.get(json.event);
      if (handler) {
        handler(json.event, json.data);
      }
    } else if (type === 'request') {
      this._socket.send(
        JSON.stringify({
          type: 'answer',
          status: false,
          error: 'NOT_SUPPORT',
        }),
      );
    } else if (type === 'answer') {
      const req = this._reqs.get(json.req_id);
      if (req) {
        if (json.success === true) {
          req.resolve({
            status: true,
            data: json.data,
          });
        } else {
          req.resolve({
            status: false,
            error: json.error,
          });
        }
      } else {
        this._log;
      }
    }
  };

  request(cmd: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = new RpcRequest(this._reqSeed++, cmd, data, resolve, reject);
      this._reqs.set(req.reqId, req);
      this._socket.send(JSON.stringify(req.toJson()));
    });
  }

  // event(cmd: string, data: any): void {
  //   const event = {
  //     req_id: this.reqId,
  //     type: 'request',
  //     request: this.method,
  //     data: this.params,
  //   };
  // }

  on(cmd: string, handler: (data: any) => void): void {
    this._handlers.set(cmd, handler);
  }

  off(cmd: string): void {
    this._handlers.delete(cmd);
  }
}
