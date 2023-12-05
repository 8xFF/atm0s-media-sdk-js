

async function onMyStreamAdded(stream) {
    if(stream.kind == 'video') {
        window.my_stream = stream;
    }
}

async function boot() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});
    let session = Atm0s.createSession(params['server'], {
        roomId: params['room'] || 'demo',
        peerId:  params['peer'] || 'echo-client-' + new Date().getTime(),
        token: params['token'],
        senders: [
            { stream: stream, name: 'video_main', kind: 'video', simulcast: params['simulcast'] === 'true' }
        ],
        receivers: { 
            audio: 1,
            video: 1
        }
    });
    window.atm0sSession = session;
    session.connect();
    session.on('mystream_added', onMyStreamAdded);

    window.toggleView = () => {
        let element = document.getElementById('my_video');
        if(window.my_stream_consumer) {
            window.my_stream_consumer.unview('main');
            window.my_stream_consumer = undefined;
            element.srcObject = undefined;
        } else {
            window.my_stream_consumer = session.createConsumer(window.my_stream);
            element.srcObject = window.my_stream_consumer.view('main', 50, 2, 2);
        }
    }
}

boot();