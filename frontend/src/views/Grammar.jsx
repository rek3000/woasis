import React, { useState } from 'react';
import './css/Grammar.css';

const Grammar = () => {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
    checkGrammar(inputText);
  };

  const checkGrammar = (text) => {
    const errorList = [];

    // Simple grammar checks
    const sentences = text.split('. ');
    sentences.forEach((sentence, index) => {
      if (!/^[A-Z]/.test(sentence)) {
        errorList.push(`Sentence ${index + 1} should start with a capital letter.`);
      }
      if (!/[.!?]$/.test(sentence)) {
        errorList.push(`Sentence ${index + 1} should end with a punctuation mark.`);
      }
    });

    setErrors(errorList);
  };

  return (
    <div className="grammar-checker">
      <h1>Grammar Checker</h1>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type your text here..."
      />
      {errors.length > 0 && (
        <div className="errors">
          <h2>Errors:</h2>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Grammar;
