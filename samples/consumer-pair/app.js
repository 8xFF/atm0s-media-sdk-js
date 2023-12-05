async function boot() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  let peerId = params['peer'] || 'echo-client-' + new Date().getTime();
  let session = Atm0s.createSession(params['server'] || '', {
    roomId: params['room'] || 'demo',
    peerId,
    token: params['token'],
    senders: [],
    receivers: {
      audio: 1,
      video: 1,
    },
  });
  window.atm0sSession = session;
  let consumer = session.createConsumerPair('rtmp', 'main_audio', 'main_video');
  session.connect().then(() => {
    let element = document.getElementById('my_video');
    element.srcObject = consumer.view('main');
  });
}

boot();
