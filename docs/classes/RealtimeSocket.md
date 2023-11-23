[Atm0s JS SDK](../README.md) / RealtimeSocket

# Class: RealtimeSocket

Represents a real-time socket used for communication with a media gateway.

## Hierarchy

- `TypedEventEmitter`<[`IRealtimeSocketCallbacks`](../interfaces/IRealtimeSocketCallbacks.md)\>

  ↳ **`RealtimeSocket`**

## Implements

- [`IRealtimeSocket`](../interfaces/IRealtimeSocket.md)

## Table of contents

### Constructors

- [constructor](RealtimeSocket.md#constructor)

### Properties

- [\_dc](RealtimeSocket.md#_dc)
- [\_dcState](RealtimeSocket.md#_dcstate)
- [\_lc](RealtimeSocket.md#_lc)
- [\_msg\_encoder](RealtimeSocket.md#_msg_encoder)
- [\_options](RealtimeSocket.md#_options)
- [\_pConnState](RealtimeSocket.md#_pconnstate)
- [\_recvStreams](RealtimeSocket.md#_recvstreams)
- [\_sendStreams](RealtimeSocket.md#_sendstreams)
- [\_urls](RealtimeSocket.md#_urls)
- [logger](RealtimeSocket.md#logger)

### Methods

- [close](RealtimeSocket.md#close)
- [connect](RealtimeSocket.md#connect)
- [createReceiverTrack](RealtimeSocket.md#createreceivertrack)
- [createSenderTrack](RealtimeSocket.md#createsendertrack)
- [emit](RealtimeSocket.md#emit)
- [generateOffer](RealtimeSocket.md#generateoffer)
- [listenerCount](RealtimeSocket.md#listenercount)
- [listeners](RealtimeSocket.md#listeners)
- [off](RealtimeSocket.md#off)
- [offAllListeners](RealtimeSocket.md#offalllisteners)
- [on](RealtimeSocket.md#on)
- [onMany](RealtimeSocket.md#onmany)
- [removeAllListeners](RealtimeSocket.md#removealllisteners)
- [removeListener](RealtimeSocket.md#removelistener)
- [send](RealtimeSocket.md#send)
- [setConnState](RealtimeSocket.md#setconnstate)
- [setDcState](RealtimeSocket.md#setdcstate)
- [updateSdp](RealtimeSocket.md#updatesdp)

## Constructors

### constructor

• **new RealtimeSocket**(`_urls`, `_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_urls` | `string` \| `string`[] |
| `_options?` | [`IRealtimeSocketOptions`](../interfaces/IRealtimeSocketOptions.md) |

#### Overrides

TypedEventEmitter&lt;IRealtimeSocketCallbacks\&gt;.constructor

#### Defined in

[lib/core/socket.ts:31](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L31)

## Properties

### \_dc

• `Private` **\_dc**: `RTCDataChannel`

#### Defined in

[lib/core/socket.ts:25](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L25)

___

### \_dcState

• `Private` **\_dcState**: [`RealtimeSocketState`](../enums/RealtimeSocketState.md) = `RealtimeSocketState.Created`

#### Defined in

[lib/core/socket.ts:23](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L23)

___

### \_lc

• `Private` **\_lc**: `RTCPeerConnection`

#### Defined in

[lib/core/socket.ts:24](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L24)

___

### \_msg\_encoder

• `Private` **\_msg\_encoder**: `TextEncoder`

#### Defined in

[lib/core/socket.ts:29](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L29)

___

### \_options

• `Private` `Optional` **\_options**: [`IRealtimeSocketOptions`](../interfaces/IRealtimeSocketOptions.md)

#### Defined in

[lib/core/socket.ts:33](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L33)

___

### \_pConnState

• `Private` **\_pConnState**: [`RealtimeSocketState`](../enums/RealtimeSocketState.md) = `RealtimeSocketState.Created`

#### Defined in

[lib/core/socket.ts:22](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L22)

___

### \_recvStreams

• `Private` **\_recvStreams**: `Map`<`string`, `ReceiverTrack`\>

#### Defined in

[lib/core/socket.ts:27](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L27)

___

### \_sendStreams

• `Private` **\_sendStreams**: `Map`<`string`, `SenderTrack`\>

#### Defined in

[lib/core/socket.ts:26](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L26)

___

### \_urls

• `Private` **\_urls**: `string` \| `string`[]

#### Defined in

[lib/core/socket.ts:32](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L32)

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

[lib/core/socket.ts:21](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L21)

## Methods

### close

▸ **close**(): `Promise`<`void`\>

Closes the socket.

#### Returns

`Promise`<`void`\>

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[close](../interfaces/IRealtimeSocket.md#close)

#### Defined in

[lib/core/socket.ts:265](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L265)

___

### connect

▸ **connect**(`connector`, `config`): `Promise`<`void`\>

Connects the socket to the media gateway using the provided connector and session configuration.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `connector` | [`IMediaGatewayConnector`](../interfaces/IMediaGatewayConnector.md) | The media gateway connector. |
| `config` | [`ISessionConfig`](../interfaces/ISessionConfig.md) | The session configuration. |

#### Returns

`Promise`<`void`\>

A promise that resolves when the connection is established.

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[connect](../interfaces/IRealtimeSocket.md#connect)

#### Defined in

[lib/core/socket.ts:110](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L110)

___

### createReceiverTrack

▸ **createReceiverTrack**(`id`, `kind`): `ReceiverTrack`

Creates a `ReceiverTrack` with the specified ID and kind.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the receiver track. |
| `kind` | [`StreamKinds`](../enums/StreamKinds.md) | The kind of the receiver track. |

#### Returns

`ReceiverTrack`

The created receiver track.

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[createReceiverTrack](../interfaces/IRealtimeSocket.md#createreceivertrack)

#### Defined in

[lib/core/socket.ts:186](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L186)

___

### createSenderTrack

▸ **createSenderTrack**(`cfg`): `SenderTrack`

Creates a `SenderTrack` with the specified configuration.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cfg` | [`SenderConfig`](../README.md#senderconfig) | The configuration of the sender track. |

#### Returns

`SenderTrack`

The created sender track.

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[createSenderTrack](../interfaces/IRealtimeSocket.md#createsendertrack)

#### Defined in

[lib/core/socket.ts:205](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L205)

___

### emit

▸ **emit**(`event`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | keyof [`IRealtimeSocketCallbacks`](../interfaces/IRealtimeSocketCallbacks.md) |
| `...args` | [data: unknown] \| [state: RealtimeSocketState] \| [state: RealtimeSocketState] |

#### Returns

`void`

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[emit](../interfaces/IRealtimeSocket.md#emit)

#### Inherited from

TypedEventEmitter.emit

#### Defined in

[lib/utils/typed-event-emitter.ts:11](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/utils/typed-event-emitter.ts#L11)

___

### generateOffer

▸ **generateOffer**(): `Promise`<{ `meta`: { `receivers`: { `audio`: `number` ; `video`: `number`  } ; `sdp`: `string` ; `senders`: { `kind`: [`StreamKinds`](../enums/StreamKinds.md) = s.info.kind; `label`: `string` = s.info.label; `screen`: `undefined` \| `boolean` = s.info.screen; `uuid`: `string` = s.uuid }[]  } ; `offer`: `RTCSessionDescriptionInit`  }\>

Generates an offer for establishing a connection with the media gateway.

#### Returns

`Promise`<{ `meta`: { `receivers`: { `audio`: `number` ; `video`: `number`  } ; `sdp`: `string` ; `senders`: { `kind`: [`StreamKinds`](../enums/StreamKinds.md) = s.info.kind; `label`: `string` = s.info.label; `screen`: `undefined` \| `boolean` = s.info.screen; `uuid`: `string` = s.uuid }[]  } ; `offer`: `RTCSessionDescriptionInit`  }\>

A promise that resolves with the generated offer and metadata.

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[generateOffer](../interfaces/IRealtimeSocket.md#generateoffer)

#### Defined in

[lib/core/socket.ts:219](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L219)

___

### listenerCount

▸ **listenerCount**<`TEvent`\>(`event`): `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IRealtimeSocketCallbacks`](../interfaces/IRealtimeSocketCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |

#### Returns

`number`

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[listenerCount](../interfaces/IRealtimeSocket.md#listenercount)

#### Inherited from

TypedEventEmitter.listenerCount

#### Defined in

[lib/utils/typed-event-emitter.ts:58](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/utils/typed-event-emitter.ts#L58)

___

### listeners

▸ **listeners**<`TEvent`\>(`eventName`): `undefined` \| [`IRealtimeSocketCallbacks`](../interfaces/IRealtimeSocketCallbacks.md)[`TEvent`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IRealtimeSocketCallbacks`](../interfaces/IRealtimeSocketCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `TEvent` |

#### Returns

`undefined` \| [`IRealtimeSocketCallbacks`](../interfaces/IRealtimeSocketCallbacks.md)[`TEvent`][]

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[listeners](../interfaces/IRealtimeSocket.md#listeners)

#### Inherited from

TypedEventEmitter.listeners

#### Defined in

[lib/utils/typed-event-emitter.ts:52](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/utils/typed-event-emitter.ts#L52)

___

### off

▸ **off**<`TEvent`\>(`event`, `cb`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IRealtimeSocketCallbacks`](../interfaces/IRealtimeSocketCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IRealtimeSocketCallbacks`](../interfaces/IRealtimeSocketCallbacks.md)[`TEvent`] |

#### Returns

`void`

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[off](../interfaces/IRealtimeSocket.md#off)

#### Inherited from

TypedEventEmitter.off

#### Defined in

[lib/utils/typed-event-emitter.ts:40](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/utils/typed-event-emitter.ts#L40)

___

### offAllListeners

▸ **offAllListeners**(): `void`

#### Returns

`void`

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[offAllListeners](../interfaces/IRealtimeSocket.md#offalllisteners)

#### Inherited from

TypedEventEmitter.offAllListeners

#### Defined in

[lib/utils/typed-event-emitter.ts:44](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/utils/typed-event-emitter.ts#L44)

___

### on

▸ **on**<`TEvent`\>(`event`, `cb`): () => `any`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IRealtimeSocketCallbacks`](../interfaces/IRealtimeSocketCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IRealtimeSocketCallbacks`](../interfaces/IRealtimeSocketCallbacks.md)[`TEvent`] |

#### Returns

`fn`

▸ (): `any`

##### Returns

`any`

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[on](../interfaces/IRealtimeSocket.md#on)

#### Inherited from

TypedEventEmitter.on

#### Defined in

[lib/utils/typed-event-emitter.ts:17](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/utils/typed-event-emitter.ts#L17)

___

### onMany

▸ **onMany**<`TEvent`\>(`events`, `cb`): () => `any`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IRealtimeSocketCallbacks`](../interfaces/IRealtimeSocketCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | `TEvent`[] |
| `cb` | [`IRealtimeSocketCallbacks`](../interfaces/IRealtimeSocketCallbacks.md)[`TEvent`] |

#### Returns

() => `any`[]

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[onMany](../interfaces/IRealtimeSocket.md#onmany)

#### Inherited from

TypedEventEmitter.onMany

#### Defined in

[lib/utils/typed-event-emitter.ts:26](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/utils/typed-event-emitter.ts#L26)

___

### removeAllListeners

▸ **removeAllListeners**(): `void`

#### Returns

`void`

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[removeAllListeners](../interfaces/IRealtimeSocket.md#removealllisteners)

#### Inherited from

TypedEventEmitter.removeAllListeners

#### Defined in

[lib/utils/typed-event-emitter.ts:48](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/utils/typed-event-emitter.ts#L48)

___

### removeListener

▸ **removeListener**<`TEvent`\>(`event`, `cb`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IRealtimeSocketCallbacks`](../interfaces/IRealtimeSocketCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IRealtimeSocketCallbacks`](../interfaces/IRealtimeSocketCallbacks.md)[`TEvent`] |

#### Returns

`void`

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[removeListener](../interfaces/IRealtimeSocket.md#removelistener)

#### Inherited from

TypedEventEmitter.removeListener

#### Defined in

[lib/utils/typed-event-emitter.ts:33](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/utils/typed-event-emitter.ts#L33)

___

### send

▸ **send**(`data`): `void`

Sends data over the socket.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` | The data to send. |

#### Returns

`void`

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[send](../interfaces/IRealtimeSocket.md#send)

#### Defined in

[lib/core/socket.ts:256](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L256)

___

### setConnState

▸ `Private` **setConnState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`RealtimeSocketState`](../enums/RealtimeSocketState.md) |

#### Returns

`void`

#### Defined in

[lib/core/socket.ts:170](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L170)

___

### setDcState

▸ `Private` **setDcState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`RealtimeSocketState`](../enums/RealtimeSocketState.md) |

#### Returns

`void`

#### Defined in

[lib/core/socket.ts:175](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L175)

___

### updateSdp

▸ **updateSdp**(`localOffer`, `remoteAnswerSdp`): `void`

Updates the SDP (Session Description Protocol) with the local offer and remote answer SDP.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localOffer` | `RTCSessionDescriptionInit` | The local offer SDP. |
| `remoteAnswerSdp` | `string` | The remote answer SDP. |

#### Returns

`void`

#### Implementation of

[IRealtimeSocket](../interfaces/IRealtimeSocket.md).[updateSdp](../interfaces/IRealtimeSocket.md#updatesdp)

#### Defined in

[lib/core/socket.ts:244](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/core/socket.ts#L244)
