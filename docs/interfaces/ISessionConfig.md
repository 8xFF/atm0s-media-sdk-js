[Atm0s JS SDK](../README.md) / ISessionConfig

# Interface: ISessionConfig

Represents the configuration for a session.

## Table of contents

### Properties

- [bitrateControlMode](ISessionConfig.md#bitratecontrolmode)
- [codecs](ISessionConfig.md#codecs)
- [iceServers](ISessionConfig.md#iceservers)
- [latencyMode](ISessionConfig.md#latencymode)
- [mixMinusAudio](ISessionConfig.md#mixminusaudio)
- [peerId](ISessionConfig.md#peerid)
- [receivers](ISessionConfig.md#receivers)
- [roomId](ISessionConfig.md#roomid)
- [senders](ISessionConfig.md#senders)
- [token](ISessionConfig.md#token)

## Properties

### bitrateControlMode

• `Optional` **bitrateControlMode**: [`BitrateControlMode`](../enums/BitrateControlMode.md)

Optional bitrate control mode for the session.

#### Defined in

[src/lib/interfaces/session.ts:113](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L113)

___

### codecs

• `Optional` **codecs**: [`Codecs`](../enums/Codecs.md)[]

Optional codecs for the session.

#### Defined in

[src/lib/interfaces/session.ts:108](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L108)

___

### iceServers

• `Optional` **iceServers**: [{ `credential?`: `string` ; `urls`: `string` ; `username?`: `string`  }]

Optional ICE servers for the session.

#### Defined in

[src/lib/interfaces/session.ts:103](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L103)

___

### latencyMode

• `Optional` **latencyMode**: `LatencyMode`

Optional latency mode for the session.

#### Defined in

[src/lib/interfaces/session.ts:98](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L98)

___

### mixMinusAudio

• `Optional` **mixMinusAudio**: `Object`

Optional configuration for mix-minus audio.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `elements?` | [`HTMLAudioElement`, `HTMLAudioElement`, `HTMLAudioElement`] | The elements for mix-minus audio. |
| `mode` | [`MixMinusMode`](../enums/MixMinusMode.md) | The mode for mix-minus audio. |

#### Defined in

[src/lib/interfaces/session.ts:84](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L84)

___

### peerId

• **peerId**: `string`

The ID of the peer.

**`Example`**

```ts
'peer1'
```

**`Example`**

```ts
'peer2'
```

#### Defined in

[src/lib/interfaces/session.ts:62](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L62)

___

### receivers

• **receivers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `audio` | `number` |
| `video` | `number` |

#### Defined in

[src/lib/interfaces/session.ts:76](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L76)

___

### roomId

• **roomId**: `string`

The ID of the room.

**`Example`**

```ts
'room1'
```

**`Example`**

```ts
'room2'
```

#### Defined in

[src/lib/interfaces/session.ts:55](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L55)

___

### senders

• **senders**: [`SenderConfig`](../README.md#senderconfig)[]

Initialized Senders for the session.

**`Example`**

```ts
[{ name: 'video_camera', kind: 'audio', stream: stream1 }, { name: 'screen', kind: 'video', stream: stream2, screen: true }}]
```

#### Defined in

[src/lib/interfaces/session.ts:75](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L75)

___

### token

• **token**: `string`

The token for the session.
Can be retrieved from the media server.

#### Defined in

[src/lib/interfaces/session.ts:68](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L68)
