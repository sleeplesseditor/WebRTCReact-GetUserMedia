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

  console.log('ST', stream, mediaStream)

  return (
    <div className="bg-black h-screen grid grid-cols-2 grid-rows-1 gap-4">
      <div className="p-4">
        <div className="flex flex-col gap-2">
          <div className="p-4 bg-slate-500 rounded-lg shadow-xl">
            <button 
              className="btn btn-primary d-block mb-1"
              id="share"
              onClick={handleShare}
            >
              Share my mic and camera
            </button>
            <button 
              className="btn btn-secondary d-block mb-1"
              // disabled={stream === null}
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
          </div>
          <div className="p-4 bg-slate-500 rounded-lg shadow-xl">
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
          <div className="p-4 bg-slate-500 rounded-lg shadow-xl">
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
          <div className="p-4 bg-slate-500 rounded-lg shadow-xl">
            <button 
              className="btn btn-secondary d-block mb-1"
              id="share-screen" 
              onClick={() => shareScreen(mediaStream)}
            >
              Share Screen
            </button>
          </div>
          <div className="p-4 bg-slate-500 rounded-lg shadow-xl">
            <div>
              <label className="text-white font-bold">Select audio input:</label>
              <select 
                id="audio-input"
                onChange={(e) => changeAudioInput(e, audioInputRef.current)} 
                ref={audioInputRef}
              />
            </div>
            <div>
              <label className="text-white font-bold">Select audio output:</label>
              <select 
                id="audio-output" 
                onChange={(e) => changeAudioOutput(e, myVideoRef.current)}
                ref={audioOutputRef}
              />
            </div>
          <div>
              <label className="text-white font-bold">Select video input:</label>
              <select 
                id="video-input"
                onChange={(e) => changeVideo(e, videoInputRef.current)}
                ref={videoInputRef}
              />
          </div>
          </div>
          </div>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-col justify-center align-center">
          <h3 className="text-lg text-white font-bold">My feed</h3>
          <video 
            autoPlay 
            className="video"
            id="my-video" 
            playsInline 
            ref={myVideoRef}   
          />
        </div>
        <div className="flex flex-col justify-center align-center">
          <h3 className="text-lg text-white font-bold">Their feed</h3>
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