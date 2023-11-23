import { MediaGatewayConnector } from './lib/core/gateway';
import { RealtimeSocket } from './lib/core/socket';
import { Session } from './lib/session';
import { RPC } from './lib/core/rpc';
import { StreamSender } from './lib/sender';
import { StreamReceiver } from './lib/receiver';
import { StreamConsumer } from './lib/consumer';
import { StreamPublisher } from './lib/publisher';
import { StreamRemote } from './lib/remote';

import type { ISessionConfig } from './lib/interfaces/session';

export function createSession(urls: string | string[], cfg: ISessionConfig) {
  const socket = new RealtimeSocket(urls);
  const gateway = new MediaGatewayConnector();
  return new Session(cfg, socket, gateway);
}

export {
  RealtimeSocket,
  MediaGatewayConnector,
  RPC,
  Session,
  StreamSender,
  StreamReceiver,
  StreamPublisher,
  StreamConsumer,
  StreamRemote,
};

export * from './lib/interfaces';
export * from './lib/utils/types';
