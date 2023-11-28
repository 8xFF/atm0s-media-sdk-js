[Atm0s JS SDK](../README.md) / StreamReceiver

# Class: StreamReceiver

Represents a stream receiver.

## Hierarchy

- `TypedEventEmitter`<[`IStreamReceiverCallbacks`](../interfaces/IStreamReceiverCallbacks.md)\>

  ↳ **`StreamReceiver`**

## Implements

- [`IStreamReceiver`](../interfaces/IStreamReceiver.md)

## Table of contents

### Constructors

- [constructor](StreamReceiver.md#constructor)

### Properties

- [\_rpc](StreamReceiver.md#_rpc)
- [\_state](StreamReceiver.md#_state)
- [\_track](StreamReceiver.md#_track)
- [hasTrackPromises](StreamReceiver.md#hastrackpromises)
- [logger](StreamReceiver.md#logger)

### Accessors

- [kind](StreamReceiver.md#kind)
- [remoteId](StreamReceiver.md#remoteid)
- [state](StreamReceiver.md#state)
- [stream](StreamReceiver.md#stream)

### Methods

- [\_handleAudioLevelChange](StreamReceiver.md#_handleaudiolevelchange)
- [\_handleOnTrackAdded](StreamReceiver.md#_handleontrackadded)
- [\_handleStateChange](StreamReceiver.md#_handlestatechange)
- [\_setState](StreamReceiver.md#_setstate)
- [emit](StreamReceiver.md#emit)
- [internalReady](StreamReceiver.md#internalready)
- [limit](StreamReceiver.md#limit)
- [listenerCount](StreamReceiver.md#listenercount)
- [listeners](StreamReceiver.md#listeners)
- [off](StreamReceiver.md#off)
- [offAllListeners](StreamReceiver.md#offalllisteners)
- [on](StreamReceiver.md#on)
- [onMany](StreamReceiver.md#onmany)
- [removeAllListeners](StreamReceiver.md#removealllisteners)
- [removeListener](StreamReceiver.md#removelistener)
- [stop](StreamReceiver.md#stop)
- [switch](StreamReceiver.md#switch)

## Constructors

### constructor

• **new StreamReceiver**(`_rpc`, `_track`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_rpc` | [`IRPC`](../interfaces/IRPC.md) |
| `_track` | [`IReceiverTrack`](../interfaces/IReceiverTrack.md) |

#### Overrides

TypedEventEmitter&lt;IStreamReceiverCallbacks\&gt;.constructor

#### Defined in

[src/lib/receiver.ts:37](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L37)

## Properties

### \_rpc

• `Private` **\_rpc**: [`IRPC`](../interfaces/IRPC.md)

#### Defined in

[src/lib/receiver.ts:38](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L38)

___

### \_state

• `Private` **\_state**: [`StreamReceiverState`](../enums/StreamReceiverState.md) = `StreamReceiverState.NoSource`

#### Defined in

[src/lib/receiver.ts:18](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L18)

___

### \_track

• `Private` **\_track**: [`IReceiverTrack`](../interfaces/IReceiverTrack.md)

#### Defined in

[src/lib/receiver.ts:39](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L39)

___

### hasTrackPromises

• **hasTrackPromises**: [`AnyFunction`](../README.md#anyfunction)[] = `[]`

#### Defined in

[src/lib/receiver.ts:17](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L17)

___

### logger

• `Private` **logger**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug` | (...`args`: `any`[]) => `void` |
| `error` | (...`args`: `any`[]) => `void` |
| `info` | (...`args`: `any`[]) => `void` |
| `log` | (...`args`: `any`[]) => `void` |
| `warn` | (...`args`: `any`[]) => `void` |

#### Defined in

[src/lib/receiver.ts:19](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L19)

## Accessors

### kind

• `get` **kind**(): [`StreamKinds`](../enums/StreamKinds.md)

#### Returns

[`StreamKinds`](../enums/StreamKinds.md)

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[kind](../interfaces/IStreamReceiver.md#kind)

#### Defined in

[src/lib/receiver.ts:29](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L29)

___

### remoteId

• `get` **remoteId**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/receiver.ts:33](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L33)

___

### state

• `get` **state**(): [`StreamReceiverState`](../enums/StreamReceiverState.md)

#### Returns

[`StreamReceiverState`](../enums/StreamReceiverState.md)

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[state](../interfaces/IStreamReceiver.md#state)

#### Defined in

[src/lib/receiver.ts:21](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L21)

___

### stream

• `get` **stream**(): `MediaStream`

#### Returns

`MediaStream`

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[stream](../interfaces/IStreamReceiver.md#stream)

#### Defined in

[src/lib/receiver.ts:25](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L25)

## Methods

### \_handleAudioLevelChange

▸ `Private` **_handleAudioLevelChange**(`_`, `«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `string` |
| `«destructured»` | `Object` |
| › `level` | `number` |

#### Returns

`void`

#### Defined in

[src/lib/receiver.ts:60](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L60)

___

### \_handleOnTrackAdded

▸ `Private` **_handleOnTrackAdded**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/receiver.ts:54](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L54)

___

### \_handleStateChange

▸ `Private` **_handleStateChange**(`_`, `«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `string` |
| `«destructured»` | `Object` |
| › `state` | [`StreamReceiverState`](../enums/StreamReceiverState.md) |

#### Returns

`void`

#### Defined in

[src/lib/receiver.ts:67](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L67)

___

### \_setState

▸ `Private` **_setState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`StreamReceiverState`](../enums/StreamReceiverState.md) |

#### Returns

`void`

#### Defined in

[src/lib/receiver.ts:108](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L108)

___

### emit

▸ **emit**(`event`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | keyof [`IStreamReceiverCallbacks`](../interfaces/IStreamReceiverCallbacks.md) |
| `...args` | [state: StreamReceiverState] \| [level: number] |

#### Returns

`void`

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[emit](../interfaces/IStreamReceiver.md#emit)

#### Inherited from

TypedEventEmitter.emit

#### Defined in

[src/lib/utils/typed-event-emitter.ts:11](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L11)

___

### internalReady

▸ `Private` **internalReady**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/lib/receiver.ts:113](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L113)

___

### limit

▸ **limit**(`priority`, `maxSpatial`, `maxTemporal`): `Promise`<`boolean`\>

Limits the stream with the specified priority to the given maximum spatial and temporal values.
`spatial` is a value indicating the definition clarity of the stream.
`temporal` is a value indicating the smoothness, or frame rate of the stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `priority` | `number` | The priority of the stream to limit. |
| `maxSpatial` | `number` | The maximum spatial value. |
| `maxTemporal` | `number` | The maximum temporal value. |

#### Returns

`Promise`<`boolean`\>

A promise that resolves to a boolean indicating whether the limit was successful.

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[limit](../interfaces/IStreamReceiver.md#limit)

#### Defined in

[src/lib/receiver.ts:141](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L141)

___

### listenerCount

▸ **listenerCount**<`TEvent`\>(`event`): `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IStreamReceiverCallbacks`](../interfaces/IStreamReceiverCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |

#### Returns

`number`

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[listenerCount](../interfaces/IStreamReceiver.md#listenercount)

#### Inherited from

TypedEventEmitter.listenerCount

#### Defined in

[src/lib/utils/typed-event-emitter.ts:58](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L58)

___

### listeners

▸ **listeners**<`TEvent`\>(`eventName`): `undefined` \| [`IStreamReceiverCallbacks`](../interfaces/IStreamReceiverCallbacks.md)[`TEvent`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IStreamReceiverCallbacks`](../interfaces/IStreamReceiverCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `TEvent` |

#### Returns

`undefined` \| [`IStreamReceiverCallbacks`](../interfaces/IStreamReceiverCallbacks.md)[`TEvent`][]

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[listeners](../interfaces/IStreamReceiver.md#listeners)

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
| `TEvent` | extends keyof [`IStreamReceiverCallbacks`](../interfaces/IStreamReceiverCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamReceiverCallbacks`](../interfaces/IStreamReceiverCallbacks.md)[`TEvent`] |

#### Returns

`void`

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[off](../interfaces/IStreamReceiver.md#off)

#### Inherited from

TypedEventEmitter.off

#### Defined in

[src/lib/utils/typed-event-emitter.ts:40](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L40)

___

### offAllListeners

▸ **offAllListeners**(): `void`

#### Returns

`void`

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[offAllListeners](../interfaces/IStreamReceiver.md#offalllisteners)

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
| `TEvent` | extends keyof [`IStreamReceiverCallbacks`](../interfaces/IStreamReceiverCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamReceiverCallbacks`](../interfaces/IStreamReceiverCallbacks.md)[`TEvent`] |

#### Returns

`fn`

▸ (): `any`

##### Returns

`any`

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[on](../interfaces/IStreamReceiver.md#on)

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
| `TEvent` | extends keyof [`IStreamReceiverCallbacks`](../interfaces/IStreamReceiverCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | `TEvent`[] |
| `cb` | [`IStreamReceiverCallbacks`](../interfaces/IStreamReceiverCallbacks.md)[`TEvent`] |

#### Returns

() => `any`[]

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[onMany](../interfaces/IStreamReceiver.md#onmany)

#### Inherited from

TypedEventEmitter.onMany

#### Defined in

[src/lib/utils/typed-event-emitter.ts:26](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L26)

___

### removeAllListeners

▸ **removeAllListeners**(): `void`

#### Returns

`void`

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[removeAllListeners](../interfaces/IStreamReceiver.md#removealllisteners)

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
| `TEvent` | extends keyof [`IStreamReceiverCallbacks`](../interfaces/IStreamReceiverCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamReceiverCallbacks`](../interfaces/IStreamReceiverCallbacks.md)[`TEvent`] |

#### Returns

`void`

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[removeListener](../interfaces/IStreamReceiver.md#removelistener)

#### Inherited from

TypedEventEmitter.removeListener

#### Defined in

[src/lib/utils/typed-event-emitter.ts:33](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L33)

___

### stop

▸ **stop**(): `Promise`<`boolean`\>

Stops the stream.

#### Returns

`Promise`<`boolean`\>

A promise that resolves to a boolean indicating whether the stop was successful.

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[stop](../interfaces/IStreamReceiver.md#stop)

#### Defined in

[src/lib/receiver.ts:164](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L164)

___

### switch

▸ **switch**(`remote`, `priority?`): `Promise`<`boolean`\>

Switches to a remote stream.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `remote` | [`StreamRemote`](StreamRemote.md) | `undefined` | The remote stream to switch to. |
| `priority` | `number` | `50` | - |

#### Returns

`Promise`<`boolean`\>

A promise that resolves to a boolean indicating whether the switch was successful.

#### Implementation of

[IStreamReceiver](../interfaces/IStreamReceiver.md).[switch](../interfaces/IStreamReceiver.md#switch)

#### Defined in

[src/lib/receiver.ts:120](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/receiver.ts#L120)
