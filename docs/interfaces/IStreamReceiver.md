[Atm0s JS SDK](../README.md) / IStreamReceiver

# Interface: IStreamReceiver

Represents a stream receiver.

## Table of contents

### Methods

- [limit](IStreamReceiver.md#limit)
- [stop](IStreamReceiver.md#stop)
- [switch](IStreamReceiver.md#switch)

## Methods

### limit

▸ **limit**(`priority`, `max_spatial`, `max_temporal`): `Promise`<`boolean`\>

Limits the stream with the specified priority to the given maximum spatial and temporal values.
`spatial` is a value indicating the definition clarity of the stream.
`temporal` is a value indicating the smoothness, or frame rate of the stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `priority` | `number` | The priority of the stream to limit. |
| `max_spatial` | `number` | The maximum spatial value. |
| `max_temporal` | `number` | The maximum temporal value. |

#### Returns

`Promise`<`boolean`\>

A promise that resolves to a boolean indicating whether the limit was successful.

#### Defined in

[lib/interfaces/receiver.ts:26](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/receiver.ts#L26)

___

### stop

▸ **stop**(): `Promise`<`boolean`\>

Stops the stream.

#### Returns

`Promise`<`boolean`\>

A promise that resolves to a boolean indicating whether the stop was successful.

#### Defined in

[lib/interfaces/receiver.ts:36](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/receiver.ts#L36)

___

### switch

▸ **switch**(`remote`, `priority?`): `Promise`<`boolean`\>

Switches to a remote stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `remote` | `StreamRemote` | The remote stream to switch to. |
| `priority?` | `number` | - |

#### Returns

`Promise`<`boolean`\>

A promise that resolves to a boolean indicating whether the switch was successful.

#### Defined in

[lib/interfaces/receiver.ts:14](https://github.com/8xFF/media-sdk-js/blob/633baca/src/lib/interfaces/receiver.ts#L14)
