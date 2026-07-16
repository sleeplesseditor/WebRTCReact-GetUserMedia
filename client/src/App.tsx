import * as React from 'react';
import {
  shareCameraAndMic,
  showMyFeed,
  stopMyFeed
} from './helpers/feedHelpers';
import { shareScreen } from './helpers/shareScreenHelpers';

const App = () => {
  let mediaStream = null;

  const myVideoRef = React.useRef(null);
  const otherVideoRef = React.useRef(null);

  return (
    <div className="container row">
      <div className="buttons col-4">
          <button 
            className="btn btn-primary d-block mb-1"
            id="share"
            onClick={shareCameraAndMic}
          >
            Share my mic and camera
          </button>
          <button 
            className="btn btn-secondary d-block mb-1"
            id="show-video" 
            onClick={() => showMyFeed(myVideoRef)}
          >
            Show My Video
          </button>
          <button 
            className="btn btn-secondary d-block mb-1"
            id="stop-video" 
            onClick={stopMyFeed}
          >
            Stop My Video
          </button>
          <div className="mb-1">
              <button id="change-size" className="btn btn-secondary mb-1">Change screen size</button>
              <input type="text" id="vid-width" value="1280"/>
              <input type="text" id="vid-height" value="720"/>
          </div>
          <div className="mb-1">
              <button id="start-record" className="btn btn-secondary mb-1">Start recording</button>
              <button id="stop-record" className="btn btn-secondary mb-1">Stop Recording</button>
              <button id="play-record" className="btn btn-secondary mb-1">Play Recording</button>
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
              <video id="my-video" className="video" autoPlay playsInline ref={myVideoRef}></video>
          </div>
          <div>
              <h3>Their feed</h3>
              <video id="other-video" className="video" autoPlay playsInline ref={otherVideoRef}></video>
          </div>
      </div>
    </div>
  )
}

export default App;