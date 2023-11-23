[Atm0s JS SDK](../README.md) / IStreamReceiverCallbacks

# Interface: IStreamReceiverCallbacks

## Table of contents

### Properties

- [audio\_level](IStreamReceiverCallbacks.md#audio_level)
- [state](IStreamReceiverCallbacks.md#state)

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

[src/lib/interfaces/receiver.ts:56](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/receiver.ts#L56)

___

### state

• **state**: (`state`: [`StreamReceiverState`](../enums/StreamReceiverState.md)) => `void`

#### Type declaration

▸ (`state`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`StreamReceiverState`](../enums/StreamReceiverState.md) |

##### Returns

`void`

#### Defined in

[src/lib/interfaces/receiver.ts:55](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/receiver.ts#L55)
