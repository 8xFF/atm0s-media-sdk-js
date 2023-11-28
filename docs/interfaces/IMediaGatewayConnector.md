[Atm0s JS SDK](../README.md) / IMediaGatewayConnector

# Interface: IMediaGatewayConnector

Represents a media server gateway connector.

## Implemented by

- [`MediaGatewayConnector`](../classes/MediaGatewayConnector.md)

## Table of contents

### Methods

- [connect](IMediaGatewayConnector.md#connect)
- [iceCandidate](IMediaGatewayConnector.md#icecandidate)
- [selectFromUrls](IMediaGatewayConnector.md#selectfromurls)

## Methods

### connect

▸ **connect**(`url`, `config`): `Promise`<[`IConnectResponse`](IConnectResponse.md)\>

Connects to the media server using the provided configuration.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the media server. |
| `config` | [`IConnectConfig`](IConnectConfig.md) | The connection configuration. |

#### Returns

`Promise`<[`IConnectResponse`](IConnectResponse.md)\>

#### Defined in

[src/lib/interfaces/gateway.ts:49](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/gateway.ts#L49)

___

### iceCandidate

▸ **iceCandidate**(`url`, `nodeId`, `connId`, `ice`): `void`

Sends a ice candidate update to the media server.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the media server. |
| `nodeId` | `number` | The ID of the node. |
| `connId` | `string` | The ID of the connection. |
| `ice` | `RTCPeerConnectionIceEvent` | The ICE candidate event. |

#### Returns

`void`

#### Defined in

[src/lib/interfaces/gateway.ts:58](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/gateway.ts#L58)

___

### selectFromUrls

▸ **selectFromUrls**(`urls`): `Promise`<`string`\>

Selects a media stream from the given URLs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urls` | `string` \| `string`[] | The URLs of the media streams. |

#### Returns

`Promise`<`string`\>

A promise that resolves to the selected media stream.

#### Defined in

[src/lib/interfaces/gateway.ts:42](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/gateway.ts#L42)
