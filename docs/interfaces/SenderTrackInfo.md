[Atm0s JS SDK](../README.md) / SenderTrackInfo

# Interface: SenderTrackInfo

Configuration options for a sender.

## Hierarchy

- [`SenderConfig`](../README.md#senderconfig)

  ↳ **`SenderTrackInfo`**

## Table of contents

### Properties

- [contentHint](SenderTrackInfo.md#contenthint)
- [kind](SenderTrackInfo.md#kind)
- [label](SenderTrackInfo.md#label)
- [maxBitrate](SenderTrackInfo.md#maxbitrate)
- [name](SenderTrackInfo.md#name)
- [preferredCodecs](SenderTrackInfo.md#preferredcodecs)
- [screen](SenderTrackInfo.md#screen)
- [simulcast](SenderTrackInfo.md#simulcast)
- [stream](SenderTrackInfo.md#stream)

## Properties

### contentHint

• `Optional` **contentHint**: [`ContentHint`](../enums/ContentHint.md)

The content hint of the sender.

#### Inherited from

SenderConfig.contentHint

#### Defined in

[src/lib/interfaces/sender.ts:88](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/sender.ts#L88)

___

### kind

• **kind**: [`StreamKinds`](../enums/StreamKinds.md)

The kind of the sender. This can be either 'video' or 'audio'.

#### Inherited from

SenderConfig.kind

#### Defined in

[src/lib/interfaces/sender.ts:58](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/sender.ts#L58)

___

### label

• **label**: `string`

#### Defined in

[src/lib/interfaces/tracks.ts:10](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/tracks.ts#L10)

___

### maxBitrate

• `Optional` **maxBitrate**: `number`

The maximum bitrate of the sender.

**`Default`**

```ts
0
```

#### Inherited from

SenderConfig.maxBitrate

#### Defined in

[src/lib/interfaces/sender.ts:83](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/sender.ts#L83)

___

### name

• **name**: `string`

The name of the sender.

**`Remarks`**

This name must be unique within the session.

**`Example`**

```ts
'video_main'
```

#### Inherited from

SenderConfig.name

#### Defined in

[src/lib/interfaces/sender.ts:53](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/sender.ts#L53)

___

### preferredCodecs

• `Optional` **preferredCodecs**: [`Codecs`](../enums/Codecs.md)[]

The preferred codecs of the sender.
This will be used to determine the order of the codecs in the SDP.

**`Example`**

```ts
['VP8', 'H264']
```

#### Inherited from

SenderConfig.preferredCodecs

#### Defined in

[src/lib/interfaces/sender.ts:71](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/sender.ts#L71)

___

### screen

• `Optional` **screen**: `boolean`

Whether the sender is a screen share.

**`Default`**

```ts
false
```

#### Inherited from

SenderConfig.screen

#### Defined in

[src/lib/interfaces/sender.ts:94](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/sender.ts#L94)

___

### simulcast

• `Optional` **simulcast**: `boolean`

Whether the sender should be simulcasted.

**`Default`**

```ts
false
```

#### Inherited from

SenderConfig.simulcast

#### Defined in

[src/lib/interfaces/sender.ts:77](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/sender.ts#L77)

___

### stream

• `Optional` **stream**: ``null`` \| `MediaStream`

The stream of the sender.

#### Inherited from

SenderConfig.stream

#### Defined in

[src/lib/interfaces/sender.ts:63](https://github.com/8xFF/media-sdk-js/blob/42072f0/src/lib/interfaces/sender.ts#L63)
