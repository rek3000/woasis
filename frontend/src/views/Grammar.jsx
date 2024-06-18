import React, { useState } from 'react';
import './css/Grammar.css';
import { createPrompt, getPromptDetail } from '../services/PromptService';

const Grammar = () => {
  const [inputText, setInputText] = useState('');
  const [grammarCorrections, setGrammarCorrections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleCheckGrammar = async () => {
    setLoading(true);
    setError(null);
    setGrammarCorrections([]);
    try {
      const promptData = { content: `Can you grammar and highlight correction of this text: ${inputText}` };
      const createdPrompt = await createPrompt(promptData);
      console.log('Created prompt:', createdPrompt); 

      const promptDetail = await getPromptDetail(createdPrompt._id);
      console.log('Prompt detail:', promptDetail);

      setGrammarCorrections(promptDetail.result);
    } catch (error) {
      console.error('Error checking grammar:', error.message);
      setError("Failed to check grammar. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChooseCorrection = (correction) => {
    console.log('Selected correction:', correction);
  };

  return (
    <div className="grammar-checker-container">
      <h1>Grammar Checker</h1>
      <textarea
        value={inputText}
        onChange={handleChange}
        placeholder="Type your text here..."
      />
      <button onClick={handleCheckGrammar} disabled={loading}>
        {loading ? 'Checking...' : 'Check Grammar'}
      </button>
      {error && <p className="error">{error}</p>}
      {grammarCorrections.length > 0 && (
        <div className="grammar-corrections">
          <h2>Grammar Corrections:</h2>
          <ul>
            {grammarCorrections.map((correction, index) => (
              <li key={index}>
                <button onClick={() => handleChooseCorrection(correction)}>
                  {correction}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Grammar;
=======
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