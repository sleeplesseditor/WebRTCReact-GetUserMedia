import * as React from 'react';

let stream = null as any;
const constraints = {
    audio: true,
    video: true,
}

const shareCameraAndMic = async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
        console.error('User denied access to constraints', error)
    }
}

const showMyFeed = async (videoRef: React.RefObject<HTMLVideoElement | null>) => {
    if(!stream) {
        alert('Stream is still loading...');
        return;
    }
    if (videoRef?.current) {
        videoRef.current.srcObject = stream;
    }
    const tracks = stream.getTracks();
    console.log('TRACKS', tracks);
}

const stopMyFeed = () => {
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