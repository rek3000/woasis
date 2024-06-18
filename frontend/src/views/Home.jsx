import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../routes';
import '../assets/css/Welcome.css';
import GrammarChecker from './Grammar';
import PlagiarismChecker from './Plagiarism';
import Paraphrasing from './Paraphrasing';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deletePrompt, getPromptDetail } from '../services/PromptService';
import { useNavigate } from 'react-router-dom';


const serverUrl = process.env.REACT_APP_SERVER_URL;

export function Home() {
  const { user, loggedIn, checkLoginState } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [activeTool] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const navigate = useNavigate();



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
                        <li><button className="nav-button" onClick={() => navigate('/plagiarism')}>Plagiarism Check</button></li>
                        <li><button className="nav-button" onClick={() => navigate('/Paraphrasing')}>Paraphrasing</button></li>
                        <li><button className="nav-button" onClick={() => navigate('/grammar')}>Grammar Check</button></li>
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
