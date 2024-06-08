import React, { useState } from 'react';
import './css/Paraphrase.css';

const Paraphrasing = () => {
  const [inputText, setInputText] = useState('');
  const [paraphrases, setParaphrases] = useState([]);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleParaphrase = () => {
    // Here you would implement the paraphrasing logic
    // For demonstration purposes, let's just duplicate the input text
    setParaphrases([inputText, inputText, inputText]);
  };

  const handleChooseParaphrase = (paraphrase) => {
    // Here you would handle the selection of a paraphrase
    console.log('Selected paraphrase:', paraphrase);
  };

  return (
    <div className="paraphrasing-container">
      <h1>Paraphrasing</h1>
      <textarea
        value={inputText}
        onChange={handleChange}
        placeholder="Enter your text here..."
      />
      <button onClick={handleParaphrase}>Paraphrase</button>
      {paraphrases.length > 0 && (
        <div className="paraphrases">
          <h2>Choose a Paraphrase:</h2>
          <ul>
            {paraphrases.map((paraphrase, index) => (
              <li key={index}>
                <button onClick={() => handleChooseParaphrase(paraphrase)}>{paraphrase}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Paraphrasing;
