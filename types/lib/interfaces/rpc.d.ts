import type { AnyFunction } from '../utils/types';
export interface IRPC {
    request<DataType, ResponseType>(cmd: string, data: DataType): Promise<ResponseType>;
    on(cmd: string, handler: AnyFunction): void;
    off(cmd: string): void;
}
//# sourceMappingURL=rpc.d.ts.map