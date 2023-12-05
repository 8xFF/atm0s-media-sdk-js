async function boot() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false}); //for allow auto play audio_main

    let session = Atm0s.createSession(params['server'] || '', {
        roomId: params['room'] || 'demo',
        peerId:  params['peer'] || 'viewer-client-' + new Date().getTime(),
        token: params['token'] || 'demo',
        mixMinusAudio: {
            mode: 'ManualAudioStreams',
        },
        senders: [
            // { stream: stream, name: 'audio_main', kind: 'audio' },
            // { stream: stream, name: 'video_main', kind: 'video', simulcast: params['simulcast'] === 'true' }
        ],
        receivers: { 
            audio: 0,
            video: 0
        }
    });
    window.atm0sSession = session;
    session.on('stream_added', (stream) => {
        if(stream.kind == 'audio') {
            stream.on('quality', (quality) => {
                console.log("Quality Audio:", stream.peer_id, stream.name, quality?.mos);
            })
            session.getMixMinusAudio().addSource(stream);
        }
    });
    session.on('stream_removed', (stream) => {
        if(stream.kind == 'audio') {
            session.getMixMinusAudio().removeSource(stream);
        }
    });
    session.connect();

    document.getElementById('play_audio_btn').onclick = () => {
        session.getMixMinusAudio().play();
    }
}

setTimeout(() => {
    boot();
}, 100);