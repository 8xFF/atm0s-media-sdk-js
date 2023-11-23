[Atm0s JS SDK](../README.md) / StreamRemote

# Class: StreamRemote

## Hierarchy

- `TypedEventEmitter`<[`IStreamRemoteCallbacks`](../interfaces/IStreamRemoteCallbacks.md)\>

  ↳ **`StreamRemote`**

## Table of contents

### Constructors

- [constructor](StreamRemote.md#constructor)

### Properties

- [\_state](StreamRemote.md#_state)
- [kind](StreamRemote.md#kind)
- [name](StreamRemote.md#name)
- [peerHash](StreamRemote.md#peerhash)
- [peerId](StreamRemote.md#peerid)

### Accessors

- [state](StreamRemote.md#state)

### Methods

- [close](StreamRemote.md#close)
- [emit](StreamRemote.md#emit)
- [listenerCount](StreamRemote.md#listenercount)
- [listeners](StreamRemote.md#listeners)
- [off](StreamRemote.md#off)
- [offAllListeners](StreamRemote.md#offalllisteners)
- [on](StreamRemote.md#on)
- [onMany](StreamRemote.md#onmany)
- [removeAllListeners](StreamRemote.md#removealllisteners)
- [removeListener](StreamRemote.md#removelistener)
- [updateState](StreamRemote.md#updatestate)

## Constructors

### constructor

• **new StreamRemote**(`kind`, `peerId`, `peerHash`, `name`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | [`StreamKinds`](../enums/StreamKinds.md) |
| `peerId` | `string` |
| `peerHash` | `string` |
| `name` | `string` |

#### Overrides

TypedEventEmitter&lt;IStreamRemoteCallbacks\&gt;.constructor

#### Defined in

[src/lib/remote.ts:21](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/remote.ts#L21)

## Properties

### \_state

• **\_state**: [`StreamRemoteState`](../interfaces/StreamRemoteState.md)

#### Defined in

[src/lib/remote.ts:14](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/remote.ts#L14)

___

### kind

• `Readonly` **kind**: [`StreamKinds`](../enums/StreamKinds.md)

#### Defined in

[src/lib/remote.ts:22](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/remote.ts#L22)

___

### name

• `Readonly` **name**: `string`

#### Defined in

[src/lib/remote.ts:25](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/remote.ts#L25)

___

### peerHash

• `Readonly` **peerHash**: `string`

#### Defined in

[src/lib/remote.ts:24](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/remote.ts#L24)

___

### peerId

• `Readonly` **peerId**: `string`

#### Defined in

[src/lib/remote.ts:23](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/remote.ts#L23)

## Accessors

### state

• `get` **state**(): [`StreamRemoteState`](../interfaces/StreamRemoteState.md)

#### Returns

[`StreamRemoteState`](../interfaces/StreamRemoteState.md)

#### Defined in

[src/lib/remote.ts:30](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/remote.ts#L30)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/remote.ts:41](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/remote.ts#L41)

___

### emit

▸ **emit**(`event`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | keyof [`IStreamRemoteCallbacks`](../interfaces/IStreamRemoteCallbacks.md) |
| `...args` | [state: StreamRemoteState] \| [] |

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
| `TEvent` | extends keyof [`IStreamRemoteCallbacks`](../interfaces/IStreamRemoteCallbacks.md) |

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

▸ **listeners**<`TEvent`\>(`eventName`): `undefined` \| [`IStreamRemoteCallbacks`](../interfaces/IStreamRemoteCallbacks.md)[`TEvent`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IStreamRemoteCallbacks`](../interfaces/IStreamRemoteCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `TEvent` |

#### Returns

`undefined` \| [`IStreamRemoteCallbacks`](../interfaces/IStreamRemoteCallbacks.md)[`TEvent`][]

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
| `TEvent` | extends keyof [`IStreamRemoteCallbacks`](../interfaces/IStreamRemoteCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamRemoteCallbacks`](../interfaces/IStreamRemoteCallbacks.md)[`TEvent`] |

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
| `TEvent` | extends keyof [`IStreamRemoteCallbacks`](../interfaces/IStreamRemoteCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamRemoteCallbacks`](../interfaces/IStreamRemoteCallbacks.md)[`TEvent`] |

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
| `TEvent` | extends keyof [`IStreamRemoteCallbacks`](../interfaces/IStreamRemoteCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | `TEvent`[] |
| `cb` | [`IStreamRemoteCallbacks`](../interfaces/IStreamRemoteCallbacks.md)[`TEvent`] |

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
| `TEvent` | extends keyof [`IStreamRemoteCallbacks`](../interfaces/IStreamRemoteCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IStreamRemoteCallbacks`](../interfaces/IStreamRemoteCallbacks.md)[`TEvent`] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.removeListener

#### Defined in

[src/lib/utils/typed-event-emitter.ts:33](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/typed-event-emitter.ts#L33)

___

### updateState

▸ **updateState**(`_state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_state` | [`StreamRemoteState`](../interfaces/StreamRemoteState.md) |

#### Returns

`void`

#### Defined in

[src/lib/remote.ts:34](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/remote.ts#L34)
