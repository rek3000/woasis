import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createPrompt } from '../services/PromptService';
import '../assets/css/Paraphrase.css';
import { AuthContext } from '../routes';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

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

  const handlePostClick = async () => {
    try {
      setSelectedPrompt(createdPrompt.data.prompt.result);
    } catch (err) {
      console.error(err);
    }
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
