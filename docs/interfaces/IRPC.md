[Atm0s JS SDK](../README.md) / IRPC

# Interface: IRPC

Represents an interface for a RPC (Remote Procedure Call) Handler.

## Implemented by

- [`RPC`](../classes/RPC.md)

## Table of contents

### Methods

- [off](IRPC.md#off)
- [on](IRPC.md#on)
- [request](IRPC.md#request)

## Methods

### off

▸ **off**(`cmd`): `void`

Unregisters the event handler for the specified command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to stop listening for. |

#### Returns

`void`

#### Defined in

[src/lib/interfaces/rpc.ts:30](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/rpc.ts#L30)

___

### on

▸ **on**(`cmd`, `handler`): `void`

Registers an event handler for the specified command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to listen for. |
| `handler` | [`AnyFunction`](../README.md#anyfunction) | The event handler function. |

#### Returns

`void`

#### Defined in

[src/lib/interfaces/rpc.ts:24](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/rpc.ts#L24)

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
| `data` | [`OfferMeta`](../README.md#offermeta) \| { `id`: `string` ; `max_spatial`: `number` ; `max_temporal`: `number` ; `priority`: `number`  } \| { `id`: `string` ; `priority`: `number` ; `remote`: { `peer`: `string` ; `stream`: `string`  }  } \| { `id`: `string`  } \| { `kind`: [`StreamKinds`](../enums/StreamKinds.md) ; `name`: `string` ; `track`: `string`  } | The data to be sent with the request. |

#### Returns

`Promise`<[`RpcResponse`](../README.md#rpcresponse)<`T`\>\>

A promise that resolves to the response from the RPC server.

#### Defined in

[src/lib/interfaces/rpc.ts:14](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/rpc.ts#L14)
