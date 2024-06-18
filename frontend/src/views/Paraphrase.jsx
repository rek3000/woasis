import React, { useState } from 'react';
import { sendPromptToGemini } from '../services/PromptService';

const Paraphrase = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleParaphrase = async () => {
    try {
      const response = await sendPromptToGemini(inputText);
      setOutputText(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <label htmlFor="inputText">Enter text to paraphrase:</label>
      <br />
      <textarea
        id="inputText"
        rows={4}
        cols={50}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <br />
      <button onClick={handleParaphrase}>Paraphrase</button>
      <br />
      {outputText && <div>Paraphrased Text: {outputText}</div>}
    </div>
  );
};

export default Paraphrase;
