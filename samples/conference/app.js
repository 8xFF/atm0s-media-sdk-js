async function onMyStreamAdded(stream) {
  console.log('on my stream added', stream);
  if (stream.kind == 'audio') {
    console.log('enable vad and remove noise');
    window.atm0sSession
      .getSender('audio', 'audio_main')
      .toggleAudioFeatures(true, false)
      .then(console.log)
      .catch(console.error);
  }
}

async function onStreamAdded(stream) {
  console.log('on stream added');
  if (!window.allowView) return;
  console.log('added stream:', stream);
  if (stream.kind == 'video') {
    console.log('create video consumer');
    let consumer = window.atm0sSession.createConsumer(stream);
    let element = document.createElement('video');
    element.id = 'video-' + stream.peer_id;
    element.width = 300;
    element.height = 200;
    element.muted = true;
    element.autoplay = true;
    element.srcObject = consumer.view('main');
    element.consumer = consumer;
    document.body.appendChild(element);
  }

  if (stream.kind == 'audio') {
    console.log('create audio mixer consumer');
    let consumer = await window.atm0sSession.createConsumer(stream);
    let element = document.createElement('audio');
    element.id = 'audio-' + stream.peer_id;
    element.hidden = true;
    element.autoplay = true;
    element.srcObject = consumer.view('main');
    element.consumer = consumer;
    document.body.appendChild(element);
  }
}

async function onStreamRemoved(stream) {
  if (!window.allowView) return;
  console.log('removed stream:', stream);
  if (stream.kind == 'video') {
    let element = document.getElementById('video-' + stream.peer_id);
    element.consumer.unview('main');
    element.remove();
  } else if (stream.kind == 'audio' && stream.peer_id == 'mixer' && stream.name == 'audio_main') {
    let element = document.getElementById('audio-' + stream.peer_id);
    element.consumer.unview('main');
    element.remove();
  }
}

async function boot() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  let stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  let session = Atm0s.createSession(params['server'], {
    roomId: params['room'] || 'demo',
    peerId: params['peer'] || 'echo-client-' + new Date().getTime(),
    token: params['token'],
    codecs: ['OPUS', 'VP9'],
    senders: [
      { stream: stream, name: 'audio_main', kind: 'audio' },
      { stream: stream, name: 'video_main', kind: 'video', simulcast: params['simulcast'] == 'true' },
    ],
    receivers: {
      audio: 1,
      video: 5,
    },
  });
  window.atm0sSession = session;
  session.connect();
  session.on('mystream_added', onMyStreamAdded);
  session.on('stream_added', onStreamAdded);
  session.on('stream_removed', onStreamRemoved);
  window.allowView = true;
  window.onbeforeunload = () => {
    session.disconnect();
  };
}

boot();
