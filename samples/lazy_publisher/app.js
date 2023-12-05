async function onMyStreamAdded(stream) {
    console.log('added mystream:', stream);
    if (stream.kind == 'video') {
        let receiver = window.atm0sSession.takeReceiver('video');
        let element = document.getElementById('my_video');
        element.srcObject = receiver.stream;
        receiver.switch(stream);
    }

    // if (stream.kind == 'audio') {
    //     let receiver = window.atm0sSession.takeReceiver('audio');
    //     let element = document.getElementById('my_audio');
    //     element.srcObject = receiver.stream;
    //     receiver.switch(stream);
    // }
}

async function boot() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let session = Atm0s.createSession(params['server'] || '', {
        roomId: params['room'] || 'demo',
        peerId:  params['peer'] || 'echo-client-' + new Date().getTime(),
        token: params['token'],
        senders: [],
        receivers: {
            audio: 1,
            video: 1
        }
    });
    window.publisher = session.createPublisher({ name: 'video_main', kind: 'video', simulcast: params['simulcast'] === 'true' })
    window.atm0sSession = session;
    session.connect();
    session.on('mystream_added', onMyStreamAdded);
}

window.toggleStream = async () => {
    if(window.stream) {
        window.publisher.switchStream(null)
        window.stream.getTracks().map((t) => t.stop())
        window.stream = null
    } else {
        window.stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        window.publisher.switchStream(window.stream)
    }
}

boot();