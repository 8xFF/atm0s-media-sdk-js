[Atm0s JS SDK](../README.md) / StreamSender

# Class: StreamSender

Represents a stream sender.

## Hierarchy

- `TypedEventEmitter`<[`IStreamSenderCallbacks`](../interfaces/IStreamSenderCallbacks.md)\>

  ↳ **`StreamSender`**

## Implements

- [`IStreamSender`](../interfaces/IStreamSender.md)

## Table of contents

### Constructors

- [constructor](StreamSender.md#constructor)

### Properties

- [\_rpc](StreamSender.md#_rpc)
- [\_state](StreamSender.md#_state)
- [\_track](StreamSender.md#_track)
- [logger](StreamSender.md#logger)

### Accessors

- [isScreen](StreamSender.md#isscreen)
- [kind](StreamSender.md#kind)
- [label](StreamSender.md#label)
- [maxBitrate](StreamSender.md#maxbitrate)
- [name](StreamSender.md#name)
- [simulcast](StreamSender.md#simulcast)
- [state](StreamSender.md#state)
- [stream](StreamSender.md#stream)
- [uuid](StreamSender.md#uuid)

### Methods

- [\_handleAudioLevelChange](StreamSender.md#_handleaudiolevelchange)
- [\_handleStateChange](StreamSender.md#_handlestatechange)
- [\_setState](StreamSender.md#_setstate)
- [emit](StreamSender.md#emit)
- [listenerCount](StreamSender.md#listenercount)
- [listeners](StreamSender.md#listeners)
- [off](StreamSender.md#off)
- [offAllListeners](StreamSender.md#offalllisteners)
- [on](StreamSender.md#on)
- [onMany](StreamSender.md#onmany)
- [removeAllListeners](StreamSender.md#removealllisteners)
- [removeListener](StreamSender.md#removelistener)
- [stop](StreamSender.md#stop)
- [switch](StreamSender.md#switch)

## Constructors

### constructor

• **new StreamSender**(`_rpc`, `_track`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_rpc` | [`IRPC`](../interfaces/IRPC.md) |
| `_track` | [`ISenderTrack`](../interfaces/ISenderTrack.md) |

#### Overrides

TypedEventEmitter&lt;IStreamSenderCallbacks\&gt;.constructor

#### Defined in

[src/lib/sender.ts:53](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L53)

## Properties

### \_rpc

• `Private` **\_rpc**: [`IRPC`](../interfaces/IRPC.md)

#### Defined in

[src/lib/sender.ts:54](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L54)

___

### \_state

• `Private` **\_state**: [`StreamSenderState`](../enums/StreamSenderState.md) = `StreamSenderState.Created`

#### Defined in

[src/lib/sender.ts:51](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L51)

___

### \_track

• `Private` **\_track**: [`ISenderTrack`](../interfaces/ISenderTrack.md)

#### Defined in

[src/lib/sender.ts:55](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L55)

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

[src/lib/sender.ts:52](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L52)

## Accessors

### isScreen

• `get` **isScreen**(): `undefined` \| `boolean`

#### Returns

`undefined` \| `boolean`

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[isScreen](../interfaces/IStreamSender.md#isscreen)

#### Defined in

[src/lib/sender.ts:31](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L31)

___

### kind

• `get` **kind**(): [`StreamKinds`](../enums/StreamKinds.md)

#### Returns

[`StreamKinds`](../enums/StreamKinds.md)

#### Defined in

[src/lib/sender.ts:47](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L47)

___

### label

• `get` **label**(): `string`

#### Returns

`string`

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[label](../interfaces/IStreamSender.md#label)

#### Defined in

[src/lib/sender.ts:39](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L39)

___

### maxBitrate

• `get` **maxBitrate**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[maxBitrate](../interfaces/IStreamSender.md#maxbitrate)

#### Defined in

[src/lib/sender.ts:27](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L27)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/sender.ts:15](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L15)

___

### simulcast

• `get` **simulcast**(): `undefined` \| `boolean`

#### Returns

`undefined` \| `boolean`

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[simulcast](../interfaces/IStreamSender.md#simulcast)

#### Defined in

[src/lib/sender.ts:23](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L23)

___

### state

• `get` **state**(): [`StreamSenderState`](../enums/StreamSenderState.md)

#### Returns

[`StreamSenderState`](../enums/StreamSenderState.md)

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[state](../interfaces/IStreamSender.md#state)

#### Defined in

[src/lib/sender.ts:19](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L19)

___

### stream

• `get` **stream**(): ``null`` \| `MediaStream`

#### Returns

``null`` \| `MediaStream`

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[stream](../interfaces/IStreamSender.md#stream)

#### Defined in

[src/lib/sender.ts:43](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L43)

___

### uuid

• `get` **uuid**(): `string`

#### Returns

`string`

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[uuid](../interfaces/IStreamSender.md#uuid)

#### Defined in

[src/lib/sender.ts:35](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L35)

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

[src/lib/sender.ts:71](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L71)

___

### \_handleStateChange

▸ `Private` **_handleStateChange**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/sender.ts:65](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L65)

___

### \_setState

▸ `Private` **_setState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`StreamSenderState`](../enums/StreamSenderState.md) |

#### Returns

`void`

#### Defined in

[src/lib/sender.ts:75](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L75)

___

### emit

▸ **emit**(`event`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | keyof [`IStreamSenderCallbacks`](../interfaces/IStreamSenderCallbacks.md) |
| `...args` | [state: StreamSenderState] \| [level: number] |

#### Returns

`void`

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[emit](../interfaces/IStreamSender.md#emit)

#### Inherited from

TypedEventEmitter.emit

#### Defined in

[src/lib/utils/typed-event-emitter.ts:11](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L11)

___

### listenerCount

▸ **listenerCount**<`TEvent`\>(`event`): `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IStreamSenderCallbacks`](../interfaces/IStreamSenderCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |

#### Returns

`number`

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[listenerCount](../interfaces/IStreamSender.md#listenercount)

#### Inherited from

TypedEventEmitter.listenerCount

#### Defined in

[src/lib/utils/typed-event-emitter.ts:58](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L58)

___

### listeners

▸ **listeners**<`TEvent`\>(`eventName`): `undefined` \| [`IStreamSenderCallbacks`](../interfaces/IStreamSenderCallbacks.md)[`TEvent`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IStreamSenderCallbacks`](../interfaces/IStreamSenderCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `TEvent` |

#### Returns

`undefined` \| [`IStreamSenderCallbacks`](../interfaces/IStreamSenderCallbacks.md)[`TEvent`][]

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[listeners](../interfaces/IStreamSender.md#listeners)

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
| `TEvent` | extends keyof [`IStreamSenderCallbacks`](../interfaces/IStreamSenderCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamSenderCallbacks`](../interfaces/IStreamSenderCallbacks.md)[`TEvent`] |

#### Returns

`void`

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[off](../interfaces/IStreamSender.md#off)

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

[IStreamSender](../interfaces/IStreamSender.md).[offAllListeners](../interfaces/IStreamSender.md#offalllisteners)

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
| `TEvent` | extends keyof [`IStreamSenderCallbacks`](../interfaces/IStreamSenderCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamSenderCallbacks`](../interfaces/IStreamSenderCallbacks.md)[`TEvent`] |

#### Returns

`fn`

▸ (): `any`

##### Returns

`any`

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[on](../interfaces/IStreamSender.md#on)

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
| `TEvent` | extends keyof [`IStreamSenderCallbacks`](../interfaces/IStreamSenderCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | `TEvent`[] |
| `cb` | [`IStreamSenderCallbacks`](../interfaces/IStreamSenderCallbacks.md)[`TEvent`] |

#### Returns

() => `any`[]

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[onMany](../interfaces/IStreamSender.md#onmany)

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

[IStreamSender](../interfaces/IStreamSender.md).[removeAllListeners](../interfaces/IStreamSender.md#removealllisteners)

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
| `TEvent` | extends keyof [`IStreamSenderCallbacks`](../interfaces/IStreamSenderCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamSenderCallbacks`](../interfaces/IStreamSenderCallbacks.md)[`TEvent`] |

#### Returns

`void`

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[removeListener](../interfaces/IStreamSender.md#removelistener)

#### Inherited from

TypedEventEmitter.removeListener

#### Defined in

[src/lib/utils/typed-event-emitter.ts:33](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L33)

___

### stop

▸ **stop**(): `Promise`<`void`\>

Stops the streaming process.

#### Returns

`Promise`<`void`\>

A promise that resolves when the streaming is stopped.

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[stop](../interfaces/IStreamSender.md#stop)

#### Defined in

[src/lib/sender.ts:95](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L95)

___

### switch

▸ **switch**(`stream`): `void`

Switches to the specified media stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | ``null`` \| `MediaStream` | The media stream to switch to. |

#### Returns

`void`

#### Implementation of

[IStreamSender](../interfaces/IStreamSender.md).[switch](../interfaces/IStreamSender.md#switch)

#### Defined in

[src/lib/sender.ts:80](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/sender.ts#L80)
