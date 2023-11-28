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

[src/lib/interfaces/sender.ts:40](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/sender.ts#L40)

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

[src/lib/interfaces/sender.ts:39](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/sender.ts#L39)
