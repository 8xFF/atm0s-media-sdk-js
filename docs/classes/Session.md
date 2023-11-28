[Atm0s JS SDK](../README.md) / Session

# Class: Session

## Hierarchy

- `TypedEventEmitter`<[`ISessionCallbacks`](../interfaces/ISessionCallbacks.md)\>

  ↳ **`Session`**

## Table of contents

### Constructors

- [constructor](Session.md#constructor)

### Properties

- [\_audioReceivers](Session.md#_audioreceivers)
- [\_audioSenders](Session.md#_audiosenders)
- [\_cfg](Session.md#_cfg)
- [\_connector](Session.md#_connector)
- [\_remotes](Session.md#_remotes)
- [\_rpc](Session.md#_rpc)
- [\_socket](Session.md#_socket)
- [\_videoReceivers](Session.md#_videoreceivers)
- [\_videoSenders](Session.md#_videosenders)
- [logger](Session.md#logger)
- [update](Session.md#update)

### Methods

- [backReceiver](Session.md#backreceiver)
- [connect](Session.md#connect)
- [createConsumer](Session.md#createconsumer)
- [createPublisher](Session.md#createpublisher)
- [createReceiver](Session.md#createreceiver)
- [createSender](Session.md#createsender)
- [emit](Session.md#emit)
- [getSender](Session.md#getsender)
- [listenerCount](Session.md#listenercount)
- [listeners](Session.md#listeners)
- [off](Session.md#off)
- [offAllListeners](Session.md#offalllisteners)
- [on](Session.md#on)
- [onMany](Session.md#onmany)
- [onStreamEvent](Session.md#onstreamevent)
- [removeAllListeners](Session.md#removealllisteners)
- [removeListener](Session.md#removelistener)
- [takeReceiver](Session.md#takereceiver)
- [updateSdp](Session.md#updatesdp)

## Constructors

### constructor

• **new Session**(`_cfg`, `_socket`, `_connector`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_cfg` | [`ISessionConfig`](../interfaces/ISessionConfig.md) |
| `_socket` | [`IRealtimeSocket`](../interfaces/IRealtimeSocket.md) |
| `_connector` | [`IMediaGatewayConnector`](../interfaces/IMediaGatewayConnector.md) |

#### Overrides

TypedEventEmitter&lt;ISessionCallbacks\&gt;.constructor

#### Defined in

[src/lib/session.ts:30](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L30)

## Properties

### \_audioReceivers

• `Private` **\_audioReceivers**: [`IStreamReceiver`](../interfaces/IStreamReceiver.md)[] = `[]`

#### Defined in

[src/lib/session.ts:23](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L23)

___

### \_audioSenders

• `Private` **\_audioSenders**: `Map`<`string`, [`IStreamSender`](../interfaces/IStreamSender.md)\>

#### Defined in

[src/lib/session.ts:20](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L20)

___

### \_cfg

• `Private` **\_cfg**: [`ISessionConfig`](../interfaces/ISessionConfig.md)

#### Defined in

[src/lib/session.ts:31](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L31)

___

### \_connector

• `Private` **\_connector**: [`IMediaGatewayConnector`](../interfaces/IMediaGatewayConnector.md)

#### Defined in

[src/lib/session.ts:33](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L33)

___

### \_remotes

• `Private` **\_remotes**: `Map`<`string`, [`StreamRemote`](StreamRemote.md)\>

#### Defined in

[src/lib/session.ts:25](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L25)

___

### \_rpc

• `Private` **\_rpc**: [`IRPC`](../interfaces/IRPC.md)

#### Defined in

[src/lib/session.ts:28](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L28)

___

### \_socket

• `Private` **\_socket**: [`IRealtimeSocket`](../interfaces/IRealtimeSocket.md)

#### Defined in

[src/lib/session.ts:32](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L32)

___

### \_videoReceivers

• `Private` **\_videoReceivers**: [`IStreamReceiver`](../interfaces/IStreamReceiver.md)[] = `[]`

#### Defined in

[src/lib/session.ts:24](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L24)

___

### \_videoSenders

• `Private` **\_videoSenders**: `Map`<`string`, [`IStreamSender`](../interfaces/IStreamSender.md)\>

#### Defined in

[src/lib/session.ts:21](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L21)

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

[src/lib/session.ts:27](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L27)

___

### update

• `Private` **update**: `Object`

#### Call signature

▸ (`this`, `...args`): `Promise`<`Promise`<`void`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `unknown` |
| `...args` | [] & `any`[] |

##### Returns

`Promise`<`Promise`<`void`\>\>

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cancel` | (`reason?`: `any`) => `void` |

#### Defined in

[src/lib/session.ts:153](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L153)

## Methods

### backReceiver

▸ **backReceiver**(`receiver`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `receiver` | [`IStreamReceiver`](../interfaces/IStreamReceiver.md) |

#### Returns

`void`

#### Defined in

[src/lib/session.ts:133](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L133)

___

### connect

▸ **connect**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/session.ts:48](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L48)

___

### createConsumer

▸ **createConsumer**(`remote`): [`StreamConsumer`](StreamConsumer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `remote` | [`StreamRemote`](StreamRemote.md) |

#### Returns

[`StreamConsumer`](StreamConsumer.md)

#### Defined in

[src/lib/session.ts:88](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L88)

___

### createPublisher

▸ **createPublisher**(`cfg`): [`StreamPublisher`](StreamPublisher.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cfg` | [`SenderConfig`](../README.md#senderconfig) |

#### Returns

[`StreamPublisher`](StreamPublisher.md)

#### Defined in

[src/lib/session.ts:84](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L84)

___

### createReceiver

▸ **createReceiver**(`kind`): [`StreamReceiver`](StreamReceiver.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | [`StreamKinds`](../enums/StreamKinds.md) |

#### Returns

[`StreamReceiver`](StreamReceiver.md)

#### Defined in

[src/lib/session.ts:105](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L105)

___

### createSender

▸ **createSender**(`cfg`): [`StreamSender`](StreamSender.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cfg` | [`SenderConfig`](../README.md#senderconfig) |

#### Returns

[`StreamSender`](StreamSender.md)

#### Defined in

[src/lib/session.ts:92](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L92)

___

### emit

▸ **emit**(`event`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | keyof [`ISessionCallbacks`](../interfaces/ISessionCallbacks.md) |
| `...args` | [stream: StreamRemote] \| [stream: StreamRemote] \| [stream: StreamRemote] \| [stream: StreamRemote] \| [stream: StreamRemote] \| [stream: StreamRemote] \| [state: RealtimeSocketState] \| [state: RealtimeSocketState] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.emit

#### Defined in

[src/lib/utils/typed-event-emitter.ts:11](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L11)

___

### getSender

▸ **getSender**(`name`, `kind`): [`IStreamSender`](../interfaces/IStreamSender.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `kind` | [`StreamKinds`](../enums/StreamKinds.md) |

#### Returns

[`IStreamSender`](../interfaces/IStreamSender.md)

#### Defined in

[src/lib/session.ts:142](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L142)

___

### listenerCount

▸ **listenerCount**<`TEvent`\>(`event`): `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`ISessionCallbacks`](../interfaces/ISessionCallbacks.md) |

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

▸ **listeners**<`TEvent`\>(`eventName`): `undefined` \| [`ISessionCallbacks`](../interfaces/ISessionCallbacks.md)[`TEvent`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`ISessionCallbacks`](../interfaces/ISessionCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `TEvent` |

#### Returns

`undefined` \| [`ISessionCallbacks`](../interfaces/ISessionCallbacks.md)[`TEvent`][]

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
| `TEvent` | extends keyof [`ISessionCallbacks`](../interfaces/ISessionCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`ISessionCallbacks`](../interfaces/ISessionCallbacks.md)[`TEvent`] |

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
| `TEvent` | extends keyof [`ISessionCallbacks`](../interfaces/ISessionCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`ISessionCallbacks`](../interfaces/ISessionCallbacks.md)[`TEvent`] |

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
| `TEvent` | extends keyof [`ISessionCallbacks`](../interfaces/ISessionCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | `TEvent`[] |
| `cb` | [`ISessionCallbacks`](../interfaces/ISessionCallbacks.md)[`TEvent`] |

#### Returns

() => `any`[]

#### Inherited from

TypedEventEmitter.onMany

#### Defined in

[src/lib/utils/typed-event-emitter.ts:26](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L26)

___

### onStreamEvent

▸ `Private` **onStreamEvent**(`event`, `params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `params` | `Object` |
| `params.kind` | [`StreamKinds`](../enums/StreamKinds.md) |
| `params.peer` | `string` |
| `params.peer_hash` | `string` |
| `params.state` | [`StreamRemoteState`](../interfaces/StreamRemoteState.md) |
| `params.stream` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/session.ts:172](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L172)

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
| `TEvent` | extends keyof [`ISessionCallbacks`](../interfaces/ISessionCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`ISessionCallbacks`](../interfaces/ISessionCallbacks.md)[`TEvent`] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.removeListener

#### Defined in

[src/lib/utils/typed-event-emitter.ts:33](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/utils/typed-event-emitter.ts#L33)

___

### takeReceiver

▸ **takeReceiver**(`kind`): [`IStreamReceiver`](../interfaces/IStreamReceiver.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | [`StreamKinds`](../enums/StreamKinds.md) |

#### Returns

[`IStreamReceiver`](../interfaces/IStreamReceiver.md)

#### Defined in

[src/lib/session.ts:121](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L121)

___

### updateSdp

▸ `Private` **updateSdp**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/session.ts:157](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/session.ts#L157)
