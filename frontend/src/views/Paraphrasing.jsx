import React, { useState } from 'react';
import './css/Paraphrase.css';
import { createPrompt, getPromptDetail } from '../services/PromptService';

const Paraphrasing = () => {
  const [inputText, setInputText] = useState('');
  const [paraphrases, setParaphrases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleParaphrase = async () => {
    setLoading(true);
    setError(null);
    setParaphrases([]);
    try {
      const promptData = { content: `Can you paraphrase this text: ${inputText}` };
      const createdPrompt = await createPrompt(promptData);
      console.log('Created prompt:', createdPrompt); 

      const promptDetail = await getPromptDetail(createdPrompt._id);
      console.log('Prompt detail:', promptDetail);

      setParaphrases(promptDetail.result);
    } catch (error) {
      console.error('Error generating paraphrases:', error.message);
      setError("Failed to generate paraphrases. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChooseParaphrase = (paraphrase) => {
    console.log('Selected paraphrase:', paraphrase);
    // Add additional logic here if needed
  };

  return (
    <div className="paraphrasing-container">
      <h1>Paraphrasing</h1>
      <textarea
        value={inputText}
        onChange={handleChange}
        placeholder="Enter your text here..."
      />
      <button onClick={handleParaphrase} disabled={loading}>
        {loading ? 'Generating...' : 'Paraphrase'}
      </button>
      {error && <p className="error">{error}</p>}
      {paraphrases.length > 0 && (
        <div className="paraphrases">
          <h2>Choose a Paraphrase:</h2>
          <ul>
            {paraphrases.map((paraphrase, index) => (
              <li key={index}>
                <button onClick={() => handleChooseParaphrase(paraphrase)}>
                  {paraphrase}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Paraphrasing;
