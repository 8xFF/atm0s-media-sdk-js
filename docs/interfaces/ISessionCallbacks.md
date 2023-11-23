[Atm0s JS SDK](../README.md) / ISessionCallbacks

# Interface: ISessionCallbacks

Represents the callbacks for a session.

## Table of contents

### Properties

- [mystream\_added](ISessionCallbacks.md#mystream_added)
- [mystream\_removed](ISessionCallbacks.md#mystream_removed)
- [mystream\_updated](ISessionCallbacks.md#mystream_updated)
- [stream\_added](ISessionCallbacks.md#stream_added)
- [stream\_removed](ISessionCallbacks.md#stream_removed)
- [stream\_updated](ISessionCallbacks.md#stream_updated)

## Properties

### mystream\_added

• **mystream\_added**: (`stream`: [`StreamRemote`](../classes/StreamRemote.md)) => `void`

#### Type declaration

▸ (`stream`): `void`

Callback function triggered when my stream is added.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`StreamRemote`](../classes/StreamRemote.md) | The added my stream. |

##### Returns

`void`

#### Defined in

[src/lib/interfaces/session.ts:13](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L13)

___

### mystream\_removed

• **mystream\_removed**: (`stream`: [`StreamRemote`](../classes/StreamRemote.md)) => `void`

#### Type declaration

▸ (`stream`): `void`

Callback function triggered when my stream is removed.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`StreamRemote`](../classes/StreamRemote.md) | The removed my stream. |

##### Returns

`void`

#### Defined in

[src/lib/interfaces/session.ts:19](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L19)

___

### mystream\_updated

• **mystream\_updated**: (`stream`: [`StreamRemote`](../classes/StreamRemote.md)) => `void`

#### Type declaration

▸ (`stream`): `void`

Callback function triggered when my stream is updated.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`StreamRemote`](../classes/StreamRemote.md) | The updated my stream. |

##### Returns

`void`

#### Defined in

[src/lib/interfaces/session.ts:25](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L25)

___

### stream\_added

• **stream\_added**: (`stream`: [`StreamRemote`](../classes/StreamRemote.md)) => `void`

#### Type declaration

▸ (`stream`): `void`

Callback function triggered when a stream is added.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`StreamRemote`](../classes/StreamRemote.md) | The added stream. |

##### Returns

`void`

#### Defined in

[src/lib/interfaces/session.ts:31](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L31)

___

### stream\_removed

• **stream\_removed**: (`stream`: [`StreamRemote`](../classes/StreamRemote.md)) => `void`

#### Type declaration

▸ (`stream`): `void`

Callback function triggered when a stream is removed.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`StreamRemote`](../classes/StreamRemote.md) | The removed stream. |

##### Returns

`void`

#### Defined in

[src/lib/interfaces/session.ts:37](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L37)

___

### stream\_updated

• **stream\_updated**: (`stream`: [`StreamRemote`](../classes/StreamRemote.md)) => `void`

#### Type declaration

▸ (`stream`): `void`

Callback function triggered when a stream is updated.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`StreamRemote`](../classes/StreamRemote.md) | The updated stream. |

##### Returns

`void`

#### Defined in

[src/lib/interfaces/session.ts:43](https://github.com/8xFF/media-sdk-js/blob/e00c076/src/lib/interfaces/session.ts#L43)
