window.AudioContext = window.AudioContext || window.webkitAudioContext;

async function createControllableStream(id) {
    let status_element = document.getElementById(id + '_status');
    let btn_element = document.getElementById(id + '_btn');
    let stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false}); //for allow auto play audio_main    

    let track = stream.getTracks()[0];
    track.enabled = false;
    btn_element.textContent = 'Play';
    status_element.innerText = 'paused';

    btn_element.onclick = () => {
        if (track.enabled) {
            track.enabled = false;
            btn_element.textContent = 'Play';
            status_element.innerText = 'paused';
        } else {
            track.enabled = true;
            btn_element.textContent = 'Pause';
            status_element.innerText = 'playing';
        }
    };

    return stream;
}

async function boot() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let stream1 = await createControllableStream('audio_1');
    let stream2 = await createControllableStream('audio_2');
    let stream3 = await createControllableStream('audio_3');
    let stream4 = await createControllableStream('audio_4');
    let stream5 = await createControllableStream('audio_5');

    let session = Atm0s.createSession(params['server'] || '', {
        roomId: params['room'] || 'demo',
        peerId:  params['peer'] || 'viewer-client-' + new Date().getTime(),
        token: params['token'] || 'demo',
        senders: [
            { stream: stream1, name: 'audio_main_1', kind: 'audio' },
            { stream: stream2, name: 'audio_main_2', kind: 'audio' },
            { stream: stream3, name: 'audio_main_3', kind: 'audio' },
            { stream: stream4, name: 'audio_main_4', kind: 'audio' },
            { stream: stream5, name: 'audio_main_5', kind: 'audio' },
        ],
        receivers: { 
            audio: 1,
            video: 1
        }
    });
    window.atm0sSession = session;
    session.connect();
}

boot();