

async function onMyStreamAdded(stream) {
    if(stream.kind == 'video') {
        window.streams[stream.name] = stream;
    }
}

async function boot() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let webcam_stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});
    let screen_stream = await navigator.mediaDevices.getDisplayMedia({audio: false, video: {
        frameRate: 10
    }});
    let session = Atm0s.createSession(params['server'], {
        roomId: params['room'] || 'demo',
        peerId:  params['peer'] || 'echo-client-' + new Date().getTime(),
        token: params['token'],
        codecs: ['OPUS', 'VP9'],
        senders: [
            { stream: webcam_stream, name: 'video_main', kind: 'video', simulcast: params['simulcast'] === 'true' },
            { stream: screen_stream, name: 'screen_main', kind: 'video', simulcast: params['simulcast'] === 'true', content_hint: 'detail', screen: true }
        ],
        receivers: { 
            audio: 1,
            video: 1
        }
    });
    window.atm0sSession = session;
    window.streams = {};
    session.connect();
    session.on('mystream_added', onMyStreamAdded);

    window.toggleWebcamView = () => {
        let element = document.getElementById('my_webcam');
        if(window.my_webcam_consumer) {
            window.my_webcam_consumer.unview('main');
            window.my_webcam_consumer = undefined;
            element.srcObject = undefined;
        } else {
            window.my_webcam_consumer = session.createConsumer(window.streams['video_main']);
            element.srcObject = window.my_webcam_consumer.view('main', 50, 2, 2);
        }
    }

    window.toggleScreenView = () => {
        let element = document.getElementById('my_screen');
        if(window.my_screen_consumer) {
            window.my_screen_consumer.unview('main');
            window.my_screen_consumer = undefined;
            element.srcObject = undefined;
        } else {
            window.my_screen_consumer = session.createConsumer(window.streams['screen_main']);
            element.srcObject = window.my_screen_consumer.view('main', 500, 2, 2);
        }
    }
}

boot();