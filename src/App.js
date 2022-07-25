import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

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
        <div className="input-wrapper">
          <span>Insert playing card image below:</span>
          <input
            type="file"
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
