// Inside your Grammar component
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Grammar.css';
import axios from 'axios';
import { createPrompt, deletePrompt, getPromptDetail } from '../services/PromptService';
import { AuthContext } from '../routes';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import PromptsList from './PromptsList';


const Grammar = () => {
  const { user, loggedIn, checkLoginState } = useContext(AuthContext);
  const [inputText, setInputText] = useState('');
  const [posts, setPosts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [grammarCorrections, setGrammarCorrections] = useState([]);
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
      await axios.post(`${process.env.REACT_APP_SERVER_URLl}/auth/logout`);
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

  const handleCheckGrammar = async () => {
    setLoading(true);
    setError(null);
    setGrammarCorrections([]);
    try {
      const promptData = { content: `Can you check grammar of this text: ${inputText}` };
      const createdPrompt = await createPrompt(promptData);
      console.log('Created prompt:', createdPrompt);

      const result = createdPrompt.data.prompt.result;

      if (Array.isArray(result)) {
        setGrammarCorrections(result);
      } else if (typeof result === 'string') {
        setGrammarCorrections([result]);
      } else {
        setError('Unexpected response format.');
      }
    } catch (error) {
      console.error('Error checking grammar:', error.message);
      setError("Failed to check grammar. Please try again.");
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
        <div className="grammar-checker-container">
        <div className="grammar-header">
          <h1>Grammar Checker</h1>
          <span
            className="complete-text-button"
            onClick={loading ? null : handleTextCompletion}
          >
            {loading ? 'Completing...' : 'Complete Text'}
          </span>
        </div>
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
                      {correction}
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

export default Grammar;
