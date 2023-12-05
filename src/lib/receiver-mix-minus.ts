import type { IRPC, IStreamReceiver } from './interfaces';
import { StreamRemote } from './remote';
import type { Session } from './session';
import EventEmitter from './utils/simple-event-emiiter';
import { StreamKinds, type RemoteStreamQuality } from './utils/types';

export interface MixMinusRemoteStreamQuality extends RemoteStreamQuality {
  slot: number;
}

export interface ReceiverMixMinusAudioState {
  active: ([string, number] | null)[];
  sources: { [peerId: string]: number };
}

export class ReceiverMixMinusAudio extends EventEmitter {
  receivers: IStreamReceiver[] = [];
  elements: (HTMLAudioElement | null)[] = [];
  sources = new Map<string, { peerId: string; streamName: string }>();
  _state: ReceiverMixMinusAudioState = { active: [], sources: {} };

  constructor(
    private id: string,
    private _session: Session,
    private _rpc: IRPC,
    elements?: [HTMLAudioElement, HTMLAudioElement, HTMLAudioElement],
  ) {
    super();
    if (!elements) {
      this.elements = [this.createElement(), this.createElement(), this.createElement()];
    } else {
      this.elements = elements;
    }
  }

  public get state() {
    return this._state;
  }

  createElement() {
    if (typeof document != 'undefined' && document.createElement && document.body) {
      const element = document.createElement('audio');
      element.hidden = true;
      element.autoplay = true;
      element.controls = false;
      document.body.appendChild(element);
      return element;
    }
    return null;
  }

  releaseElements() {
    this.elements.map((element) => {
      if (typeof document != 'undefined' && document.body && element) {
        document.body.removeChild(element);
      }
    });
  }

  async connect() {
    for (let i = 0; i < 3; i++) {
      const receiver = this._session.takeReceiver(StreamKinds.AUDIO);
      receiver.on('quality', (quality) => {
        quality.slot = i;
        this.emit('quality', quality);
      });
      this.elements[i]!.srcObject = receiver.stream;
      this.receivers.push(receiver);
      this.receivers[i]!.switch(new StreamRemote(StreamKinds.AUDIO, '', '', 'mix_minus_' + this.id + '_' + i));
    }
    ///for each sources and call addSource for restore
    this.sources.forEach((value: { peerId: string; streamName: string }) => {
      this.addSourceManual(value.peerId, value.streamName);
    });

    this._rpc.on(`mix_minus_${this.id}_state`, (_, state: ReceiverMixMinusAudioState) => {
      for (let i = 0; i < 3; i++) {
        if (this.state.active[i] != state.active[i]) {
          this.emit('slot_' + i, state.active[i]);
        }
      }
      for (const fullSourceId in state.sources) {
        if (state.sources[fullSourceId] != this.state.sources[fullSourceId]) {
          this.emit('source_' + fullSourceId, state.sources[fullSourceId]);
        }
      }
      for (const fullSourceid in this.state.sources) {
        if (!state.sources[fullSourceid]) {
          this.emit('source_' + fullSourceid, null);
        }
      }
      this._state = state;
    });
  }

  play() {
    this.elements.map((element) => {
      element?.play();
    });
  }

  async addSource(remote: StreamRemote) {
    return this.addSourceManual(remote.peerId, remote.name);
  }

  async removeSource(remote: StreamRemote) {
    return this.removeSourceManual(remote.peerId, remote.name);
  }

  async addSourceManual(peerId: string, stream_name: string) {
    this.sources.set(`${peerId}-${stream_name}`, { peerId, streamName: stream_name });
    if (this._rpc && this._rpc.connected) {
      await this._rpc.request('mix_minus.add', { id: this.id, remote: { peer: peerId, stream: stream_name } });
    }
  }

  async removeSourceManual(peerId: string, stream_name: string) {
    this.sources.delete(`${peerId}-${stream_name}`);
    if (this._rpc && this._rpc.connected) {
      await this._rpc.request('mix_minus.remove', {
        id: this.id,
        remote: { peer: peerId, stream: stream_name },
      });
    }
  }
}
