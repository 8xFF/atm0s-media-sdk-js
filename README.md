# Atm0s Media JS SDK (for legacy version)

[![Continuous Integrations](https://github.com/8xFF/media-sdk-js/actions/workflows/continuous-integrations.yaml/badge.svg?branch=main)](https://github.com/8xFF/media-sdk-js/actions/workflows/continuous-integrations.yaml)

JS SDK for interacting with Atm0s Media Server (This SDK is still in Alpha).

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install @8xff/atm0s-media-js@alpha --save

# For Yarn, use the command below.
yarn add @8xff/atm0s-media-js@alpha
```

### Installation from CDN

This module has an UMD bundle available through JSDelivr and Unpkg CDNs.

```html
<!-- For UNPKG use the code below. -->
<script src="https://unpkg.com/@8xff/atm0s-media-js@alpha"></script>

<!-- For JSDelivr use the code below. -->
<script src="https://cdn.jsdelivr.net/npm/@8xff/atm0s-media-js"></script>

<script>
  // UMD module is exposed through the "Atm0s" global variable.
  console.log(Atm0s);
</script>
```

## Documentation

### Usage

#### Connect to a Session

```
import { createSession } from "@8xff/atm0s-media-js";

const url = "<YOUR SERVER URL>";
const token = "<YOUR SERVER TOKEN IF NEEDED>";

// This can be any MediaStream
const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
});

const session = createSession(url, {
  roomId: "Echo Room",
  peerId: "echo-client",
  token,
  // You can optionally initialize the session with senders and receivers so we won't have to keep
  // updating SDP every time we create a new senders and receivers
  senders: [
    { stream: stream, name: "audio_main", kind: "audio" },
    {
      stream: stream,
      name: "video_main",
      kind: "video",
      // Optionally, you can add simulcast
      simulcast: true,
    },
  ],
  receivers: {
    audio: 1,
    video: 1,
  },
});

// This will connect to the server and send the initialized MediaStream from above 
session.connect();
```

#### Consume the stream
By issued stream name
```
const consumer = session.createConsumerPair(peerId, "audio_main", "video_main");

```

Or listen to stream events:
```
// Note: In this specific case, we only have our own stream, so only `mystream_added` is triggered.
// In the case of listening for an external stream, use `stream_added` instead
session.on("mystream_added", (stream) => {
  // The audio stream and video stream added events will be triggered separately

  if (stream.kind === "video") {
    const consumer = session.createConsumer(stream);
    const stream = consumer.view();
    // Do something with stream ...
  }

  if (stream.kind === "audio") {
    const consumer = session.createConsumer(stream);
    const stream = consumer.view();
    // Do something with stream ...
  }
});
```

You can find more details about the SDK Documentation [here](https://8xff.github.io/media-docs/).

## License

Released under [MIT License](./LICENSE).
