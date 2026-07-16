const changeVideoSize = (vidHeightInput: any, videWidthInput: any, stream: any) => {
    stream.getVideoTracks().forEach((track: any) => {
        const capabilities = track.getCapabilities();
        const height = vidHeightInput.current.valueAsNumber;
        const width = videWidthInput.current.valueAsNumber;
        const vConstraints = {
            height: {exact: height < capabilities.height.max ? height : capabilities.height.max},
            width: {exact: width < capabilities.width.max ? width : capabilities.width.max},
        }
        track.applyConstraints(vConstraints);
    })
}

export {
    changeVideoSize
}