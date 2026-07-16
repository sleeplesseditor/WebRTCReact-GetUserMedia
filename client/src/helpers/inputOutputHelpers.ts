const getDevices = async (audioInputEl: any, audioOutputEl: any, videoInputEl: any) =>{
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log(devices)
        devices.forEach(d => {
            const option = document.createElement('option');
            option.value = d.deviceId;
            option.text = d.label;

            if(d.kind === "audioinput"){
                audioInputEl.appendChild(option)    
            } else if (d.kind === "audiooutput"){
                audioOutputEl.appendChild(option)    
            } else if (d.kind === "videoinput"){
                videoInputEl.appendChild(option)    
            }
        })
    }catch(err){
        console.log(err);
    }
}

const changeAudioInput = async (e: any, stream: any) =>{
    const deviceId = e.target.value;
    const newConstraints = {
        audio: { deviceId: {exact: deviceId} },
        video: true,
    }

    try {
        stream = await navigator.mediaDevices.getUserMedia(newConstraints);
        console.log(stream);
        const tracks = stream.getAudioTracks();
        console.log(tracks);
    } catch(err) {
        console.log(err)
    }
}

const changeAudioOutput = async (e: any, videoElement: any) =>{
    const deviceId = e.target.value;

    if(!deviceId) return;

    try {
        await videoElement.setSinkId(e.target.value);
        console.log('Changed audio output to:', deviceId);
    } catch (err) {
        console.error('Could not change audio output:', err);
    }
}

const changeVideo = async(e: any, stream: any) => {
    const deviceId = e.target.value;
    const newConstraints = {
        audio: true,
        video: {deviceId: {exact: deviceId}},
    }

    try {
        stream = await navigator.mediaDevices.getUserMedia(newConstraints);
        console.log(stream);
        const tracks = stream.getVideoTracks();
        console.log(tracks);
    } catch(err) {
        console.log(err)
    }
}

export {
    changeAudioInput,
    changeAudioOutput,
    changeVideo,
    getDevices
}