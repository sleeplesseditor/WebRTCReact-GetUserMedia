const constraints = {
    audio: true,
    video: true,
}

const shareCameraAndMic = async (stream: any) => {
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        return stream;
    } catch (error) {
        console.error('User denied access to constraints', error);
        return null;
    }
}

const showMyFeed = async (videoRef: any, stream: any) => {
    if(!stream) {
        alert('Stream is still loading...');
        return;
    }
    if (videoRef) {
        videoRef.current.srcObject = stream;
    }
}

const stopMyFeed = (stream: any) => {
    if(!stream) {
        return;
    }
    const tracks = stream.getTracks();
    tracks.forEach((track: any) => {
        track.stop();
    });
}

export {
    shareCameraAndMic,
    showMyFeed,
    stopMyFeed
}