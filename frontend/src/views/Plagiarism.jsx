import React, { useState } from 'react';
import './css/Plagiarism.css';

const PlagiarismChecker = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
  };

  const checkPlagiarism = () => {
    if (text.includes('plagiarized')) {
      setResult('Plagiarism detected!');
    } else {
      setResult('No plagiarism detected.');
    }
  };

  return (
    <div className="plagiarism-checker">
      <h1>Plagiarism Checker</h1>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Paste your text here..."
      />
      <button onClick={checkPlagiarism}>Check for Plagiarism</button>
      {result && <div className="result">{result}</div>}
    </div>
  );
};

export default PlagiarismChecker;
