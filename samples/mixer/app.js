let peers_map = {};
let my_peer_id;
let my_stream;

function handleAudioVads(vads) {
    Object.keys(peers_map).map((peer_hash) => {
        let peer = peers_map[peer_hash];
        peer.content.textContent = peer.prefix + (peer.stream.state.active ? '' : 'muted');
    });
    Object.keys(vads).map((peer_hash) => {
        let peer = peers_map[peer_hash];
        if (!!peer) {
            peer.content.textContent = peer.prefix + vads[peer_hash];
            if (peer.timeout) {
                clearTimeout(peer.timeout);
            }
            peer.timeout = setTimeout(() => {
                peer.content.textContent = peer.prefix + (peer.stream.state.active ? '' : 'muted');
            }, 1000);
        }
    })
}

async function onStreamAdded(stream) {
    if(stream.peer_id == my_peer_id)
        my_stream = stream;
    console.log('added stream:', stream);
    if (stream.kind == 'audio' && stream.peer_id == 'mixer' && stream.name == 'audio_main') {
        console.log('will connect mixer stream:', stream);
        let consumer = await window.atm0sSession.createConsumer(stream);
        let element = document.getElementById('mixed_audio');
        element.srcObject = consumer.view('audio_main');
        consumer.onVadsUpdated(handleAudioVads);
    }

    if (stream.kind == 'audio' && stream.peer_id != 'mixer') {
        let is_me = my_peer_id == stream.peer_id;
        let text_prefix = (is_me ? 'Me ' : stream.peer_id) + ' audio:';
        if (is_me) {
            console.log('enable vad and remove noise');
            window.atm0sSession.getSender('audio', 'audio_main').toggleAudioFeatures(true, false).then(console.log).catch(console.error);
        }
        let peers_container = document.getElementById('peers');
        let content = document.createElement('div');
        content.id = stream.peer_id;
        content.style.height = '50px';
        content.style.width = '100%';
        content.textContent = text_prefix + (stream.state.active ? '' : 'muted');
        peers_container.appendChild(content);
        peers_map[stream.peer_hash] = {
            prefix: text_prefix,
            stream,
            content
        };
    }
}

async function onStreamUpdated(stream) {
    let peer_hash = stream.peer_hash;
    let peer = peers_map[peer_hash];
    console.log('updated:', peer_hash, stream.state.active);
    peer.content.textContent = peer.prefix + 'muted';
}

async function onStreamRemoved(stream) {
    if (stream.kind == 'audio' && stream.peer_id != 'mixer') {
        peers_map[stream.peer_hash].content.remove();
        delete peers_map[stream.peer_hash];
    }
}

async function boot() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    my_peer_id = params['peer'] || 'echo-client-' + new Date().getTime();

    window.audio_stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    let session = Atm0s.createSession(params['server'], {
        roomId: params['room'] || 'demo',
        peerId:  my_peer_id,
        token: params['token'],
        senders: [
            { stream: window.audio_stream, name: 'audio_main', kind: 'audio' },
        ],
        receivers: {
            audio: 1,
            video: 1
        }
    });
    window.atm0sSession = session;
    window.microphone_publisher = session.createPublisher('audio', 'audio_main');
    session.connect();
    session.on('stream_added', onStreamAdded);
    session.on('stream_updated', onStreamUpdated);
    session.on('stream_removed', onStreamRemoved);
    session.on('mystream_added', onStreamAdded);
    session.on('mystream_updated', onStreamUpdated);
    session.on('mystream_removed', onStreamRemoved);
}

window.toggleStream = async function toggleStream() {
    if(window.audio_stream) {
        window.microphone_publisher.switchStream(null);
        window.audio_stream.getTracks().forEach(track => track.stop());
        window.audio_stream = undefined;
    } else {
        console.log("Will toggle stream on");
        window.audio_stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false});
        window.microphone_publisher.switchStream(window.audio_stream);
    }
}

window.muteUnmuteStream = async function muteUnmuteStream() {
    if(my_stream.state.active) {
        window.atm0sSession.setActiveOther(my_peer_id, 'audio', 'audio_main', false);
    } else {
        window.atm0sSession.setActiveOther(my_peer_id, 'audio', 'audio_main', true);
    }
}

boot();