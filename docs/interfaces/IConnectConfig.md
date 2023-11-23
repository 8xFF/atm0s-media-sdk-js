[Atm0s JS SDK](../README.md) / IConnectConfig

# Interface: IConnectConfig

## Table of contents

### Properties

- [codecs](IConnectConfig.md#codecs)
- [mix\_minus\_audio](IConnectConfig.md#mix_minus_audio)
- [peer](IConnectConfig.md#peer)
- [receivers](IConnectConfig.md#receivers)
- [room](IConnectConfig.md#room)
- [sdp](IConnectConfig.md#sdp)
- [senders](IConnectConfig.md#senders)
- [token](IConnectConfig.md#token)

## Properties

### codecs

• `Optional` **codecs**: `string`[]

#### Defined in

[src/lib/interfaces/gateway.ts:7](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/gateway.ts#L7)

___

### mix\_minus\_audio

• `Optional` **mix\_minus\_audio**: `string`

#### Defined in

[src/lib/interfaces/gateway.ts:6](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/gateway.ts#L6)

___

### peer

• **peer**: `string`

#### Defined in

[src/lib/interfaces/gateway.ts:3](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/gateway.ts#L3)

___

### receivers

• **receivers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `audio` | `number` |
| `video` | `number` |

#### Defined in

[src/lib/interfaces/gateway.ts:17](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/gateway.ts#L17)

___

### room

• **room**: `string`

#### Defined in

[src/lib/interfaces/gateway.ts:2](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/gateway.ts#L2)

___

### sdp

• **sdp**: `string`

#### Defined in

[src/lib/interfaces/gateway.ts:5](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/gateway.ts#L5)

___

### senders

• **senders**: { `content_hint?`: `string` ; `kind`: `string` ; `label`: `string` ; `max_bitrate?`: `number` ; `screen?`: `boolean` ; `simulcast?`: `boolean` ; `uuid`: `string`  }[]

#### Defined in

[src/lib/interfaces/gateway.ts:8](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/gateway.ts#L8)

___

### token

• **token**: `string`

#### Defined in

[src/lib/interfaces/gateway.ts:4](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/gateway.ts#L4)
