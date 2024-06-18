import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../routes';
import './css/Welcome.css';
import GrammarChecker from './Grammar';
import PlagiarismChecker from './Plagiarism';
import Paraphrasing from './Paraphrasing';
import Paraphrase from './Paraphrase';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deletePrompt, getPromptDetail } from '../services/PromptService';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export function Home() {
  const { user, loggedIn, checkLoginState } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [activeTool, setActiveTool] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  return (
    <div className="full-size-container">
      <div className="home-container">
        {!loggedIn ? (
          <p>Please log in to view your dashboard.</p>
        ) : (
          <>
            <div className='header'>
              <header className="home-header">
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
                </div>
              </div>
            </Drawer>
            <div className="welcome-container">
              {activeTool === 'grammar' && <GrammarChecker />}
              {activeTool === 'plagiarism' && <PlagiarismChecker />}
              {activeTool === 'paraphrasing' && <Paraphrasing />}
              {activeTool === 'paraphrase' && <Paraphrase />}
              {!activeTool && (
                <>
                  <header className="welcome-header">
                    <h1>Welcome to our Writing Assistant</h1>
                    <nav className="header-nav">
                      <ul>
                        <li><button className="nav-button" onClick={() => handleToolClick('plagiarism')}>Plagiarism Check</button></li>
                        <li><button className="nav-button" onClick={() => handleToolClick('paraphrasing')}>Paraphrasing</button></li>
                        <li><button className="nav-button" onClick={() => handleToolClick('paraphrase')}>Paraphrase</button></li>
                        <li><button className="nav-button" onClick={() => handleToolClick('grammar')}>Grammar Check</button></li>
                      </ul>
                    </nav>
                  </header>
                  <div className="welcome-content">
                    <p>Start improving your writing with our powerful tools.</p>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
