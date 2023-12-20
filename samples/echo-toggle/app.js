async function onMyStreamAdded(stream) {
  console.log('added mystream:', stream);
  if (stream.kind == 'video') {
    let receiver = await window.atm0sSession.takeReceiver('video');
    let element = document.getElementById('my_video');
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
}

async function boot() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  let session = Atm0s.createSession(params['server'], {
    roomId: params['room'] || 'demo',
    peerId: params['peer'] || 'echo-client-' + new Date().getTime(),
    token: params['token'],
    senders: [],
    receivers: {
      audio: 1,
      video: 1,
    },
    logLevel: 5,
  });
  window.atm0sSession = session;
  session.on('mystream_added', onMyStreamAdded);
  session.on('mystream_removed', onMyStreamRemoved);
  session.on('room_stats', (stats) => {
    console.log('=== room_stats:', stats);
  });
  session.connect();
}

window.toggleStream = async function toggleStream() {
  if (window.video_stream) {
    window.atm0sSession.getSender('video', 'video_main').stop();
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

window.pingStream = async function pingStream() {
  const res = await window.atm0sSession.ping();
  console.log('ping result:', res);
}

window.restartIce = async function restartIce() {
  await window.atm0sSession.restartIce();
}

boot();
