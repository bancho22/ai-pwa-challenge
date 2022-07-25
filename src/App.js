import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";

function App() {
  const [img, setImg] = useState(null);
  const [model, setModel] = useState();
  const webcamRef = React.useRef(null);
  const [videoWidth, setVideoWidth] = useState(960);
  const [videoHeight, setVideoHeight] = useState(640);

  async function loadModel() {
    try {
      const model = await cocoSsd.load();
      setModel(model);
      console.log("set loaded Model");
    } catch (err) {
      console.log(err);
      console.log("failed load model");
    }
  }
  useEffect(() => {
    tf.ready().then(() => {
      loadModel();
    });
  }, []);

  const videoConstraints = {
    height: 500,
    width: 500,
    facingMode: "environment",
  };

  return (
    <div className="App">
      <header className="App-header">
      <div style={{ position: "absolute", top: "400px" }}>
          <Webcam
            audio={false}
            id="img"
            ref={webcamRef}
            screenshotQuality={1}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        </div>
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
        {!Boolean(img) && (
          <div className="input-wrapper">
            <span>Insert playing card image below:</span>
            <input
              type="file"
              onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}
            />
          </div>
        )}
        {Boolean(img) && (
          <React.Fragment>
            <img src={img} alt="uploaded card" className="card-image" />
            <button
              className="detection-button"
              onClick={() => alert("Implement me!")}
            >
              Run Detection Algo
            </button>
          </React.Fragment>
        )}
      </header>
    </div>
  );
}

export default App;
