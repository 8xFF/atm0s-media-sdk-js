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

[lib/interfaces/rpc.ts:29](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/rpc.ts#L29)

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

[lib/interfaces/rpc.ts:23](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/rpc.ts#L23)

___

### request

▸ **request**<`DataType`, `ResponseType`\>(`cmd`, `data`): `Promise`<`ResponseType`\>

Sends an RPC request with the specified command and data.

#### Type parameters

| Name |
| :------ |
| `DataType` |
| `ResponseType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to be executed. |
| `data` | `DataType` | The data to be sent with the request. |

#### Returns

`Promise`<`ResponseType`\>

A promise that resolves to the response from the RPC server.

#### Defined in

[lib/interfaces/rpc.ts:13](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/rpc.ts#L13)
