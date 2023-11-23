Atm0s JS SDK

# Atm0s JS SDK

## Table of contents

### Enumerations

- [BitrateControlMode](enums/BitrateControlMode.md)
- [Codecs](enums/Codecs.md)
- [ContentHint](enums/ContentHint.md)
- [LatencyMode](enums/LatencyMode.md)
- [MixMinusMode](enums/MixMinusMode.md)
- [RealtimeSocketState](enums/RealtimeSocketState.md)
- [StreamKinds](enums/StreamKinds.md)
- [StreamReceiverState](enums/StreamReceiverState.md)
- [StreamRemoteEvent](enums/StreamRemoteEvent.md)
- [StreamRemoteScalingType](enums/StreamRemoteScalingType.md)
- [StreamRemoteStatus](enums/StreamRemoteStatus.md)
- [StreamSenderState](enums/StreamSenderState.md)

### Classes

- [MediaGatewayConnector](classes/MediaGatewayConnector.md)
- [RPC](classes/RPC.md)
- [RealtimeSocket](classes/RealtimeSocket.md)
- [Session](classes/Session.md)
- [StreamConsumer](classes/StreamConsumer.md)
- [StreamPublisher](classes/StreamPublisher.md)
- [StreamReceiver](classes/StreamReceiver.md)
- [StreamRemote](classes/StreamRemote.md)
- [StreamSender](classes/StreamSender.md)

### Interfaces

- [IConnectConfig](interfaces/IConnectConfig.md)
- [IConnectResponse](interfaces/IConnectResponse.md)
- [IMediaGatewayConnector](interfaces/IMediaGatewayConnector.md)
- [IRPC](interfaces/IRPC.md)
- [IRealtimeSocket](interfaces/IRealtimeSocket.md)
- [IRealtimeSocketCallbacks](interfaces/IRealtimeSocketCallbacks.md)
- [IRealtimeSocketOptions](interfaces/IRealtimeSocketOptions.md)
- [IReceiverTrackCallbacks](interfaces/IReceiverTrackCallbacks.md)
- [ISessionCallbacks](interfaces/ISessionCallbacks.md)
- [ISessionConfig](interfaces/ISessionConfig.md)
- [IStreamReceiver](interfaces/IStreamReceiver.md)
- [IStreamReceiverCallbacks](interfaces/IStreamReceiverCallbacks.md)
- [IStreamRemoteCallbacks](interfaces/IStreamRemoteCallbacks.md)
- [IStreamSender](interfaces/IStreamSender.md)
- [IStreamSenderCallbacks](interfaces/IStreamSenderCallbacks.md)
- [SenderTrackInfo](interfaces/SenderTrackInfo.md)
- [StreamRemoteState](interfaces/StreamRemoteState.md)

### Type Aliases

