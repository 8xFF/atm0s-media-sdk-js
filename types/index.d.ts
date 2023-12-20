import { HttpGatewayConnector as Atm0s } from './lib/core/gateway';
import { RealtimeSocket } from './lib/core/socket';
import { Session } from './lib/session';
import { RPC } from './lib/core/rpc';
import { StreamSender } from './lib/sender';
import { StreamReceiver } from './lib/receiver';
import { StreamConsumer } from './lib/consumer';
import { StreamPublisher } from './lib/publisher';
import { StreamRemote } from './lib/remote';
import { StreamConsumerPair } from './lib/consumer-pair';
import type { ISessionConfig } from './lib/interfaces/session';
export declare function createSession(urls: string | string[], cfg: ISessionConfig): Session;
export { RealtimeSocket, Atm0s as MediaGatewayConnector, RPC, Session, StreamSender, StreamReceiver, StreamPublisher, StreamConsumer, StreamConsumerPair, StreamRemote, };
export * from './lib/interfaces';
export * from './lib/utils';
//# sourceMappingURL=index.d.ts.map