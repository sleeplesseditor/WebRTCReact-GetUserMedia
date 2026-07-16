import * as React from 'react';

const constraints = {
    audio: true,
    video: true,
}

const shareCameraAndMic = async (stream: any) => {
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
        console.error('User denied access to constraints', error)
    }
}

const showMyFeed = async (videoRef: React.RefObject<HTMLVideoElement | null>, stream: any) => {
    if(!stream) {
        alert('Stream is still loading...');
        return;
    }
    if (videoRef?.current) {
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