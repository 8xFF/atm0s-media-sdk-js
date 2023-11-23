async function onStreamAdded(stream) {
    if(stream.kind == 'audio') {
        let element = document.getElementById('remote_audio');
        if(element.consumer) {
            element.consumer.unview('main');
        }
        let consumer = window.bluesea_session.createConsumer(stream);
        element.srcObject = consumer.view('main');
        element.consumer = consumer;
    }

    if(stream.kind == 'video') {
        let element = document.getElementById('remote_video');
        if(element.consumer) {
            element.consumer.unview('main');
        }
        let consumer = window.bluesea_session.createConsumer(stream);
        element.srcObject = consumer.view('main', 50, 2, 2);
        element.consumer = consumer;
    }
}

async function onStreamRemoved(stream) {
    if(stream.kind == 'audio') {
        let element = document.getElementById('remote_audio');
        if(element.consumer) {
            element.consumer.unview('main');
        }
    }

    if(stream.kind == 'video') {
        let element = document.getElementById('remote_video');
        if(element.consumer) {
            element.consumer.unview('main');
        }
    }
}

async function boot() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let session = Atm0s.createSession([params['server']], {
        roomId: params['room'] || 'demo',
        peerId: params['peer'] || 'echo-client-' + new Date().getTime(),
        token: params['token'],
        codecs: ['OPUS', 'VP9', 'VP8', 'H264'],
        senders: [],
        receivers: { 
            audio: 1,
            video: 1
        }
    });
    window.bluesea_session = session;
    session.connect();
    session.on('stream_added', onStreamAdded);
    session.on('stream_removed', onStreamRemoved);
}

boot();