import { MediaGatewayConnector } from './lib/core/gateway';
import { RealtimeSocket } from './lib/core/socket';
import { Session } from './lib/session';
import { RPC } from './lib/core/rpc';
import type { ISessionConfig } from './lib/interfaces/session';

export function createSession(urls: string | string[], cfg: ISessionConfig) {
  const socket = new RealtimeSocket(urls);
  const gateway = new MediaGatewayConnector();
  return new Session(cfg, socket, gateway);
}

export { RealtimeSocket, MediaGatewayConnector, RPC };
