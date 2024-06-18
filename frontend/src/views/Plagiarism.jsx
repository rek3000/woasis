import React, { useState } from 'react';
import './css/Plagiarism.css';
import { createPrompt, getPromptDetail } from '../services/PromptService';

const PlagiarismChecker = () => {
  const [inputText, setInputText] = useState('');
  const [plagiarismResults, setPlagiarismResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleCheckPlagiarism = async () => {
    setLoading(true);
    setError(null);
    setPlagiarismResults([]);
    try {
      const promptData = { content: `Check for plagiarism in this text: ${inputText}` };
      const createdPrompt = await createPrompt(promptData);
      console.log('Created prompt:', createdPrompt); 

      const promptDetail = await getPromptDetail(createdPrompt._id);
      console.log('Prompt detail:', promptDetail);

      setPlagiarismResults([promptDetail.result]);
    } catch (error) {
      console.error('Error checking plagiarism:', error.message);
      setError("Failed to check plagiarism. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChooseResult = (result) => {
    console.log('Selected result:', result);
  };

  return (
    <div className="plagiarism-checker-container">
      <h1>Plagiarism Checker</h1>
      <textarea
        value={inputText}
        onChange={handleChange}
        placeholder="Paste your text here..."
      />
      <button onClick={handleCheckPlagiarism} disabled={loading}>
        {loading ? 'Checking...' : 'Check for Plagiarism'}
      </button>
      {error && <p className="error">{error}</p>}
      {plagiarismResults.length > 0 && (
        <div className="plagiarism-results">
          <h2>Plagiarism Results:</h2>
          <ul>
            {plagiarismResults.map((result, index) => (
              <li key={index}>
                <button onClick={() => handleChooseResult(result)}>
                  {result}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlagiarismChecker;
