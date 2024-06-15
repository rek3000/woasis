import React, { useState } from 'react';
import './css/Grammar.css';
import { createPrompt } from '../services/PromptService';

const Grammar = () => {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState([]);

  const handleChange = async (e) => {
    const inputText = e.target.value;
    setText(inputText);
    await checkGrammar(inputText);
  };

  const checkGrammar = async (text) => {
    try {
      const response = await createPrompt({ content: text });
      setErrors(response.errors || []);
    } catch (error) {
      console.error('Error checking grammar:', error);
      setErrors(['Failed to check grammar. Please try again later.']);
    }
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
