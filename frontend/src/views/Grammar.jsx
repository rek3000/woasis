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
