/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IRealtimeSocket } from '../interfaces';
import { MockRTSocket } from '../utils/mocks';
import { RPC, RpcRequest } from './rpc';

describe('RpcRequest', () => {
  test('should create an instance of RpcRequest', () => {
    const reqId = 1;
    const method = 'getUser';
    const params = { id: 1 };
    const resolve = jest.fn();
    const reject = jest.fn();

    const rpcRequest = new RpcRequest(reqId, method, params, resolve, reject);

    expect(rpcRequest).toBeInstanceOf(RpcRequest);
    expect(rpcRequest.reqId).toBe(reqId);
    expect(rpcRequest.createdAt).toBeInstanceOf(Date);
    expect(rpcRequest['method']).toBe(method);
    expect(rpcRequest['params']).toBe(params);
    expect(rpcRequest.resolve).toBe(resolve);
    expect(rpcRequest.reject).toBe(reject);
  });

  test('should convert RpcRequest to JSON', () => {
    const reqId = 1;
    const method = 'getUser';
    const params = { id: 1 };
    const resolve = jest.fn();
    const reject = jest.fn();

    const rpcRequest = new RpcRequest(reqId, method, params, resolve, reject);

    const expectedJson = {
      req_id: reqId,
      type: 'request',
      request: method,
      data: params,
    };

    expect(rpcRequest.toJson()).toEqual(expectedJson);
  });
});

describe('RPC', () => {
  let rpc: RPC;
  let socketMock: IRealtimeSocket;

  beforeEach(() => {
    // Mock the socket object
    socketMock = new MockRTSocket();
    rpc = new RPC(socketMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize correctly', () => {
    expect(rpc.connected).toBe(false);
    expect(rpc['_handlers']).toBeInstanceOf(Map);
    expect(rpc['_reqs']).toBeInstanceOf(Map);
  });

  it('should handle event', () => {
    const event = 'testEvent';
    const data = { foo: 'bar' };

    const handler1 = jest.fn();
    const handler2 = jest.fn();

    rpc.on(event, handler1);
    rpc.on(event, handler2);

    rpc['_handleEvent'](event, data);

    expect(handler1).toHaveBeenCalledWith(event, data);
    expect(handler2).toHaveBeenCalledWith(event, data);
  });

  it('should handle answer with success', () => {
    const reqId = 1;
    const success = true;
    const data = { foo: 'bar' };

    const resolveMock = jest.fn();
    const reqMock = {
      resolve: resolveMock,
    } as unknown as RpcRequest;

    rpc['_reqs'].set(reqId, reqMock);

    rpc['_handleAnswer'](reqId, success, data);

    expect(resolveMock).toHaveBeenCalledWith({
      status: true,
      data,
    });
    expect(rpc['_reqs'].size).toBe(0);
  });

  it('should handle answer with failure', () => {
    const reqId = 1;
    const success = false;
    const error = 'Some error message';

    const resolveMock = jest.fn();
    const reqMock = {
      resolve: resolveMock,
    } as unknown as RpcRequest;

    rpc['_reqs'].set(reqId, reqMock);

    rpc['_handleAnswer'](reqId, success, error);

    expect(resolveMock).toHaveBeenCalledWith({
      status: false,
      error,
    });
    expect(rpc['_reqs'].size).toBe(0);
  });

  it('should handle unknown request', () => {
    const reqId = 1;

    const loggerMock = jest.spyOn(console, 'log').mockImplementation();

    rpc['_handleAnswer'](reqId, true, {});

    expect(loggerMock).toHaveBeenCalledWith(expect.anything(), 'RPC :: unknown req_id:', reqId);

    loggerMock.mockRestore();
  });

  it('should process event message', () => {
    const event = 'testEvent';
    const data = { foo: 'bar' };
    const msg = JSON.stringify({
      type: 'event',
      event,
      data,
    });

    const handleEventMock = jest.spyOn(rpc as any, '_handleEvent');

    rpc['_process'](msg);

    expect(handleEventMock).toHaveBeenCalledWith(event, data);

    handleEventMock.mockRestore();
  });

  it('should process answer message with success', () => {
    const reqId = 1;
    const success = true;
    const data = { foo: 'bar' };
    const msg = JSON.stringify({
      type: 'answer',
      req_id: reqId,
      success,
      data,
    });

    const handleAnswerMock = jest.spyOn(rpc as any, '_handleAnswer');

    rpc['_process'](msg);

    expect(handleAnswerMock).toHaveBeenCalledWith(reqId, success, data);

    handleAnswerMock.mockRestore();
  });

  it('should process answer message with failure', () => {
    const reqId = 1;
    const success = false;
    const error = 'Some error message';
    const msg = JSON.stringify({
      type: 'answer',
      req_id: reqId,
      success,
      data: error,
    });

    const handleAnswerMock = jest.spyOn(rpc as any, '_handleAnswer');

    rpc['_process'](msg);

    expect(handleAnswerMock).toHaveBeenCalledWith(reqId, success, error);

    handleAnswerMock.mockRestore();
  });

  it('should process unknown message type', () => {
    const type = 'unknown';
    const msg = JSON.stringify({
      type,
    });

    const loggerMock = jest.spyOn(console, 'log').mockImplementation();

    rpc['_process'](msg);

    expect(loggerMock).toHaveBeenCalledWith(expect.anything(), 'RPC :: unknown message type:', type);

    loggerMock.mockRestore();
  });

  it('should send answer for request message', () => {
    const msg = JSON.stringify({
      type: 'request',
    });

    const sendMock = jest.spyOn(rpc['_socket'], 'send');

    rpc['_process'](msg);

    expect(sendMock).toHaveBeenCalledWith(
      JSON.stringify({
        type: 'answer',
        status: false,
        error: 'NOT_SUPPORT',
      }),
    );

    sendMock.mockRestore();
  });

  it('should send request', async () => {
    const cmd: any = 'testCommand';
    const data: any = { foo: 'bar' };

    const request = new RpcRequest(0, cmd, data, jest.fn(), jest.fn());

    const result = rpc.request(cmd, data);

    expect(result).toBeInstanceOf(Promise);
    expect(socketMock.send).toHaveBeenCalledWith(JSON.stringify(request.toJson()));
  });

  it('should add event handler', () => {
    const cmd = 'testCommand';
    const handler = jest.fn();

    rpc.on(cmd, handler);

    expect(rpc['_handlers'].get(cmd)).toContain(handler);
  });

  it('should remove event handler', () => {
    const cmd = 'testCommand';
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    rpc['_handlers'].set(cmd, [handler1, handler2]);

    rpc.off(cmd, handler1);

    expect(rpc['_handlers'].get(cmd)).toEqual([handler2]);
  });

  it('should remove all event listeners', () => {
    const cmd = 'testCommand';

    rpc['_handlers'].set(cmd, [jest.fn(), jest.fn()]);

    rpc.offAllListeners(cmd);

    expect(rpc['_handlers'].has(cmd)).toBe(false);
  });
});
