[Atm0s JS SDK](../README.md) / StreamPublisher

# Class: StreamPublisher

## Hierarchy

- `TypedEventEmitter`<`IPublisherCallbacks`\>

  ↳ **`StreamPublisher`**

## Table of contents

### Constructors

- [constructor](StreamPublisher.md#constructor)

### Properties

- [\_senderConfig](StreamPublisher.md#_senderconfig)
- [\_session](StreamPublisher.md#_session)
- [sender](StreamPublisher.md#sender)

### Accessors

- [localStream](StreamPublisher.md#localstream)
- [state](StreamPublisher.md#state)

### Methods

- [emit](StreamPublisher.md#emit)
- [listenerCount](StreamPublisher.md#listenercount)
- [listeners](StreamPublisher.md#listeners)
- [off](StreamPublisher.md#off)
- [offAllListeners](StreamPublisher.md#offalllisteners)
- [on](StreamPublisher.md#on)
- [onAudioLevel](StreamPublisher.md#onaudiolevel)
- [onMany](StreamPublisher.md#onmany)
- [onState](StreamPublisher.md#onstate)
- [removeAllListeners](StreamPublisher.md#removealllisteners)
- [removeListener](StreamPublisher.md#removelistener)
- [stop](StreamPublisher.md#stop)
- [switch](StreamPublisher.md#switch)

## Constructors

### constructor

• **new StreamPublisher**(`_session`, `_senderConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_session` | [`Session`](Session.md) |
| `_senderConfig` | [`SenderConfig`](../README.md#senderconfig) |

#### Overrides

TypedEventEmitter&lt;IPublisherCallbacks\&gt;.constructor

#### Defined in

[src/lib/publisher.ts:13](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/publisher.ts#L13)

## Properties

### \_senderConfig

• `Private` **\_senderConfig**: [`SenderConfig`](../README.md#senderconfig)

#### Defined in

[src/lib/publisher.ts:15](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/publisher.ts#L15)

___

### \_session

• `Private` **\_session**: [`Session`](Session.md)

#### Defined in

[src/lib/publisher.ts:14](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/publisher.ts#L14)

___

### sender

• `Private` `Optional` **sender**: [`IStreamSender`](../interfaces/IStreamSender.md)

#### Defined in

[src/lib/publisher.ts:11](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/publisher.ts#L11)

## Accessors

### localStream

• `get` **localStream**(): `undefined` \| ``null`` \| `MediaStream`

#### Returns

`undefined` \| ``null`` \| `MediaStream`

#### Defined in

[src/lib/publisher.ts:41](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/publisher.ts#L41)

___

### state

• `get` **state**(): [`StreamSenderState`](../enums/StreamSenderState.md)

#### Returns

[`StreamSenderState`](../enums/StreamSenderState.md)

#### Defined in

[src/lib/publisher.ts:37](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/publisher.ts#L37)

## Methods

### emit

▸ **emit**(`event`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | keyof `IPublisherCallbacks` |
| `...args` | [state: StreamSenderState] \| [level: number] |

#### Returns

`void`

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
| `TEvent` | extends keyof `IPublisherCallbacks` |

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

▸ **listeners**<`TEvent`\>(`eventName`): `undefined` \| `IPublisherCallbacks`[`TEvent`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof `IPublisherCallbacks` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `TEvent` |

#### Returns

`undefined` \| `IPublisherCallbacks`[`TEvent`][]

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
| `TEvent` | extends keyof `IPublisherCallbacks` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | `IPublisherCallbacks`[`TEvent`] |

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
| `TEvent` | extends keyof `IPublisherCallbacks` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | `IPublisherCallbacks`[`TEvent`] |

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

### onAudioLevel

▸ `Private` **onAudioLevel**(`level`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `number` |

#### Returns

`void`

#### Defined in

[src/lib/publisher.ts:49](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/publisher.ts#L49)

___

### onMany

▸ **onMany**<`TEvent`\>(`events`, `cb`): () => `any`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof `IPublisherCallbacks` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | `TEvent`[] |
| `cb` | `IPublisherCallbacks`[`TEvent`] |

#### Returns

() => `any`[]

#### Inherited from

TypedEventEmitter.onMany

#### Defined in

[src/lib/utils/typed-event-emitter.ts:26](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L26)

___

### onState

▸ `Private` **onState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`StreamSenderState`](../enums/StreamSenderState.md) |

#### Returns

`void`

#### Defined in

[src/lib/publisher.ts:45](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/publisher.ts#L45)

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
| `TEvent` | extends keyof `IPublisherCallbacks` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | `IPublisherCallbacks`[`TEvent`] |

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

[src/lib/publisher.ts:57](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/publisher.ts#L57)

___

### switch

▸ **switch**(`stream`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `MediaStream` |

#### Returns

`void`

#### Defined in

[src/lib/publisher.ts:53](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/publisher.ts#L53)
