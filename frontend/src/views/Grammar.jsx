// Inside your Grammar component
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Grammar.css';
import axios from 'axios';
import { createPrompt, deletePrompt, getPromptDetail } from '../services/PromptService';
import { AuthContext } from '../routes';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Highlighter from 'react-highlight-words';

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
          const { data: { posts } } = await axios.get(`${serverUrl}/user/posts`);
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
      await axios.post(`${serverUrl}/auth/logout`);
      checkLoginState();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleDelete = async (id) => {
    try {
      await deletePrompt(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostClick = async (id) => {
    try {
      const promptDetail = await getPromptDetail(id);
      setSelectedPrompt(promptDetail);
    } catch (err) {
      console.error(err);
    }
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
                {posts.length > 0 ? (
                  posts.map((post, index) => (
                    <div className="prompt-container" key={index}>
                      <ListItem button onClick={() => handlePostClick(post.id)}>
                        <ListItemText primary={`${post.input}`} />
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(post.id)}>
                          <DeleteIcon className="delete-button" />
                        </IconButton>
                      </ListItem>
                    </div>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No activity yet." />
                  </ListItem>
                )}
              </List>
            </div>
          </div>
        </Drawer>
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
              <Highlighter
                highlightClassName="highlight"
                searchWords={grammarCorrections.map(correction => correction)}
                autoEscape={true}
                textToHighlight={inputText}
              />
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
