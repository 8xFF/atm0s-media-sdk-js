import { MediaGatewayConnector } from './lib/core/gateway';
import { RealtimeSocket } from './lib/core/socket';
import { Session } from './lib/session';
import { RPC } from './lib/core/rpc';
import type { ISessionConfig } from './lib/interfaces/session';
export declare function createSession(urls: string | string[], cfg: ISessionConfig): Session;
export { RealtimeSocket, MediaGatewayConnector, RPC };
//# sourceMappingURL=index.d.ts.map