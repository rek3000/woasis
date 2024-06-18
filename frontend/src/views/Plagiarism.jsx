import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createPrompt } from '../services/PromptService';
import '../assets/css/Plagiarism.css';
import { AuthContext } from '../routes';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

const PlagiarismChecker = () => {
  const { user, loggedIn, checkLoginState } = useContext(AuthContext);
  const [inputText, setInputText] = useState('');
  const [plagiarismResults, setPlagiarismResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const handleCheckPlagiarism = async () => {
    setLoading(true);
    setError(null);
    setPlagiarismResults([]);
    try {
      const promptData = { content: `Can you check if this document has plagiarism: ${inputText}` };
      const createdPrompt = await createPrompt(promptData);
      console.log('Created prompt:', createdPrompt.data.prompt.result); 

      setPlagiarismResults([createdPrompt.data.prompt.result]);
    } catch (error) {
      console.error('Error checking plagiarism:', error.message);
      setError("Failed to check plagiarism. Please try again.");
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
    <div className="plagiarism-checker-container">
    <div className="plagiarism-header">
      <h1>Plagiarism Checker</h1>
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
                  {result}
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

export default PlagiarismChecker;
