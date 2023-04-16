import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
// eslint-disable-next-line no-unused-vars
import * as tf from "@tensorflow/tfjs";
// import rankModelJson from './ml-models/rank_model/model.json';
// import suitModelJson from './ml-models/suit_model/model.json';
// import { drawRect } from "./utilities";
import logo from "./logo.svg";
import "./App.css";

const MODEL_URL = '/google/tfjs-model/imagenet/mobilenet_v2_100_224/classification/3/default/1';

function App() {
  const [isCamOn, setCamOn] = useState(false);
  const intervalId = useRef(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // const detect = async (net) => {
  //   // Check data is available
  //   if (
  //     typeof webcamRef.current !== "undefined" &&
  //     webcamRef.current !== null &&
  //     webcamRef.current.video.readyState === 4
  //   ) {
  //     // Get Video Properties
  //     const video = webcamRef.current.video;
  //     const videoWidth = webcamRef.current.video.videoWidth;
  //     const videoHeight = webcamRef.current.video.videoHeight;

  //     // Set video width
  //     webcamRef.current.video.width = videoWidth;
  //     webcamRef.current.video.height = videoHeight;

  //     // Set canvas height and width
  //     canvasRef.current.width = videoWidth;
  //     canvasRef.current.height = videoHeight;

  //     // 4. TODO - Make Detections
  //     const obj = await net.detect(video);

  //     // Draw mesh
  //     const ctx = canvasRef.current.getContext("2d");

  //     // 5. TODO - Update drawing utility
  //     drawRect(obj, ctx);
  //     console.log(obj); // printing predictions
  //   }
  // };

  useEffect(() => {
    // Main function
    const runML = async () => {
      // 3. Load network 
      if (isCamOn) {
        console.log('Loading neural networks...');

        // one model for card ranks
        const rankModel = await tf.loadGraphModel(MODEL_URL, { fromTFHub: true });
        console.log(rankModel);

        // another model for card suits
        // console.log({suitModelJson});
        // const suitModel = await tf.loadLayersModel({ load: () => rankModelJson });

        console.log('Neural network loaded!');
        //  Loop and detect hands
        // intervalId.current = setInterval(() => {
        //   // TODO: might make sense to combine below code into one call to detect fn:
        //   detect(rankModel);
        //   // detect(suitModel)
        // }, 10);
      }

      return () => {
        clearInterval(intervalId.current);
      };
    };
    runML();
  }, [isCamOn]);

  return (
    <div className="App">
      <header className="App-header">
        {
          !isCamOn && (
            <React.Fragment>
              <img src={logo} className="App-logo" alt="logo" />
                <p>Machine Learning Playing Card Detection Challenge</p>
                <a
                  className="App-link"
                  href="https://www.tensorflow.org/js"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn TensorFlowJS
                </a>
            </React.Fragment>
          )
        }
        <button
          className={`detection-button${isCamOn ? '-top' : ''}`}
          onClick={() => setCamOn(prevState => !prevState)}
        >
          {`${isCamOn ? 'Stop' : 'Start'} cam`}
        </button>
        {
          isCamOn && (
            <React.Fragment>
              <Webcam
                ref={webcamRef}
                muted={true}
                style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 9,
                  width: 640,
                  height: 480,
                }}
              />
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 8,
                  width: 640,
                  height: 480,
                }}
              />
            </React.Fragment>
          )
        }
      </header>
    </div>
  );
}

export default App;
