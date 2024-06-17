import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../routes';
import './css/Welcome.css';
import GrammarChecker from './Grammar';
import PlagiarismChecker from './Plagiarism';
import Paraphrasing from './Paraphrasing';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
<<<<<<< HEAD
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deletePrompt, getPromptDetail } from '../services/PromptService';
=======
import Button from '@mui/material/Button';
>>>>>>> ea52429e65f9a739f71d536e73ad58e05265db2d

const serverUrl = process.env.REACT_APP_SERVER_URL;

export function Home() {
  const { user, loggedIn, checkLoginState } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [activeTool, setActiveTool] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
<<<<<<< HEAD
  const [selectedPrompt, setSelectedPrompt] = useState(null);
=======
>>>>>>> ea52429e65f9a739f71d536e73ad58e05265db2d

  const handleToolClick = (tool) => {
    setActiveTool(tool);
  };

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

<<<<<<< HEAD
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

=======
>>>>>>> ea52429e65f9a739f71d536e73ad58e05265db2d
  return (
    <div className="full-size-container">
      <div className="home-container">
        {!loggedIn ? (
          <p>Please log in to view your dashboard.</p>
        ) : (
          <>
            <div className='header'>
              <header className="home-header">
<<<<<<< HEAD
                <button className="nav-button" onClick={toggleDrawer(true)}>Dashboard</button>
=======
              <button className="nav-button" onClick={toggleDrawer(true)}>Dashboard</button>
>>>>>>> ea52429e65f9a739f71d536e73ad58e05265db2d
              </header>
              <div className="user-info">
                <div className="user-details">
                  <h4>{user?.name}</h4>
                  <button className="nav-button" onClick={handleLogout}>Logout</button>
<<<<<<< HEAD
=======

>>>>>>> ea52429e65f9a739f71d536e73ad58e05265db2d
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
<<<<<<< HEAD
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
=======
                <List>
                  <ListItem>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                  {posts.length > 0 ? (
                    posts.map((post, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={`Input: ${post.input}`} />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText primary="No activity yet." />
                    </ListItem>
                  )}
                </List>
>>>>>>> ea52429e65f9a739f71d536e73ad58e05265db2d
                </div>
              </div>
            </Drawer>
            <div className="welcome-container">
              {activeTool === 'grammar' && <GrammarChecker />}
              {activeTool === 'plagiarism' && <PlagiarismChecker />}
              {activeTool === 'paraphrasing' && <Paraphrasing />}
              {!activeTool && (
                <>
                  <header className="welcome-header">
                    <h1>Welcome to our Writing Assistant</h1>
                    <nav className="header-nav">
                      <ul>
                        <li><button className="nav-button" onClick={() => handleToolClick('plagiarism')}>Plagiarism Check</button></li>
                        <li><button className="nav-button" onClick={() => handleToolClick('paraphrasing')}>Paraphrasing</button></li>
                        <li><button className="nav-button" onClick={() => handleToolClick('grammar')}>Grammar Check</button></li>
                      </ul>
                    </nav>
                  </header>
                  <div className="welcome-content">
                    <p>Start improving your writing with our powerful tools.</p>
                  </div>
                </>
              )}
              {selectedPrompt && (
                <div className="prompt-details">
                  <h2>Prompt Details</h2>
                  <p><strong>Input:</strong> {selectedPrompt.input}</p>
                  <p><strong>Result:</strong> {selectedPrompt.result}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
