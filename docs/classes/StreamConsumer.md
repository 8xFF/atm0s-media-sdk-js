[Atm0s JS SDK](../README.md) / StreamConsumer

# Class: StreamConsumer

Represents a stream consumer that sets up views for specific viewers and configures layer settings.

## Hierarchy

- `TypedEventEmitter`<`IConsumerCallbacks`\>

  ↳ **`StreamConsumer`**

## Table of contents

### Constructors

- [constructor](StreamConsumer.md#constructor)

### Properties

- [\_remote](StreamConsumer.md#_remote)
- [\_session](StreamConsumer.md#_session)
- [keys](StreamConsumer.md#keys)
- [receiver](StreamConsumer.md#receiver)

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

[src/lib/consumer.ts:15](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/consumer.ts#L15)

## Properties

### \_remote

• `Private` **\_remote**: [`StreamRemote`](StreamRemote.md)

#### Defined in

[src/lib/consumer.ts:17](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/consumer.ts#L17)

___

### \_session

• `Private` **\_session**: [`Session`](Session.md)

#### Defined in

[src/lib/consumer.ts:16](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/consumer.ts#L16)

___

### keys

• `Private` **keys**: `Map`<`string`, `ViewInfo`\>

#### Defined in

[src/lib/consumer.ts:13](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/consumer.ts#L13)

___

### receiver

• `Private` `Optional` **receiver**: [`IStreamReceiver`](../interfaces/IStreamReceiver.md)

#### Defined in

[src/lib/consumer.ts:12](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/consumer.ts#L12)

## Accessors

### state

• `get` **state**(): [`StreamReceiverState`](../enums/StreamReceiverState.md)

#### Returns

[`StreamReceiverState`](../enums/StreamReceiverState.md)

#### Defined in

[src/lib/consumer.ts:22](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/consumer.ts#L22)

___

### stream

• `get` **stream**(): `undefined` \| `MediaStream`

#### Returns

`undefined` \| `MediaStream`

#### Defined in

[src/lib/consumer.ts:26](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/consumer.ts#L26)

## Methods

### configLayer

▸ `Private` **configLayer**(): `Promise`<`void`\>

Configures the layer based on the selected viewers' priorities and maximum spatial/temporal values.
This method is only applicable for video streams.

#### Returns

`Promise`<`void`\>

A promise that resolves when the layer configuration is complete.

#### Defined in

[src/lib/consumer.ts:99](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/consumer.ts#L99)

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

[src/lib/utils/typed-event-emitter.ts:11](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L11)

___

### limit

▸ **limit**(`key`, `priority?`, `maxSpatial?`, `maxTemporal?`): `Promise`<`void`\>

Sets the limit for a specific view by key.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | `string` | `undefined` | The key of the view to set the limit for. |
| `priority` | `number` | `50` | The priority of the view (default: 50). |
| `maxSpatial` | `number` | `2` | The maximum spatial limit (default: 2). |
| `maxTemporal` | `number` | `2` | The maximum temporal limit (default: 2). |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/consumer.ts:62](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/consumer.ts#L62)

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

[src/lib/utils/typed-event-emitter.ts:58](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L58)

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

[src/lib/utils/typed-event-emitter.ts:52](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L52)

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

[src/lib/utils/typed-event-emitter.ts:17](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L17)

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

[src/lib/utils/typed-event-emitter.ts:26](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L26)

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

[src/lib/consumer.ts:116](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/consumer.ts#L116)

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

[src/lib/consumer.ts:120](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/consumer.ts#L120)

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

[src/lib/utils/typed-event-emitter.ts:33](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L33)

___

### unview

▸ **unview**(`key`): `void`

Removes a key from the set of viewed keys.
If the set becomes empty, stops the receiver and emits the 'state' event with StreamReceiverState.NoSource.
Otherwise, reconfigures the layer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key to be removed from the set of viewed keys. |

#### Returns

`void`

#### Defined in

[src/lib/consumer.ts:78](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/consumer.ts#L78)

___

### view

▸ **view**(`key`, `priority?`, `maxSpatial?`, `maxTemporal?`): `Promise`<`MediaStream`\>

Sets up a view for a specific viewer key.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | `string` | `undefined` | The key of the viewer. |
| `priority` | `number` | `50` | The priority of the view (default: 50). |
| `maxSpatial` | `number` | `2` | The maximum spatial layer for the view (default: 2). |
| `maxTemporal` | `number` | `2` | The maximum temporal layer for the view (default: 2). |

#### Returns

`Promise`<`MediaStream`\>

A promise that resolves to a MediaStream object representing the view.

#### Defined in

[src/lib/consumer.ts:38](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/consumer.ts#L38)
