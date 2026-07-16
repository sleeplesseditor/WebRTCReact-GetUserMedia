let mediaRecorder: any;
let recordedBlobs: any;

const startRecording = (stream: any) => {
    if(!stream){ 
        alert("No current feed");
        return
    }
    recordedBlobs = []; 

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e: any) => {
        recordedBlobs.push(e.data);
    }
    mediaRecorder.start();
}


const stopRecording = () => {
    if(!mediaRecorder){
        alert("Please record before stopping!")
        return
    }
    
    mediaRecorder.stop();
}

const playRecording = (recordedVideoRef: React.RefObject<HTMLVideoElement | null>) => {
    if(!recordedBlobs){
        alert("No Recording saved")
        return
    };

    const videoElement = recordedVideoRef.current;
    
    if (!videoElement) {
        alert("No video element available");
        return;
    }

    const superBuffer = new Blob(recordedBlobs);
    videoElement.src = window.URL.createObjectURL(superBuffer);
    videoElement.controls = true;
    videoElement.play();
};

export {
    playRecording,
    startRecording,
    stopRecording
}