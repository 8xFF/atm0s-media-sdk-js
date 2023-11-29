async function onMyStreamAdded(stream) {
  if (stream.kind == 'video') {
    let element = document.getElementById('my_video');
    if (element.consumer) {
      await element.consumer.unview('main');
    }
    let consumer = window.bluesea_session.createConsumer(stream);
    element.srcObject = consumer.view('main');
    element.consumer = consumer;
  }
  // if (stream.kind == 'audio') {
  //   let element = document.getElementById('my_audio');
  //   if (element.consumer) {
  //     await element.consumer.unview('main');
  //   }
  //   let consumer = window.bluesea_session.createConsumer(stream);
  //   // element.srcObject = await consumer.view('main');
  //   // await consumer.view('main');
  //   element.consumer = consumer;
  // }
}

async function boot() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  let video_stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  let session = Atm0s.createSession([params['server']], {
    roomId: params['room'] || 'demo',
    peerId: params['peer'] || 'echo-client-' + new Date().getTime(),
    token: params['token'],
    codecs: ['OPUS', 'VP8', 'H264', 'VP9'],
    senders: [
      {
        stream: video_stream,
        name: 'video_main',
        kind: 'video',
        simulcast: true,
      },
      {
        stream: video_stream,
        name: 'audio_main',
        kind: 'audio',
      },
    ],
    receivers: {
      audio: 1,
      video: 1,
    },
  });
  window.bluesea_session = session;
  session.connect();
  session.on('mystream_added', onMyStreamAdded);
}

boot();
