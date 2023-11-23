async function onMyStreamAdded(stream) {
    console.log('added mystream:', stream);
    if(stream.kind == 'video') {
        let receiver = window.bluesea_session.takeReceiver('video');
        console.log('take receiver:', receiver);
        let element = document.getElementById('my_video');
        element.srcObject = receiver.stream;
        receiver.switch(stream);
    }

    if(stream.kind == 'audio') {
        let receiver = window.bluesea_session.takeReceiver('audio');
        let element = document.getElementById('my_audio');
        element.srcObject = receiver.stream;
        receiver.switch(stream);
    }
}

async function boot() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    let session = atm0s.createSession(params['server'] || '', {
        roomId: params['room'] || 'demo',
        peerId: params['peer'] || 'echo-client-lmao',
        token: params['token'],
        senders: [
            { stream: stream, name: 'audio_main', kind: 'audio' },
            { stream: stream, name: 'video_main', kind: 'video', simulcast: params['simulcast'] === 'true' }
        ],
        receivers: {
            audio: 1,
            video: 1
        }
    });
    window.bluesea_session = session;
    session.connect();
    session.on('mystream_added', onMyStreamAdded);
}

boot();