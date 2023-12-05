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
    let receiver = await window.atm0sSession.takeReceiver('audio');
    let element = document.getElementById('my_audio');
    element.srcObject = receiver.stream;
    element.receiver = receiver;
    receiver.switch(stream);
  }
}

async function onMyStreamRemoved(stream) {
  console.log('removed mystream:', stream);
  if (stream.kind == 'video') {
    let element = document.getElementById('my_video');
    element.receiver.disconnect();
    window.atm0sSession.backReceiver(element.receiver);
    element.receiver = null;
    element.srcObject = null;
  }

  if (stream.kind == 'audio') {
    let element = document.getElementById('my_audio');
    element.receiver.disconnect();
    window.atm0sSession.backReceiver(element.receiver);
    element.receiver = null;
    element.srcObject = null;
  }
}

async function boot() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  let session = Atm0s.createSession(params['server'], {
    roomId: params['room'] || 'demo',
    peerId: params['peer'] || 'echo-client-' + new Date().getTime(),
    token: params['token'],
    senders: [
      // { stream: audio_stream, name: 'audio_main', kind: 'audio' },
      // { stream: video_stream, name: 'video_main', kind: 'video' }
    ],
    receivers: {
      audio: 1,
      video: 1,
    },
  });
  window.atm0sSession = session;
  session.on('mystream_added', onMyStreamAdded);
  session.on('mystream_removed', onMyStreamRemoved);
  session.connect();
}

window.toggleStream = async function toggleStream() {
  if (window.video_stream) {
    window.atm0sSession.getSender('video', 'video_main').stop();
    window.video_stream.getTracks().forEach((track) => track.stop());
    window.video_stream = undefined;
  } else {
    console.log('Will toggle stream on');
    window.video_stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    await window.atm0sSession.createSender({
      kind: 'video',
      name: 'video_main',
      stream: window.video_stream,
      simulcast: true,
    });
  }
};

boot();
