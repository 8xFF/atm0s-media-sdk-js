[Atm0s JS SDK](../README.md) / RPC

# Class: RPC

Represents an interface for a RPC (Remote Procedure Call) Handler.

## Implements

- [`IRPC`](../interfaces/IRPC.md)

## Table of contents

### Constructors

- [constructor](RPC.md#constructor)

### Properties

- [\_handlers](RPC.md#_handlers)
- [\_msgDecoder](RPC.md#_msgdecoder)
- [\_reqSeed](RPC.md#_reqseed)
- [\_reqs](RPC.md#_reqs)
- [\_socket](RPC.md#_socket)
- [connected](RPC.md#connected)
- [logger](RPC.md#logger)

### Methods

- [\_onReceiveMessage](RPC.md#_onreceivemessage)
- [\_prereceiveMessage](RPC.md#_prereceivemessage)
- [off](RPC.md#off)
- [on](RPC.md#on)
- [request](RPC.md#request)

## Constructors

### constructor

• **new RPC**(`_socket`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_socket` | [`IRealtimeSocket`](../interfaces/IRealtimeSocket.md) |

#### Defined in

[src/lib/core/rpc.ts:43](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/core/rpc.ts#L43)

## Properties

### \_handlers

• `Private` **\_handlers**: `Map`<`string`, [`AnyFunction`](../README.md#anyfunction)\>

#### Defined in

[src/lib/core/rpc.ts:38](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/core/rpc.ts#L38)

___

### \_msgDecoder

• `Private` **\_msgDecoder**: `TextDecoder`

#### Defined in

[src/lib/core/rpc.ts:36](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/core/rpc.ts#L36)

___

### \_reqSeed

• `Private` **\_reqSeed**: `number` = `0`

#### Defined in

[src/lib/core/rpc.ts:35](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/core/rpc.ts#L35)

___

### \_reqs

• `Private` **\_reqs**: `Map`<`number`, `RpcRequest`\>

#### Defined in

[src/lib/core/rpc.ts:39](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/core/rpc.ts#L39)

___

### \_socket

• `Private` **\_socket**: [`IRealtimeSocket`](../interfaces/IRealtimeSocket.md)

#### Defined in

[src/lib/core/rpc.ts:43](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/core/rpc.ts#L43)

___

### connected

• **connected**: `boolean` = `false`

#### Defined in

[src/lib/core/rpc.ts:41](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/core/rpc.ts#L41)

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

[src/lib/core/rpc.ts:37](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/core/rpc.ts#L37)

## Methods

### \_onReceiveMessage

▸ `Private` **_onReceiveMessage**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/core/rpc.ts:72](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/core/rpc.ts#L72)

___

### \_prereceiveMessage

▸ `Private` **_prereceiveMessage**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/core/rpc.ts:52](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/core/rpc.ts#L52)

___

### off

▸ **off**(`cmd`): `void`

Unregisters the event handler for the specified command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to stop listening for. |

#### Returns

`void`

#### Implementation of

[IRPC](../interfaces/IRPC.md).[off](../interfaces/IRPC.md#off)

#### Defined in

[src/lib/core/rpc.ts:135](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/core/rpc.ts#L135)

___

### on

▸ **on**(`cmd`, `handler`): `void`

Registers an event handler for the specified command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to listen for. |
| `handler` | (`data`: `any`) => `void` | The event handler function. |

#### Returns

`void`

#### Implementation of

[IRPC](../interfaces/IRPC.md).[on](../interfaces/IRPC.md#on)

#### Defined in

[src/lib/core/rpc.ts:131](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/core/rpc.ts#L131)

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

#### Implementation of

[IRPC](../interfaces/IRPC.md).[request](../interfaces/IRPC.md#request)

#### Defined in

[src/lib/core/rpc.ts:110](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/core/rpc.ts#L110)
