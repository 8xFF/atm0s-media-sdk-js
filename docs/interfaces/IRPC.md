[Atm0s JS SDK](../README.md) / IRPC

# Interface: IRPC

Represents an interface for a RPC (Remote Procedure Call) Handler.

## Implemented by

- [`RPC`](../classes/RPC.md)

## Table of contents

### Methods

- [off](IRPC.md#off)
- [offAllListeners](IRPC.md#offalllisteners)
- [on](IRPC.md#on)
- [request](IRPC.md#request)

## Methods

### off

▸ **off**(`cmd`, `handler`): `void`

Unregisters the event handler for the specified command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to stop listening for. |
| `handler` | [`AnyFunction`](../README.md#anyfunction) | - |

#### Returns

`void`

#### Defined in

[src/lib/interfaces/rpc.ts:31](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/rpc.ts#L31)

___

### offAllListeners

▸ **offAllListeners**(`cmd`): `void`

Unregisters all event handlers for the specified command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to stop listening for. |

#### Returns

`void`

#### Defined in

[src/lib/interfaces/rpc.ts:37](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/rpc.ts#L37)

___

### on

▸ **on**(`cmd`, `handler`): `void`

Registers an event handler for the specified command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to listen for. |
| `handler` | (`event`: `string`, `data`: `any`) => `void` | The event handler function. |

#### Returns

`void`

#### Defined in

[src/lib/interfaces/rpc.ts:25](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/rpc.ts#L25)

___

### request

▸ **request**<`T`\>(`cmd`, `data`): `Promise`<[`RpcResponse`](../README.md#rpcresponse)<`T`\>\>

Sends an RPC request with the specified command and data.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | keyof [`RpcRequests`](../README.md#rpcrequests) | The command to be executed. |
| `data` | [`OfferMeta`](../README.md#offermeta) \| { `id`: `string` ; `max_spatial`: `number` ; `max_temporal`: `number` ; `priority`: `number`  } \| { `id`: `string` ; `priority`: `number` ; `remote`: { `peer`: `string` ; `stream`: `string`  }  } \| { `id`: `string`  } \| { `kind`: [`StreamKinds`](../enums/StreamKinds.md) ; `name`: `string` ; `track`: `undefined` \| ``null`` \| `string`  } | The data to be sent with the request. |

#### Returns

`Promise`<[`RpcResponse`](../README.md#rpcresponse)<`T`\>\>

A promise that resolves to the response from the RPC server.

#### Defined in

[src/lib/interfaces/rpc.ts:15](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/rpc.ts#L15)
