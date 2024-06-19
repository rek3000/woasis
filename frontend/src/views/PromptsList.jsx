import React, { useState, useEffect } from 'react';

const Prompt = ({ prompt }) => (
  <div style={styles.promptContainer}>
    <p><strong>Content:</strong> {prompt.content}</p>
    <p><strong>Result:</strong> {prompt.result}</p>
    <p><strong>Created At:</strong> {new Date(prompt.createdAt).toLocaleString()}</p>
    <p><strong>Updated At:</strong> {new Date(prompt.updatedAt).toLocaleString()}</p>
    <hr />
  </div>
);

const PromptsList = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/prompt/get-all')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          const sortedPrompts = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPrompts(sortedPrompts);
        } else {
          console.error('Failed to fetch prompts:', data.message);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching prompts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.promptsList}>
      {prompts.map(prompt => (
        <Prompt key={prompt._id} prompt={prompt} />
      ))}
    </div>
  );
};

const styles = {
  promptContainer: {
    border: '1px solid #ccc',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  promptsList: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
  },
};

export default PromptsList;