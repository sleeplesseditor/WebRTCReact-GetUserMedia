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

const App = () => {
  let stream = null as any;
  let mediaStream = null;

  const myVideoRef = React.useRef(null);
  const otherVideoRef = React.useRef(null);

  const vidWidthRef = React.useRef(null);
  const vidHeightRef = React.useRef(null);

  return (
    <div className="container row">
      <div className="buttons col-4">
          <button 
            className="btn btn-primary d-block mb-1"
            id="share"
            onClick={() => shareCameraAndMic(stream)}
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
              >
                Change screen size
              </button>
              <input type="text" id="vid-width" value="1280"/>
              <input type="text" id="vid-height" value="720"/>
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
              <select id="audio-input"><option>Option</option></select>
          </div>
          <div>
              <label>Select audio output: </label>
              <select id="audio-output"><option>Option</option></select>
          </div>
          <div>
              <label>Select video input: </label>
              <select id="video-input"><option>Option</option></select>
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