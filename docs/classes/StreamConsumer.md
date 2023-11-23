[Atm0s JS SDK](../README.md) / StreamConsumer

# Class: StreamConsumer

## Hierarchy

- `TypedEventEmitter`<`IConsumerCallbacks`\>

  ↳ **`StreamConsumer`**

## Table of contents

### Constructors

- [constructor](StreamConsumer.md#constructor)

### Properties

- [\_remote](StreamConsumer.md#_remote)
- [\_session](StreamConsumer.md#_session)
- [receiver](StreamConsumer.md#receiver)
- [views](StreamConsumer.md#views)

### Accessors

- [state](StreamConsumer.md#state)
- [stream](StreamConsumer.md#stream)

### Methods

- [configLayer](StreamConsumer.md#configlayer)
- [emit](StreamConsumer.md#emit)
- [limit](StreamConsumer.md#limit)
- [listenerCount](StreamConsumer.md#listenercount)
- [listeners](StreamConsumer.md#listeners)
- [off](StreamConsumer.md#off)
- [offAllListeners](StreamConsumer.md#offalllisteners)
- [on](StreamConsumer.md#on)
- [onMany](StreamConsumer.md#onmany)
- [onReceiverAudioLevelChanged](StreamConsumer.md#onreceiveraudiolevelchanged)
- [onReceiverStateChanged](StreamConsumer.md#onreceiverstatechanged)
- [removeAllListeners](StreamConsumer.md#removealllisteners)
- [removeListener](StreamConsumer.md#removelistener)
- [unview](StreamConsumer.md#unview)
- [view](StreamConsumer.md#view)

## Constructors

### constructor

• **new StreamConsumer**(`_session`, `_remote`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_session` | [`Session`](Session.md) |
| `_remote` | [`StreamRemote`](StreamRemote.md) |

#### Overrides

TypedEventEmitter&lt;IConsumerCallbacks\&gt;.constructor

#### Defined in

[src/lib/consumer.ts:12](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/consumer.ts#L12)

## Properties

### \_remote

• `Private` **\_remote**: [`StreamRemote`](StreamRemote.md)

#### Defined in

[src/lib/consumer.ts:14](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/consumer.ts#L14)

___

### \_session

• `Private` **\_session**: [`Session`](Session.md)

#### Defined in

[src/lib/consumer.ts:13](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/consumer.ts#L13)

___

### receiver

• `Private` `Optional` **receiver**: [`IStreamReceiver`](../interfaces/IStreamReceiver.md)

#### Defined in

[src/lib/consumer.ts:9](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/consumer.ts#L9)

___

### views

• `Private` **views**: `Map`<`string`, `ViewInfo`\>

#### Defined in

[src/lib/consumer.ts:10](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/consumer.ts#L10)

## Accessors

### state

• `get` **state**(): [`StreamReceiverState`](../enums/StreamReceiverState.md)

#### Returns

[`StreamReceiverState`](../enums/StreamReceiverState.md)

#### Defined in

[src/lib/consumer.ts:19](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/consumer.ts#L19)

___

### stream

• `get` **stream**(): `undefined` \| `MediaStream`

#### Returns

`undefined` \| `MediaStream`

#### Defined in

[src/lib/consumer.ts:23](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/consumer.ts#L23)

## Methods

### configLayer

▸ `Private` **configLayer**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/consumer.ts:70](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/consumer.ts#L70)

___

### emit

▸ **emit**(`event`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | keyof `IConsumerCallbacks` |
| `...args` | [state: StreamReceiverState] \| [level: number] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.emit

#### Defined in

[src/lib/utils/typed-event-emitter.ts:11](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L11)

___

### limit

▸ **limit**(`viewId`, `priority?`, `maxSpatial?`, `maxTemporal?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `viewId` | `string` | `undefined` |
| `priority` | `number` | `50` |
| `maxSpatial` | `number` | `2` |
| `maxTemporal` | `number` | `2` |

#### Returns

`void`

#### Defined in

[src/lib/consumer.ts:44](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/consumer.ts#L44)

___

### listenerCount

▸ **listenerCount**<`TEvent`\>(`event`): `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof `IConsumerCallbacks` |

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

▸ **listeners**<`TEvent`\>(`eventName`): `undefined` \| `IConsumerCallbacks`[`TEvent`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof `IConsumerCallbacks` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `TEvent` |

#### Returns

`undefined` \| `IConsumerCallbacks`[`TEvent`][]

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
| `TEvent` | extends keyof `IConsumerCallbacks` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | `IConsumerCallbacks`[`TEvent`] |

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
| `TEvent` | extends keyof `IConsumerCallbacks` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | `IConsumerCallbacks`[`TEvent`] |

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
| `TEvent` | extends keyof `IConsumerCallbacks` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | `TEvent`[] |
| `cb` | `IConsumerCallbacks`[`TEvent`] |

#### Returns

() => `any`[]

#### Inherited from

TypedEventEmitter.onMany

#### Defined in

[src/lib/utils/typed-event-emitter.ts:26](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L26)

___

### onReceiverAudioLevelChanged

▸ `Private` **onReceiverAudioLevelChanged**(`level`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `number` |

#### Returns

`void`

#### Defined in

[src/lib/consumer.ts:87](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/consumer.ts#L87)

___

### onReceiverStateChanged

▸ `Private` **onReceiverStateChanged**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`StreamReceiverState`](../enums/StreamReceiverState.md) |

#### Returns

`void`

#### Defined in

[src/lib/consumer.ts:91](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/consumer.ts#L91)

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
| `TEvent` | extends keyof `IConsumerCallbacks` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | `IConsumerCallbacks`[`TEvent`] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.removeListener

#### Defined in

[src/lib/utils/typed-event-emitter.ts:33](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L33)

___

### unview

▸ **unview**(`viewerId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewerId` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/consumer.ts:54](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/consumer.ts#L54)

___

### view

▸ **view**(`viewerId`, `priority?`, `maxSpatial?`, `maxTemporal?`): `MediaStream`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `viewerId` | `string` | `undefined` |
| `priority` | `number` | `50` |
| `maxSpatial` | `number` | `2` |
| `maxTemporal` | `number` | `2` |

#### Returns

`MediaStream`

#### Defined in

[src/lib/consumer.ts:27](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/consumer.ts#L27)
