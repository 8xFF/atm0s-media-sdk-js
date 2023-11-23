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
