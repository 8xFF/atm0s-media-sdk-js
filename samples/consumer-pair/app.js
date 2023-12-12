async function boot() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  let stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  let peerId = params['peer'] || 'echo-client-' + new Date().getTime();
  let session = Atm0s.createSession(params['server'] || '', {
    roomId: params['room'] || 'demo',
    peerId,
    token: params['token'],
    senders: [
      { stream: stream, name: 'audio_main', kind: 'audio' },
      { stream: stream, name: 'video_main', kind: 'video', simulcast: params['simulcast'] === 'true' },
    ],
    receivers: {
      audio: 1,
      video: 1,
    },
  });
  window.atm0sSession = session;
  let consumer = session.createConsumerPair(peerId, 'audio_main', 'video_main');
  session.connect().then(() => {
    let element = document.getElementById('my_video');
    element.srcObject = consumer.view('main');
  });
}

boot();
