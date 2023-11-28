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

- [\_handleAnswer](RPC.md#_handleanswer)
- [\_handleEvent](RPC.md#_handleevent)
- [\_preprocess](RPC.md#_preprocess)
- [\_process](RPC.md#_process)
- [off](RPC.md#off)
- [offAllListeners](RPC.md#offalllisteners)
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

[src/lib/core/rpc.ts:48](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L48)

## Properties

### \_handlers

• `Private` **\_handlers**: `Map`<`string`, [`AnyFunction`](../README.md#anyfunction)[]\>

#### Defined in

[src/lib/core/rpc.ts:43](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L43)

___

### \_msgDecoder

• `Private` **\_msgDecoder**: `TextDecoder`

#### Defined in

[src/lib/core/rpc.ts:41](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L41)

___

### \_reqSeed

• `Private` **\_reqSeed**: `number` = `0`

#### Defined in

[src/lib/core/rpc.ts:40](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L40)

___

### \_reqs

• `Private` **\_reqs**: `Map`<`number`, `RpcRequest`\>

#### Defined in

[src/lib/core/rpc.ts:44](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L44)

___

### \_socket

• `Private` **\_socket**: [`IRealtimeSocket`](../interfaces/IRealtimeSocket.md)

#### Defined in

[src/lib/core/rpc.ts:48](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L48)

___

### connected

• **connected**: `boolean` = `false`

#### Defined in

[src/lib/core/rpc.ts:46](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L46)

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

[src/lib/core/rpc.ts:42](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L42)

## Methods

### \_handleAnswer

▸ `Private` **_handleAnswer**(`reqId`, `success`, `data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reqId` | `number` |
| `success` | `boolean` |
| `data` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/core/rpc.ts:84](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L84)

___

### \_handleEvent

▸ `Private` **_handleEvent**(`event`, `data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `data` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/core/rpc.ts:77](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L77)

___

### \_preprocess

▸ `Private` **_preprocess**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/core/rpc.ts:57](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L57)

___

### \_process

▸ `Private` **_process**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/core/rpc.ts:104](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L104)

___

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

#### Implementation of

[IRPC](../interfaces/IRPC.md).[off](../interfaces/IRPC.md#off)

#### Defined in

[src/lib/core/rpc.ts:147](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L147)

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

#### Implementation of

[IRPC](../interfaces/IRPC.md).[offAllListeners](../interfaces/IRPC.md#offalllisteners)

#### Defined in

[src/lib/core/rpc.ts:154](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L154)

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

#### Implementation of

[IRPC](../interfaces/IRPC.md).[on](../interfaces/IRPC.md#on)

#### Defined in

[src/lib/core/rpc.ts:143](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L143)

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

#### Implementation of

[IRPC](../interfaces/IRPC.md).[request](../interfaces/IRPC.md#request)

#### Defined in

[src/lib/core/rpc.ts:131](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/core/rpc.ts#L131)
