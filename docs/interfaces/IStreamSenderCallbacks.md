[Atm0s JS SDK](../README.md) / IStreamSenderCallbacks

# Interface: IStreamSenderCallbacks

## Table of contents

### Properties

- [audio\_level](IStreamSenderCallbacks.md#audio_level)
- [state](IStreamSenderCallbacks.md#state)

## Properties

### audio\_level

• **audio\_level**: (`level`: `number`) => `void`

#### Type declaration

▸ (`level`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `number` |

##### Returns

`void`

#### Defined in

[lib/interfaces/sender.ts:37](https://github.com/8xFF/media-sdk-js/blob/d289714/src/lib/interfaces/sender.ts#L37)

___

### state

• **state**: (`state`: [`StreamSenderState`](../enums/StreamSenderState.md)) => `void`

#### Type declaration

▸ (`state`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`StreamSenderState`](../enums/StreamSenderState.md) |

##### Returns

`void`

#### Defined in

[lib/interfaces/sender.ts:36](https://github.com/8xFF/media-sdk-js/blob/d289714/src/lib/interfaces/sender.ts#L36)
