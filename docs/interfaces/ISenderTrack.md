[Atm0s JS SDK](../README.md) / ISenderTrack

# Interface: ISenderTrack

## Table of contents

### Properties

- [info](ISenderTrack.md#info)
- [stream](ISenderTrack.md#stream)
- [trackId](ISenderTrack.md#trackid)
- [transceiver](ISenderTrack.md#transceiver)
- [uuid](ISenderTrack.md#uuid)

### Methods

- [getTrack](ISenderTrack.md#gettrack)
- [pause](ISenderTrack.md#pause)
- [replaceStream](ISenderTrack.md#replacestream)
- [stop](ISenderTrack.md#stop)

## Properties

### info

• **info**: [`SenderTrackInfo`](SenderTrackInfo.md)

#### Defined in

[src/lib/interfaces/tracks.ts:15](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L15)

___

### stream

• **stream**: ``null`` \| `MediaStream`

#### Defined in

[src/lib/interfaces/tracks.ts:17](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L17)

___

### trackId

• **trackId**: `undefined` \| `string`

#### Defined in

[src/lib/interfaces/tracks.ts:18](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L18)

___

### transceiver

• `Optional` **transceiver**: `RTCRtpTransceiver`

#### Defined in

[src/lib/interfaces/tracks.ts:16](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L16)

___

### uuid

• **uuid**: `string`

#### Defined in

[src/lib/interfaces/tracks.ts:14](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L14)

## Methods

### getTrack

▸ **getTrack**(): `undefined` \| ``null`` \| `MediaStreamTrack`

#### Returns

`undefined` \| ``null`` \| `MediaStreamTrack`

#### Defined in

[src/lib/interfaces/tracks.ts:20](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L20)

___

### pause

▸ **pause**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/interfaces/tracks.ts:22](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L22)

___

### replaceStream

▸ **replaceStream**(`stream`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ``null`` \| `MediaStream` |

#### Returns

`void`

#### Defined in

[src/lib/interfaces/tracks.ts:19](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L19)

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/interfaces/tracks.ts:21](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L21)
