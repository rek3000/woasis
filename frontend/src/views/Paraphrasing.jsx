import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createPrompt } from '../services/PromptService';
import '../assets/css/Paraphrase.css';
import { AuthContext } from '../routes';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import PromptsList from './PromptsList';

const Paraphrasing = () => {
  const { user, loggedIn, checkLoginState } = useContext(AuthContext);
  const [inputText, setInputText] = useState('');
  const [posts, setPosts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paraphrases, setParaphrases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      const fetchPosts = async () => {
        try {
          const { data: { posts } } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/posts`);
          setPosts(posts);
        } catch (err) {
          console.error(err);
        }
      };
      fetchPosts();
    }
  }, [loggedIn]);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/logout`);
      checkLoginState();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };


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
      setParaphrases([createdPrompt.data.prompt.result]);
    } catch (error) {
      setError("Failed to generate paraphrases. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTextCompletion = async () => {
    setLoading(true);
    setError(null);
    try {
      const promptData = { content: `Please complete this text: ${inputText}` };
      const createdPrompt = await createPrompt(promptData);
      setInputText(createdPrompt.data.prompt.result);
    } catch (error) {
      setError("Failed to complete text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="full-size-container">
      <div className="home-container">
        <div className='header'>
          <header>
            <button className="nav-button" onClick={toggleDrawer(true)}>Dashboard</button>
          </header>
          <div className="user-info">
            <div className="user-details">
              <h4>{user?.name}</h4>
              <button className="nav-button" onClick={handleLogout}>Logout</button>
            </div>
            <img src={user?.picture} alt={user?.name} className="user-picture" />
          </div>
        </div>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
                <div className="drawer-container">
                  <List>
                    <div className="drawer-title">Dashboard</div>
                    <PromptsList />
                  </List>
                </div>
              </div>
            </Drawer>
        <div className="paraphrasing-container">
          <div className="paraphrasing-header">
            <h1>Paraphrasing</h1>
            <span
              className="complete-text-button"
              onClick={loading ? null : handleTextCompletion}
            >
              {loading ? 'Completing...' : 'Complete Text'}
              {' '}
            </span>
          </div>
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
              <h2>Paraphrase Results:</h2>
              <ul>
                {paraphrases.map((paraphrase, index) => (
                  <li key={index}>
                    {paraphrase}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className='back-button-container'>
            <Link to="/" className="nav-button-back">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paraphrasing;
