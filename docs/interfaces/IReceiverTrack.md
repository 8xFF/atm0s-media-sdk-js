[Atm0s JS SDK](../README.md) / IReceiverTrack

# Interface: IReceiverTrack

## Hierarchy

- `TypedEventEmitter`<[`IReceiverTrackCallbacks`](IReceiverTrackCallbacks.md)\>

  ↳ **`IReceiverTrack`**

## Table of contents

### Properties

- [hasTrack](IReceiverTrack.md#hastrack)
- [info](IReceiverTrack.md#info)
- [stream](IReceiverTrack.md#stream)
- [trackId](IReceiverTrack.md#trackid)
- [transceiver](IReceiverTrack.md#transceiver)
- [uuid](IReceiverTrack.md#uuid)

### Methods

- [addTrack](IReceiverTrack.md#addtrack)
- [emit](IReceiverTrack.md#emit)
- [getTrack](IReceiverTrack.md#gettrack)
- [listenerCount](IReceiverTrack.md#listenercount)
- [listeners](IReceiverTrack.md#listeners)
- [off](IReceiverTrack.md#off)
- [offAllListeners](IReceiverTrack.md#offalllisteners)
- [on](IReceiverTrack.md#on)
- [onMany](IReceiverTrack.md#onmany)
- [pause](IReceiverTrack.md#pause)
- [removeAllListeners](IReceiverTrack.md#removealllisteners)
- [removeListener](IReceiverTrack.md#removelistener)
- [stop](IReceiverTrack.md#stop)

## Properties

### hasTrack

• **hasTrack**: `boolean`

#### Defined in

[src/lib/interfaces/tracks.ts:30](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L30)

___

### info

• **info**: [`ReceiverInfo`](../README.md#receiverinfo)

#### Defined in

[src/lib/interfaces/tracks.ts:28](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L28)

___

### stream

• **stream**: `MediaStream`

#### Defined in

[src/lib/interfaces/tracks.ts:31](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L31)

___

### trackId

• **trackId**: `undefined` \| `string`

#### Defined in

[src/lib/interfaces/tracks.ts:32](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L32)

___

### transceiver

• `Optional` **transceiver**: `RTCRtpTransceiver`

#### Defined in

[src/lib/interfaces/tracks.ts:29](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L29)

___

### uuid

• **uuid**: `string`

#### Defined in

[src/lib/interfaces/tracks.ts:27](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L27)

## Methods

### addTrack

▸ **addTrack**(`track`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `track` | `MediaStreamTrack` |

#### Returns

`void`

#### Defined in

[src/lib/interfaces/tracks.ts:34](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L34)

___

### emit

▸ **emit**(`event`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"track_added"`` |
| `...args` | [track: MediaStreamTrack] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.emit

#### Defined in

[src/lib/utils/typed-event-emitter.ts:11](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L11)

___

### getTrack

▸ **getTrack**(): `undefined` \| ``null`` \| `MediaStreamTrack`

#### Returns

`undefined` \| ``null`` \| `MediaStreamTrack`

#### Defined in

[src/lib/interfaces/tracks.ts:33](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L33)

___

### listenerCount

▸ **listenerCount**<`TEvent`\>(`event`): `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends ``"track_added"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |

#### Returns

`number`

#### Inherited from

TypedEventEmitter.listenerCount

#### Defined in

[src/lib/utils/typed-event-emitter.ts:58](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L58)

___

### listeners

▸ **listeners**<`TEvent`\>(`eventName`): `undefined` \| [`IReceiverTrackCallbacks`](IReceiverTrackCallbacks.md)[`TEvent`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends ``"track_added"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `TEvent` |

#### Returns

`undefined` \| [`IReceiverTrackCallbacks`](IReceiverTrackCallbacks.md)[`TEvent`][]

#### Inherited from

TypedEventEmitter.listeners

#### Defined in

[src/lib/utils/typed-event-emitter.ts:52](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L52)

___

### off

▸ **off**<`TEvent`\>(`event`, `cb`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends ``"track_added"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IReceiverTrackCallbacks`](IReceiverTrackCallbacks.md)[`TEvent`] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.off

#### Defined in

[src/lib/utils/typed-event-emitter.ts:40](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L40)

___

### offAllListeners

▸ **offAllListeners**(): `void`

#### Returns

`void`

#### Inherited from

TypedEventEmitter.offAllListeners

#### Defined in

[src/lib/utils/typed-event-emitter.ts:44](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L44)

___

### on

▸ **on**<`TEvent`\>(`event`, `cb`): () => `any`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends ``"track_added"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IReceiverTrackCallbacks`](IReceiverTrackCallbacks.md)[`TEvent`] |

#### Returns

`fn`

▸ (): `any`

##### Returns

`any`

#### Inherited from

TypedEventEmitter.on

#### Defined in

[src/lib/utils/typed-event-emitter.ts:17](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L17)

___

### onMany

▸ **onMany**<`TEvent`\>(`events`, `cb`): () => `any`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends ``"track_added"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | `TEvent`[] |
| `cb` | [`IReceiverTrackCallbacks`](IReceiverTrackCallbacks.md)[`TEvent`] |

#### Returns

() => `any`[]

#### Inherited from

TypedEventEmitter.onMany

#### Defined in

[src/lib/utils/typed-event-emitter.ts:26](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L26)

___

### pause

▸ **pause**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/interfaces/tracks.ts:36](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L36)

___

### removeAllListeners

▸ **removeAllListeners**(): `void`

#### Returns

`void`

#### Inherited from

TypedEventEmitter.removeAllListeners

#### Defined in

[src/lib/utils/typed-event-emitter.ts:48](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L48)

___

### removeListener

▸ **removeListener**<`TEvent`\>(`event`, `cb`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends ``"track_added"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IReceiverTrackCallbacks`](IReceiverTrackCallbacks.md)[`TEvent`] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.removeListener

#### Defined in

[src/lib/utils/typed-event-emitter.ts:33](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L33)

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/interfaces/tracks.ts:35](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L35)