- [AnyFunction](README.md#anyfunction)
- [OfferMeta](README.md#offermeta)
- [ReceiverInfo](README.md#receiverinfo)
- [RpcRequests](README.md#rpcrequests)
- [RpcResponse](README.md#rpcresponse)
- [SenderConfig](README.md#senderconfig)

### Variables

- [LatencyMode2DelayHint](README.md#latencymode2delayhint)
- [LatencyMode2MaxPackets](README.md#latencymode2maxpackets)

### Functions

- [createSession](README.md#createsession)

## Type Aliases

### AnyFunction

Ƭ **AnyFunction**: (...`args`: `any`[]) => `any`

#### Type declaration

▸ (`...args`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`any`

#### Defined in

[src/lib/utils/types.ts:20](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/types.ts#L20)

___

### OfferMeta

Ƭ **OfferMeta**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receivers` | { `audio`: `number` ; `video`: `number`  } |
| `receivers.audio` | `number` |
| `receivers.video` | `number` |
| `sdp` | `string` |
| `senders` | { `kind`: [`StreamKinds`](enums/StreamKinds.md) ; `label`: `string` ; `screen?`: `boolean` ; `uuid`: `string`  }[] |

#### Defined in

[src/lib/interfaces/rtsocket.ts:14](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/rtsocket.ts#L14)

___

### ReceiverInfo

Ƭ **ReceiverInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `codecs?` | [`Codecs`](enums/Codecs.md)[] |
| `kind` | [`StreamKinds`](enums/StreamKinds.md) |
| `latencyMode?` | [`LatencyMode`](enums/LatencyMode.md) |
| `remoteId` | `string` |

#### Defined in

[src/lib/interfaces/receiver.ts:59](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/receiver.ts#L59)

___

### RpcRequests

Ƭ **RpcRequests**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `peer.updateSdp` | [`OfferMeta`](README.md#offermeta) |
| `receiver.disconnect` | { `id`: `string`  } |
| `receiver.disconnect.id` | `string` |
| `receiver.limit` | { `id`: `string` ; `max_spatial`: `number` ; `max_temporal`: `number` ; `priority`: `number`  } |
| `receiver.limit.id` | `string` |
| `receiver.limit.max_spatial` | `number` |
| `receiver.limit.max_temporal` | `number` |
| `receiver.limit.priority` | `number` |
| `receiver.switch` | { `id`: `string` ; `priority`: `number` ; `remote`: { `peer`: `string` ; `stream`: `string`  }  } |
| `receiver.switch.id` | `string` |
| `receiver.switch.priority` | `number` |
| `receiver.switch.remote` | { `peer`: `string` ; `stream`: `string`  } |
| `receiver.switch.remote.peer` | `string` |
| `receiver.switch.remote.stream` | `string` |
| `sender.toggle` | { `kind`: [`StreamKinds`](enums/StreamKinds.md) ; `name`: `string` ; `track`: `string`  } |
| `sender.toggle.kind` | [`StreamKinds`](enums/StreamKinds.md) |
| `sender.toggle.name` | `string` |
| `sender.toggle.track` | `string` |

#### Defined in

[src/lib/interfaces/rpc.ts:39](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/rpc.ts#L39)

___

### RpcResponse

Ƭ **RpcResponse**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `T` |
| `error?` | `string` |
| `status` | `boolean` |

#### Defined in

[src/lib/interfaces/rpc.ts:33](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/rpc.ts#L33)

___

### SenderConfig

Ƭ **SenderConfig**: `Object`

Configuration options for a sender.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contentHint?` | [`ContentHint`](enums/ContentHint.md) | The content hint of the sender. |
| `kind` | [`StreamKinds`](enums/StreamKinds.md) | The kind of the sender. This can be either 'video' or 'audio'. |
| `maxBitrate?` | `number` | The maximum bitrate of the sender. **`Default`** ```ts 0 ``` |
| `name` | `string` | The name of the sender. **`Remarks`** This name must be unique within the session. **`Example`** ```ts 'video_main' ``` |
| `preferredCodecs?` | [`Codecs`](enums/Codecs.md)[] | The preferred codecs of the sender. This will be used to determine the order of the codecs in the SDP. **`Example`** ```ts ['VP8', 'H264'] ``` |
| `screen?` | `boolean` | Whether the sender is a screen share. **`Default`** ```ts false ``` |
| `simulcast?` | `boolean` | Whether the sender should be simulcasted. **`Default`** ```ts false ``` |
| `stream?` | `MediaStream` \| ``null`` | The stream of the sender. |

#### Defined in

[src/lib/interfaces/sender.ts:46](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/sender.ts#L46)

## Variables

### LatencyMode2DelayHint

• `Const` **LatencyMode2DelayHint**: `Object`

Mapping of latency modes to playout delay hints. Also for React Native WebRTC, maybe?

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `undefined` |
| `smooth-1000` | `number` |
| `smooth-200` | `number` |
| `smooth-2000` | `number` |
| `smooth-500` | `number` |
| `smooth-800` | `number` |
| `ultra-low` | `number` |

#### Defined in

[src/lib/utils/types.ts:61](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/types.ts#L61)

___

### LatencyMode2MaxPackets

• `Const` **LatencyMode2MaxPackets**: `Object`

Mapping of latency modes to maximum packets.
This is to configure Audio Jitter Buffer Max Packets for React Native WebRTC.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `undefined`[] |
| `smooth-1000` | `number`[] |
| `smooth-200` | `number`[] |
| `smooth-2000` | `number`[] |
| `smooth-500` | `number`[] |
| `smooth-800` | `number`[] |
| `ultra-low` | `number`[] |

#### Defined in

[src/lib/utils/types.ts:48](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/utils/types.ts#L48)

## Functions

### createSession

▸ **createSession**(`urls`, `cfg`): [`Session`](classes/Session.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `urls` | `string` \| `string`[] |
| `cfg` | [`ISessionConfig`](interfaces/ISessionConfig.md) |

#### Returns

[`Session`](classes/Session.md)

#### Defined in

[src/index.ts:13](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/index.ts#L13)
