[Atm0s JS SDK](../README.md) / IRealtimeSocket

# Interface: IRealtimeSocket

Represents a real-time socket used for communication with a media gateway.

## Hierarchy

- `TypedEventEmitter`<[`IRealtimeSocketCallbacks`](IRealtimeSocketCallbacks.md)\>

  ↳ **`IRealtimeSocket`**

## Implemented by

- [`RealtimeSocket`](../classes/RealtimeSocket.md)

## Table of contents

### Methods

- [close](IRealtimeSocket.md#close)
- [connect](IRealtimeSocket.md#connect)
- [createReceiverTrack](IRealtimeSocket.md#createreceivertrack)
- [createSenderTrack](IRealtimeSocket.md#createsendertrack)
- [emit](IRealtimeSocket.md#emit)
- [generateOffer](IRealtimeSocket.md#generateoffer)
- [listenerCount](IRealtimeSocket.md#listenercount)
- [listeners](IRealtimeSocket.md#listeners)
- [off](IRealtimeSocket.md#off)
- [offAllListeners](IRealtimeSocket.md#offalllisteners)
- [on](IRealtimeSocket.md#on)
- [onMany](IRealtimeSocket.md#onmany)
- [removeAllListeners](IRealtimeSocket.md#removealllisteners)
- [removeListener](IRealtimeSocket.md#removelistener)
- [send](IRealtimeSocket.md#send)
- [updateSdp](IRealtimeSocket.md#updatesdp)

## Methods

### close

▸ **close**(): `void`

Closes the socket.

#### Returns

`void`

#### Defined in

[lib/interfaces/rtsocket.ts:85](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/rtsocket.ts#L85)

___

### connect

▸ **connect**(`connector`, `config`): `Promise`<`void`\>

Connects the socket to the media gateway using the provided connector and session configuration.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `connector` | [`IMediaGatewayConnector`](IMediaGatewayConnector.md) | The media gateway connector. |
| `config` | [`ISessionConfig`](ISessionConfig.md) | The session configuration. |

#### Returns

`Promise`<`void`\>

A promise that resolves when the connection is established.

#### Defined in

[lib/interfaces/rtsocket.ts:25](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/rtsocket.ts#L25)

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

#### Defined in

[lib/interfaces/rtsocket.ts:36](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/rtsocket.ts#L36)

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

#### Defined in

[lib/interfaces/rtsocket.ts:43](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/rtsocket.ts#L43)

___

### emit

▸ **emit**(`event`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | keyof [`IRealtimeSocketCallbacks`](IRealtimeSocketCallbacks.md) |
| `...args` | [data: unknown] \| [state: RealtimeSocketState] \| [state: RealtimeSocketState] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.emit

#### Defined in

[lib/utils/typed-event-emitter.ts:11](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/utils/typed-event-emitter.ts#L11)

___

### generateOffer

▸ **generateOffer**(): `Promise`<{ `meta`: { `receivers`: { `audio`: `number` ; `video`: `number`  } ; `sdp`: `string` ; `senders`: { `kind`: [`StreamKinds`](../enums/StreamKinds.md) ; `label`: `string` ; `screen?`: `boolean` ; `uuid`: `string`  }[]  } ; `offer`: `RTCSessionDescriptionInit`  }\>

Generates an offer for establishing a connection with the media gateway.

#### Returns

`Promise`<{ `meta`: { `receivers`: { `audio`: `number` ; `video`: `number`  } ; `sdp`: `string` ; `senders`: { `kind`: [`StreamKinds`](../enums/StreamKinds.md) ; `label`: `string` ; `screen?`: `boolean` ; `uuid`: `string`  }[]  } ; `offer`: `RTCSessionDescriptionInit`  }\>

A promise that resolves with the generated offer and metadata.

#### Defined in

[lib/interfaces/rtsocket.ts:49](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/rtsocket.ts#L49)

___

### listenerCount

▸ **listenerCount**<`TEvent`\>(`event`): `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IRealtimeSocketCallbacks`](IRealtimeSocketCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |

#### Returns

`number`

#### Inherited from

TypedEventEmitter.listenerCount

#### Defined in

[lib/utils/typed-event-emitter.ts:58](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/utils/typed-event-emitter.ts#L58)

___

### listeners

▸ **listeners**<`TEvent`\>(`eventName`): `undefined` \| [`IRealtimeSocketCallbacks`](IRealtimeSocketCallbacks.md)[`TEvent`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends keyof [`IRealtimeSocketCallbacks`](IRealtimeSocketCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `TEvent` |

#### Returns

`undefined` \| [`IRealtimeSocketCallbacks`](IRealtimeSocketCallbacks.md)[`TEvent`][]

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
| `TEvent` | extends keyof [`IRealtimeSocketCallbacks`](IRealtimeSocketCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IRealtimeSocketCallbacks`](IRealtimeSocketCallbacks.md)[`TEvent`] |

#### Returns

`void`

#### Inherited from

TypedEventEmitter.off

#### Defined in

[lib/utils/typed-event-emitter.ts:40](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/utils/typed-event-emitter.ts#L40)

___

### offAllListeners

▸ **offAllListeners**(): `void`

#### Returns

`void`

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
| `TEvent` | extends keyof [`IRealtimeSocketCallbacks`](IRealtimeSocketCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IRealtimeSocketCallbacks`](IRealtimeSocketCallbacks.md)[`TEvent`] |

#### Returns

`fn`

▸ (): `any`

##### Returns

`any`

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
| `TEvent` | extends keyof [`IRealtimeSocketCallbacks`](IRealtimeSocketCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | `TEvent`[] |
| `cb` | [`IRealtimeSocketCallbacks`](IRealtimeSocketCallbacks.md)[`TEvent`] |

#### Returns

() => `any`[]

#### Inherited from

TypedEventEmitter.onMany

#### Defined in

[lib/utils/typed-event-emitter.ts:26](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/utils/typed-event-emitter.ts#L26)

___

### removeAllListeners

▸ **removeAllListeners**(): `void`

#### Returns

`void`

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
| `TEvent` | extends keyof [`IRealtimeSocketCallbacks`](IRealtimeSocketCallbacks.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `cb` | [`IRealtimeSocketCallbacks`](IRealtimeSocketCallbacks.md)[`TEvent`] |

#### Returns

`void`

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
| `data` | `string` \| `Uint8Array` | The data to send. |

#### Returns

`void`

#### Defined in

[lib/interfaces/rtsocket.ts:80](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/rtsocket.ts#L80)

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

#### Defined in

[lib/interfaces/rtsocket.ts:71](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/rtsocket.ts#L71)
