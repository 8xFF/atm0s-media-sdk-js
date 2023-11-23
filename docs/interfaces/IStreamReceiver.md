[Atm0s JS SDK](../README.md) / IStreamReceiver

# Interface: IStreamReceiver

Represents a stream receiver.

## Hierarchy

- `TypedEventEmitter`<[`IStreamReceiverCallbacks`](IStreamReceiverCallbacks.md)\>

  ↳ **`IStreamReceiver`**

## Implemented by

- [`StreamReceiver`](../classes/StreamReceiver.md)

## Table of contents

### Properties

- [kind](IStreamReceiver.md#kind)
- [state](IStreamReceiver.md#state)
- [stream](IStreamReceiver.md#stream)

### Methods

- [emit](IStreamReceiver.md#emit)
- [limit](IStreamReceiver.md#limit)
- [listenerCount](IStreamReceiver.md#listenercount)
- [listeners](IStreamReceiver.md#listeners)
- [off](IStreamReceiver.md#off)
- [offAllListeners](IStreamReceiver.md#offalllisteners)
- [on](IStreamReceiver.md#on)
- [onMany](IStreamReceiver.md#onmany)
- [removeAllListeners](IStreamReceiver.md#removealllisteners)
- [removeListener](IStreamReceiver.md#removelistener)
- [stop](IStreamReceiver.md#stop)
- [switch](IStreamReceiver.md#switch)

## Properties

### kind

• **kind**: [`StreamKinds`](../enums/StreamKinds.md)

#### Defined in

[src/lib/interfaces/receiver.ts:12](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/receiver.ts#L12)

___

### state

• **state**: [`StreamReceiverState`](../enums/StreamReceiverState.md)

#### Defined in

[src/lib/interfaces/receiver.ts:10](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/receiver.ts#L10)

___

### stream

• **stream**: `MediaStream`

#### Defined in

[src/lib/interfaces/receiver.ts:11](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/receiver.ts#L11)

## Methods

### emit

▸ **emit**(`event`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | keyof [`IStreamReceiverCallbacks`](IStreamReceiverCallbacks.md) |
| `...args` | [state: StreamReceiverState] \| [level: number] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.emit

#### Defined in

[src/lib/utils/typed-event-emitter.ts:11](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L11)

___

### limit

▸ **limit**(`priority`, `max_spatial`, `max_temporal`): `Promise`<`boolean`\>

Limits the stream with the specified priority to the given maximum spatial and temporal values.
`spatial` is a value indicating the definition clarity of the stream.
`temporal` is a value indicating the smoothness, or frame rate of the stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `priority` | `number` | The priority of the stream to limit. |
| `max_spatial` | `number` | The maximum spatial value. |
| `max_temporal` | `number` | The maximum temporal value. |

#### Returns

`Promise`<`boolean`\>

A promise that resolves to a boolean indicating whether the limit was successful.

#### Defined in

[src/lib/interfaces/receiver.ts:32](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/receiver.ts#L32)

___

### listenerCount

▸ **listenerCount**<`TEvent`\>(`event`): `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IStreamReceiverCallbacks`](IStreamReceiverCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |

#### Returns

`number`

#### Inherited from

TypedEventEmitter.listenerCount

#### Defined in

[src/lib/utils/typed-event-emitter.ts:58](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L58)

___

### listeners

▸ **listeners**<`TEvent`\>(`eventName`): `undefined` \| [`IStreamReceiverCallbacks`](IStreamReceiverCallbacks.md)[`TEvent`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IStreamReceiverCallbacks`](IStreamReceiverCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `TEvent` |

#### Returns

`undefined` \| [`IStreamReceiverCallbacks`](IStreamReceiverCallbacks.md)[`TEvent`][]

#### Inherited from

TypedEventEmitter.listeners

#### Defined in

[src/lib/utils/typed-event-emitter.ts:52](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L52)

___

### off

▸ **off**<`TEvent`\>(`event`, `cb`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IStreamReceiverCallbacks`](IStreamReceiverCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamReceiverCallbacks`](IStreamReceiverCallbacks.md)[`TEvent`] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.off

#### Defined in

[src/lib/utils/typed-event-emitter.ts:40](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L40)

___

### offAllListeners

▸ **offAllListeners**(): `void`

#### Returns

`void`

#### Inherited from

TypedEventEmitter.offAllListeners

#### Defined in

[src/lib/utils/typed-event-emitter.ts:44](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L44)

___

### on

▸ **on**<`TEvent`\>(`event`, `cb`): () => `any`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IStreamReceiverCallbacks`](IStreamReceiverCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamReceiverCallbacks`](IStreamReceiverCallbacks.md)[`TEvent`] |

#### Returns

`fn`

▸ (): `any`

##### Returns

`any`

#### Inherited from

TypedEventEmitter.on

#### Defined in

[src/lib/utils/typed-event-emitter.ts:17](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L17)

___

### onMany

▸ **onMany**<`TEvent`\>(`events`, `cb`): () => `any`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IStreamReceiverCallbacks`](IStreamReceiverCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | `TEvent`[] |
| `cb` | [`IStreamReceiverCallbacks`](IStreamReceiverCallbacks.md)[`TEvent`] |

#### Returns

() => `any`[]

#### Inherited from

TypedEventEmitter.onMany

#### Defined in

[src/lib/utils/typed-event-emitter.ts:26](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L26)

___

### removeAllListeners

▸ **removeAllListeners**(): `void`

#### Returns

`void`

#### Inherited from

TypedEventEmitter.removeAllListeners

#### Defined in

[src/lib/utils/typed-event-emitter.ts:48](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L48)

___

### removeListener

▸ **removeListener**<`TEvent`\>(`event`, `cb`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IStreamReceiverCallbacks`](IStreamReceiverCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamReceiverCallbacks`](IStreamReceiverCallbacks.md)[`TEvent`] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.removeListener

#### Defined in

[src/lib/utils/typed-event-emitter.ts:33](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L33)

___

### stop

▸ **stop**(): `Promise`<`boolean`\>

Stops the stream.

#### Returns

`Promise`<`boolean`\>

A promise that resolves to a boolean indicating whether the stop was successful.

#### Defined in

[src/lib/interfaces/receiver.ts:42](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/receiver.ts#L42)

___

### switch

▸ **switch**(`remote`, `priority?`): `Promise`<`boolean`\>

Switches to a remote stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `remote` | [`StreamRemote`](../classes/StreamRemote.md) | The remote stream to switch to. |
| `priority?` | `number` | - |

#### Returns

`Promise`<`boolean`\>

A promise that resolves to a boolean indicating whether the switch was successful.

#### Defined in

[src/lib/interfaces/receiver.ts:20](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/receiver.ts#L20)
