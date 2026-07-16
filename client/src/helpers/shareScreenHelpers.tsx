const shareScreen = async (mediaStream: any) => {
    const options = {
        video: true,
        audio: false,
        surfaceSwitching: 'include'
    }

    try {
        mediaStream = await navigator.mediaDevices.getDisplayMedia(options);
    } catch (error) {
        console.error(error)
    }
}

export {
    shareScreen
}