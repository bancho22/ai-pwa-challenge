import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [img, setImg] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Machine Learning Playing Card Detection Challenge
        </p>
        <a
          className="App-link"
          href="https://www.tensorflow.org/js"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TensorFlowJS
        </a>
        {
          !Boolean(img) && (
            <div className="input-wrapper">
              <span>Insert playing card image below:</span>
              <input
                type="file"
                onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}
              />
            </div>
          )
        }
        {
          Boolean(img) && (
            <React.Fragment>
              <img src={img} alt="uploaded card" className='card-image' />
              <button
                className='detection-button'
                onClick={() => alert('Implement me!')}
              >
                Run Detection Algo
              </button>
            </React.Fragment>
          )
        }
      </header>
    </div>
  );
}

export default App;
