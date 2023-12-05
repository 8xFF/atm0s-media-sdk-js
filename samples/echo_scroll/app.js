let videos = {};
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

let onApplyDebonde =  debounce(function onApplyStream() {
    console.log("Will apply now");
    Object.values(videos).map(async (video) => {
        if(!video.visible && video.viewing) {
            console.log('Switch to hide:', video.id);
            video.viewing = false;
            video.element.srcObject = null;
            video.element.style.backgroundColor = 'gray';
            video.consumer.unview('small_video_element');
        }
    })

    Object.values(videos).map(async (video) => {
        if(video.visible && !video.viewing) {
            console.log('Get consumer for switch to view:', video.id);
            video.viewing = true;
            video.consumer = window.atm0sSession.createConsumer(video.stream);
            console.log('Switch to view:', video.id, video.consumer);
            video.element.srcObject = video.consumer.view('small_video_element');
            video.element.style.backgroundColor = 'black';
            video.consumer.on('state', (state) => {
                switch(state) {
                    case 'live':
                        if(!video.element.srcObject)
                            video.element.srcObject = video.stream;
                        video.element.style.opacity = '1';
                        break;
                    case 'key_only':
                        if(!video.element.srcObject)
                            video.element.srcObject = video.stream;
                        video.element.style.opacity = '0.8';
                        break;
                    case 'disconnected':
                        video.element.style.opacity = '0.2';
                        break;
                    case 'paused':
                        video.element.srcObject = null;
                        video.element.style.opacity = '1';
                        break;

                }
            });
        }
    })
}, 1000, false);

function onVisiblityChanged(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            videos[entry.target.id].visible = true;
        } else {
            videos[entry.target.id].visible = false;
        }
    });

    onApplyDebonde();
}

function onMyStreamAdded(stream) {
    console.log('added mystream:', stream);
    const options = { threshold: 0.2 };
    const observer = new IntersectionObserver(onVisiblityChanged, options);
    if(stream.kind == 'video') {
        let panel = document.getElementById('video-panel');
        for(let i = 0; i < 20; i++) {
            let element = document.createElement('video');
            element.id = 'video-' + i;
            element.stream = stream;
            element.style.backgroundColor = 'gray';
            element.style.width = '45%';
            element.style.height = '35%';
            element.style.margin = '2px';
            element.muted = true;
            element.autoplay = true;
            observer.observe(element);
            panel.appendChild(element);

            videos[element.id] = { id: element.id, stream, visible: false, element, consumer: null };
        }
    }
}

async function boot() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let video_stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});
    let session = Atm0s.createSession(params['server'], {
        roomId: params['room'] || 'demo',
        peerId:  params['peer'] || 'echo-client-' + new Date().getTime(),
        token: params['token'],
        senders: [
            { stream: video_stream, name: 'video_main', kind: 'video', simulcast: true }
        ],
        receivers: { 
            audio: 1,
            video: 8
        }
    });
    window.atm0sSession = session;
    session.connect();
    session.on('mystream_added', onMyStreamAdded);
    session.on('mystream_removed', onMyStreamAdded);
}

boot();