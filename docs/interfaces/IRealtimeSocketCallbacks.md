[Atm0s JS SDK](../README.md) / IRealtimeSocketCallbacks

# Interface: IRealtimeSocketCallbacks

## Table of contents

### Properties

- [dc\_state](IRealtimeSocketCallbacks.md#dc_state)
- [message](IRealtimeSocketCallbacks.md#message)
- [peer\_state](IRealtimeSocketCallbacks.md#peer_state)

## Properties

### dc\_state

• **dc\_state**: (`state`: [`RealtimeSocketState`](../enums/RealtimeSocketState.md)) => `void`

#### Type declaration

▸ (`state`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`RealtimeSocketState`](../enums/RealtimeSocketState.md) |

##### Returns

`void`

#### Defined in

[lib/interfaces/rtsocket.ts:11](https://github.com/8xFF/media-sdk-js/blob/d289714/src/lib/interfaces/rtsocket.ts#L11)

___

### message

• **message**: <T\>(`data`: `T`) => `void`

#### Type declaration

▸ <`T`\>(`data`): `void`

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |

##### Returns

`void`

#### Defined in

[lib/interfaces/rtsocket.ts:9](https://github.com/8xFF/media-sdk-js/blob/d289714/src/lib/interfaces/rtsocket.ts#L9)

___

### peer\_state

• **peer\_state**: (`state`: [`RealtimeSocketState`](../enums/RealtimeSocketState.md)) => `void`

#### Type declaration

▸ (`state`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`RealtimeSocketState`](../enums/RealtimeSocketState.md) |

##### Returns

`void`

#### Defined in

[lib/interfaces/rtsocket.ts:10](https://github.com/8xFF/media-sdk-js/blob/d289714/src/lib/interfaces/rtsocket.ts#L10)
