import type { AnyFunction } from '../utils/types';

/**
 * Represents an interface for a RPC (Remote Procedure Call) Handler.
 */
export interface IRPC {
  /**
   * Sends an RPC request with the specified command and data.
   * @param cmd The command to be executed.
   * @param data The data to be sent with the request.
   * @returns A promise that resolves to the response from the RPC server.
   */
  request<DataType, ResponseType>(
    cmd: string,
    data: DataType,
  ): Promise<ResponseType>;

  /**
   * Registers an event handler for the specified command.
   * @param cmd The command to listen for.
   * @param handler The event handler function.
   */
  on(cmd: string, handler: AnyFunction): void;

  /**
   * Unregisters the event handler for the specified command.
   * @param cmd The command to stop listening for.
   */
  off(cmd: string): void;
}
