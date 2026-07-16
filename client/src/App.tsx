import * as React from 'react';
import {
  shareCameraAndMic,
  showMyFeed,
  stopMyFeed
} from './helpers/feedHelpers';
import { shareScreen } from './helpers/shareScreenHelpers';
import {
  playRecording,
  startRecording,
  stopRecording
} from './helpers/screenRecordHelpers';
import {
  changeAudioInput,
  changeAudioOutput,
  changeVideo,
  getDevices
} from './helpers/inputOutputHelpers';
import { changeVideoSize } from './helpers/screenSizeHelpers'

const App = () => {
  let stream = null as any;
  let mediaStream = null;

  const myVideoRef = React.useRef(null);
  const otherVideoRef = React.useRef(null);

  const vidWidthRef = React.useRef(null);
  const vidHeightRef = React.useRef(null);

  const audioInputRef = React.useRef(null);
  const audioOutputRef = React.useRef(null);
  const videoInputRef = React.useRef(null);

  const handleShare = async () => {
    stream = await shareCameraAndMic(stream);
  }

  React.useEffect(() => {
    getDevices(audioInputRef.current, audioOutputRef.current, videoInputRef.current)
  }, []);

  return (
    <div className="container row">
      <div className="buttons col-4">
          <button 
            className="btn btn-primary d-block mb-1"
            id="share"
            onClick={handleShare}
          >
            Share my mic and camera
          </button>
          <button 
            className="btn btn-secondary d-block mb-1"
            id="show-video" 
            onClick={() => showMyFeed(myVideoRef, stream)}
          >
            Show My Video
          </button>
          <button 
            className="btn btn-secondary d-block mb-1"
            id="stop-video" 
            onClick={() => stopMyFeed(stream)}
          >
            Stop My Video
          </button>
          <div className="mb-1">
              <button 
                className="btn btn-secondary mb-1"
                id="change-size" 
                onClick={() => changeVideoSize(vidHeightRef, vidWidthRef, stream)}
              >
                Change screen size
              </button>
              <input ref={vidWidthRef} type="number" id="vid-width" defaultValue={1280}/>
              <input ref={vidHeightRef} type="number" id="vid-height" defaultValue={720}/>
          </div>
          <div className="mb-1">
              <button 
                className="btn btn-secondary mb-1"
                id="start-record"
                onClick={() => startRecording(stream)}
              >
                Start recording
              </button>
              <button 
                className="btn btn-secondary mb-1"
                id="stop-record"
                onClick={() => stopRecording()}
              >
                Stop Recording
              </button>
              <button 
                className="btn btn-secondary mb-1"
                id="play-record"
                onClick={() => playRecording(otherVideoRef)}
              >
                Play Recording
              </button>
          </div>
          <button 
            className="btn btn-secondary d-block mb-1"
            id="share-screen" 
            onClick={() => shareScreen(mediaStream)}
          >
            Share Screen
          </button>
          <div>
              <label>Select audio input: </label>
              <select 
                id="audio-input"
                onChange={(e) => changeAudioInput(e, audioInputRef.current)} 
                ref={audioInputRef}
              />
          </div>
          <div>
              <label>Select audio output: </label>
              <select 
                id="audio-output" 
                onChange={(e) => changeAudioOutput(e, myVideoRef.current)}
                ref={audioOutputRef}
              />
          </div>
          <div>
              <label>Select video input: </label>
              <select 
                id="video-input"
                onChange={(e) => changeVideo(e, videoInputRef.current)}
                ref={videoInputRef}
              />
          </div>
      </div>
      <div className="videos col-8">
          <div>
              <h3>My feed</h3>
              <video 
                autoPlay 
                className="video"
                id="my-video" 
                playsInline 
                ref={myVideoRef}   
              />
          </div>
          <div>
              <h3>Their feed</h3>
              <video 
                autoPlay
                className="video"
                id="other-video" 
                playsInline 
                ref={otherVideoRef}
              />
          </div>
      </div>
    </div>
  )
}

export default App;