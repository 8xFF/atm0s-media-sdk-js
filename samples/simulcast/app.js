async function onMyStreamAdded(stream) {
  console.log('added mystream:', stream);
  if (stream.kind == 'video') {
    let receiver = await window.atm0sSession.takeReceiver('video');
    let element = document.getElementById('my_video');
    element.srcObject = receiver.stream;
    element.receiver = receiver;
    receiver.switch(stream);
  }

  if (stream.kind == 'audio') {
    let receiver = window.atm0sSession.takeReceiver('audio');
    let element = document.getElementById('my_audio');
    element.srcObject = receiver.stream;
    receiver.switch(stream);
  }
}

async function boot() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  let video_stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
  let session = Atm0s.createSession(params['server'] || [''], {
    roomId: params['room'] || 'demo',
    peerId: params['peer'] || 'echo-client-' + new Date().getTime(),
    token: params['token'],
    senders: [{ stream: video_stream, name: 'video_main', kind: 'video', simulcast: true }],
    receivers: {
      audio: 1,
      video: 1,
    },
    logLevel: 5,
  });
  window.atm0sSession = session;
  session.connect();
  session.on('mystream_added', onMyStreamAdded);

  document.getElementById('quality').onchange = (event) => {
    let layers = event.target.value.split('-');
    let element = document.getElementById('my_video');
    element.receiver.limit(50, 0, 0, parseInt(layers[0]), parseInt(layers[1]));
  };
}

boot();
