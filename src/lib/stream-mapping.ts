import type { StreamRemote } from './remote';

export class StreamMapping {
  peers: Map<string, StreamRemote> = new Map();

  constructor() {}

  add(peerHash: string, name: string, stream: StreamRemote) {
    this.peers.set(`${peerHash}/${name}`, stream);
  }

  remove(peerHash: string, name: string) {
    this.peers.delete(`${peerHash}/${name}`);
  }

  get(peerHash: string, name: string) {
    return this.peers.get(`${peerHash}/${name}`);
  }
}
