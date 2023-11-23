[Atm0s JS SDK](../README.md) / IStreamSender

# Interface: IStreamSender

Represents a stream sender.

## Hierarchy

- `TypedEventEmitter`<[`IStreamSenderCallbacks`](IStreamSenderCallbacks.md)\>

  ↳ **`IStreamSender`**

## Implemented by

- [`StreamSender`](../classes/StreamSender.md)

## Table of contents

### Properties

- [isScreen](IStreamSender.md#isscreen)
- [label](IStreamSender.md#label)
- [maxBitrate](IStreamSender.md#maxbitrate)
- [simulcast](IStreamSender.md#simulcast)
- [state](IStreamSender.md#state)
- [stream](IStreamSender.md#stream)
- [uuid](IStreamSender.md#uuid)

### Methods

- [emit](IStreamSender.md#emit)
- [listenerCount](IStreamSender.md#listenercount)
- [listeners](IStreamSender.md#listeners)
- [off](IStreamSender.md#off)
- [offAllListeners](IStreamSender.md#offalllisteners)
- [on](IStreamSender.md#on)
- [onMany](IStreamSender.md#onmany)
- [removeAllListeners](IStreamSender.md#removealllisteners)
- [removeListener](IStreamSender.md#removelistener)
- [stop](IStreamSender.md#stop)
- [switch](IStreamSender.md#switch)

## Properties

### isScreen

• `Optional` **isScreen**: `boolean`

#### Defined in

[src/lib/interfaces/sender.ts:16](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/sender.ts#L16)

___

### label

• **label**: `string`

#### Defined in

[src/lib/interfaces/sender.ts:12](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/sender.ts#L12)

___

### maxBitrate

• `Optional` **maxBitrate**: `number`

#### Defined in

[src/lib/interfaces/sender.ts:15](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/sender.ts#L15)

___

### simulcast

• `Optional` **simulcast**: `boolean`

#### Defined in

[src/lib/interfaces/sender.ts:14](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/sender.ts#L14)

___

### state

• **state**: [`StreamSenderState`](../enums/StreamSenderState.md)

#### Defined in

[src/lib/interfaces/sender.ts:9](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/sender.ts#L9)

___

### stream

• **stream**: `undefined` \| ``null`` \| `MediaStream`

#### Defined in

[src/lib/interfaces/sender.ts:10](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/sender.ts#L10)

___

### uuid

• **uuid**: `string`

#### Defined in

[src/lib/interfaces/sender.ts:11](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/sender.ts#L11)

## Methods

### emit

▸ **emit**(`event`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | keyof [`IStreamSenderCallbacks`](IStreamSenderCallbacks.md) |
| `...args` | [state: StreamSenderState] \| [level: number] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.emit

#### Defined in

[src/lib/utils/typed-event-emitter.ts:11](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L11)

___

### listenerCount

▸ **listenerCount**<`TEvent`\>(`event`): `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IStreamSenderCallbacks`](IStreamSenderCallbacks.md) |

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

▸ **listeners**<`TEvent`\>(`eventName`): `undefined` \| [`IStreamSenderCallbacks`](IStreamSenderCallbacks.md)[`TEvent`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IStreamSenderCallbacks`](IStreamSenderCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `TEvent` |

#### Returns

`undefined` \| [`IStreamSenderCallbacks`](IStreamSenderCallbacks.md)[`TEvent`][]

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
| `TEvent` | extends keyof [`IStreamSenderCallbacks`](IStreamSenderCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamSenderCallbacks`](IStreamSenderCallbacks.md)[`TEvent`] |

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
| `TEvent` | extends keyof [`IStreamSenderCallbacks`](IStreamSenderCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamSenderCallbacks`](IStreamSenderCallbacks.md)[`TEvent`] |

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
| `TEvent` | extends keyof [`IStreamSenderCallbacks`](IStreamSenderCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | `TEvent`[] |
| `cb` | [`IStreamSenderCallbacks`](IStreamSenderCallbacks.md)[`TEvent`] |

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
| `TEvent` | extends keyof [`IStreamSenderCallbacks`](IStreamSenderCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamSenderCallbacks`](IStreamSenderCallbacks.md)[`TEvent`] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.removeListener

#### Defined in

[src/lib/utils/typed-event-emitter.ts:33](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L33)

___

### stop

▸ **stop**(): `Promise`<`void`\>

Stops the streaming process.

#### Returns

`Promise`<`void`\>

A promise that resolves when the streaming is stopped.

#### Defined in

[src/lib/interfaces/sender.ts:27](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/sender.ts#L27)

___

### switch

▸ **switch**(`stream`): `void`

Switches to the specified media stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | `MediaStream` | The media stream to switch to. |

#### Returns

`void`

#### Defined in

[src/lib/interfaces/sender.ts:21](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/sender.ts#L21)
