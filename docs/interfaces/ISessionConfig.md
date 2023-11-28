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

[src/lib/interfaces/session.ts:131](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/session.ts#L131)

___

### codecs

• `Optional` **codecs**: [`Codecs`](../enums/Codecs.md)[]

Optional codecs for the session.

#### Defined in

[src/lib/interfaces/session.ts:126](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/session.ts#L126)

___

### iceServers

• `Optional` **iceServers**: [{ `credential?`: `string` ; `urls`: `string` ; `username?`: `string`  }]

Optional ICE servers for the session.

#### Defined in

[src/lib/interfaces/session.ts:121](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/session.ts#L121)

___

### latencyMode

• `Optional` **latencyMode**: [`LatencyMode`](../enums/LatencyMode.md)

Optional latency mode for the session.

#### Defined in

[src/lib/interfaces/session.ts:116](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/session.ts#L116)

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

[src/lib/interfaces/session.ts:102](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/session.ts#L102)

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

[src/lib/interfaces/session.ts:80](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/session.ts#L80)

___

### receivers

• **receivers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `audio` | `number` |
| `video` | `number` |

#### Defined in

[src/lib/interfaces/session.ts:94](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/session.ts#L94)

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

[src/lib/interfaces/session.ts:73](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/session.ts#L73)

___

### senders

• `Optional` **senders**: [`SenderConfig`](../README.md#senderconfig)[]

Initialized Senders for the session.

**`Example`**

```ts
[{ name: 'video_camera', kind: 'audio', stream: stream1 }, { name: 'screen', kind: 'video', stream: stream2, screen: true }}]
```

#### Defined in

[src/lib/interfaces/session.ts:93](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/session.ts#L93)

___

### token

• **token**: `string`

The token for the session.
Can be retrieved from the media server.

#### Defined in

[src/lib/interfaces/session.ts:86](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/session.ts#L86)
