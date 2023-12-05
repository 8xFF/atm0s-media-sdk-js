async function onMyStreamAdded(stream) {
  console.log('added mystream:', stream);
  if (stream.kind == 'video') {
    let consumer = await window.atm0sSession.createConsumer(stream);
    let element = document.getElementById('my_video');
    element.srcObject = consumer.view('main_video');
    element.consumer = consumer;
  }

  if (stream.kind == 'audio') {
    let consumer = await window.atm0sSession.createConsumer(stream);
    let element = document.getElementById('my_audio');
    element.srcObject = consumer.view('main_audio');
    element.receiver = receiver;
    receiver.switch(stream);
  }
}

async function onMyStreamRemoved(stream) {
  console.log('removed mystream:', stream);
  if (stream.kind == 'video') {
    let element = document.getElementById('my_video');
    element.consumer.unview('main_video');
    element.consumer = null;
    element.srcObject = null;
  }

  if (stream.kind == 'audio') {
    let element = document.getElementById('my_audio');
    element.consumer.unview('main_audio');
    element.consumer = null;
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
  window.webcam_publisher = session.createPublisher({ kind: 'video', name: 'video_main' });
  session.on('mystream_added', onMyStreamAdded);
  session.on('mystream_removed', onMyStreamRemoved);
  session.connect();
}

window.toggleStream = async function toggleStream() {
  if (window.video_stream) {
    window.webcam_publisher.switch(null);
    window.video_stream.getTracks().forEach((track) => track.stop());
    window.video_stream = undefined;
  } else {
    console.log('Will toggle stream on');
    window.video_stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    window.webcam_publisher.switch(window.video_stream);
  }
};

boot();
