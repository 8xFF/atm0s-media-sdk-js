import type { StreamRemote } from './remote';
export declare class StreamMapping {
    peers: Map<string, StreamRemote>;
    constructor();
    add(peer_hash: string, name: string, stream: StreamRemote): void;
    remove(peer_hash: string, name: string): void;
    get(peer_hash: string, name: string): StreamRemote | undefined;
}
//# sourceMappingURL=stream-mapping.d.ts.map