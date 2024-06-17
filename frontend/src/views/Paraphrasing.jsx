<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
import './css/Paraphrase.css';
import { createPrompt, getPromptDetail } from '../services/PromptService';
import { getCurrentUser } from '../services/UserService';

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
      const promptData = { content: inputText };
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

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        console.log('Current User:', user); // Logging the current user data
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };
    fetchCurrentUser();
  }, [])

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
=======
<<<<<<< HEAD
import React, { useState} from 'react';
import './css/Paraphrase.css';
import { createPrompt, getPromptDetail } from '../services/PromptService';
=======
import React, { useState, useEffect } from 'react';
import './css/Paraphrase.css';
import { createPrompt, getPromptDetail } from '../services/PromptService';
import { getCurrentUser } from '../services/UserService';
>>>>>>> ea52429e65f9a739f71d536e73ad58e05265db2d

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
      const promptData = { content: inputText };
      const createdPrompt = await createPrompt(promptData);
<<<<<<< HEAD
      console.log('Created prompt:', createdPrompt); 
=======
      console.log('Created prompt:', createdPrompt);
>>>>>>> ea52429e65f9a739f71d536e73ad58e05265db2d

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

  const fetchCurrentUser = async () => {
    try {
      // Retrieve token from localStorage, sessionStorage, or cookies
      const token = localStorage.getItem('token'); // Example using localStorage
      if (!token) {
        throw new Error('Token not found');
      }
      const currentUser = await getCurrentUser(token);
      console.log("Current User:", currentUser);
      // Handle currentUser data as needed in your component state or context
    } catch (error) {
      console.error("Error fetching current user:", error);
      // Handle error state or display error message
      setError("Failed to fetch current user. Please login again.");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

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
>>>>>>> Stashed changes
