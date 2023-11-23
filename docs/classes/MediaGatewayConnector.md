[Atm0s JS SDK](../README.md) / MediaGatewayConnector

# Class: MediaGatewayConnector

Represents a media server gateway connector.

## Implements

- [`IMediaGatewayConnector`](../interfaces/IMediaGatewayConnector.md)

## Table of contents

### Constructors

- [constructor](MediaGatewayConnector.md#constructor)

### Properties

- [\_url](MediaGatewayConnector.md#_url)
- [logger](MediaGatewayConnector.md#logger)

### Accessors

- [url](MediaGatewayConnector.md#url)

### Methods

- [connect](MediaGatewayConnector.md#connect)
- [iceCandidate](MediaGatewayConnector.md#icecandidate)
- [selectFromUrls](MediaGatewayConnector.md#selectfromurls)

## Constructors

### constructor

• **new MediaGatewayConnector**(`_url?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_url?` | `string` |

#### Defined in

[lib/core/gateway.ts:12](https://github.com/8xFF/media-sdk-js/blob/d289714/src/lib/core/gateway.ts#L12)

## Properties

### \_url

• `Private` `Optional` **\_url**: `string`

#### Defined in

[lib/core/gateway.ts:12](https://github.com/8xFF/media-sdk-js/blob/d289714/src/lib/core/gateway.ts#L12)

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

[lib/core/gateway.ts:10](https://github.com/8xFF/media-sdk-js/blob/d289714/src/lib/core/gateway.ts#L10)

## Accessors

### url

• `get` **url**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[lib/core/gateway.ts:14](https://github.com/8xFF/media-sdk-js/blob/d289714/src/lib/core/gateway.ts#L14)

## Methods

### connect

▸ **connect**(`url`, `config`): `Promise`<[`IConnectResponse`](../interfaces/IConnectResponse.md)\>

Connects to the media server using the provided configuration.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the media server. |
| `config` | [`IConnectConfig`](../interfaces/IConnectConfig.md) | The connection configuration. |

#### Returns

`Promise`<[`IConnectResponse`](../interfaces/IConnectResponse.md)\>

#### Implementation of

[IMediaGatewayConnector](../interfaces/IMediaGatewayConnector.md).[connect](../interfaces/IMediaGatewayConnector.md#connect)

#### Defined in

[lib/core/gateway.ts:44](https://github.com/8xFF/media-sdk-js/blob/d289714/src/lib/core/gateway.ts#L44)

___

### iceCandidate

▸ **iceCandidate**(`url`, `nodeId`, `connId`, `ice`): `Promise`<`void`\>

Sends a ice candidate update to the media server.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the media server. |
| `nodeId` | `number` | The ID of the node. |
| `connId` | `string` | The ID of the connection. |
| `ice` | `RTCPeerConnectionIceEvent` | The ICE candidate event. |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IMediaGatewayConnector](../interfaces/IMediaGatewayConnector.md).[iceCandidate](../interfaces/IMediaGatewayConnector.md#icecandidate)

#### Defined in

[lib/core/gateway.ts:52](https://github.com/8xFF/media-sdk-js/blob/d289714/src/lib/core/gateway.ts#L52)

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

#### Implementation of

[IMediaGatewayConnector](../interfaces/IMediaGatewayConnector.md).[selectFromUrls](../interfaces/IMediaGatewayConnector.md#selectfromurls)

#### Defined in

[lib/core/gateway.ts:18](https://github.com/8xFF/media-sdk-js/blob/d289714/src/lib/core/gateway.ts#L18)
