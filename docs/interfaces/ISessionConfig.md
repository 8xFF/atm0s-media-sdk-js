[Atm0s JS SDK](../README.md) / ISessionConfig

# Interface: ISessionConfig

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

#### Defined in

[lib/interfaces/session.ts:63](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/session.ts#L63)

___

### codecs

• `Optional` **codecs**: [`Codecs`](../enums/Codecs.md)[]

#### Defined in

[lib/interfaces/session.ts:62](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/session.ts#L62)

___

### iceServers

• `Optional` **iceServers**: [{ `credential?`: `string` ; `urls`: `string` ; `username?`: `string`  }]

#### Defined in

[lib/interfaces/session.ts:61](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/session.ts#L61)

___

### latencyMode

• `Optional` **latencyMode**: `LatencyMode`

#### Defined in

[lib/interfaces/session.ts:60](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/session.ts#L60)

___

### mixMinusAudio

• `Optional` **mixMinusAudio**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `elements?` | [`HTMLAudioElement`, `HTMLAudioElement`, `HTMLAudioElement`] |
| `mode` | [`MixMinusMode`](../enums/MixMinusMode.md) |

#### Defined in

[lib/interfaces/session.ts:56](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/session.ts#L56)

___

### peerId

• **peerId**: `string`

#### Defined in

[lib/interfaces/session.ts:48](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/session.ts#L48)

___

### receivers

• **receivers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `audio` | `number` |
| `video` | `number` |

#### Defined in

[lib/interfaces/session.ts:51](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/session.ts#L51)

___

### roomId

• **roomId**: `string`

#### Defined in

[lib/interfaces/session.ts:47](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/session.ts#L47)

___

### senders

• **senders**: [`SenderConfig`](../README.md#senderconfig)[]

#### Defined in

[lib/interfaces/session.ts:50](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/session.ts#L50)

___

### token

• **token**: `string`

#### Defined in

[lib/interfaces/session.ts:49](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/session.ts#L49)
