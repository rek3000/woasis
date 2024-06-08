import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../routes';
import './css/Welcome.css';
import GrammarChecker from './Grammar';
import PlagiarismChecker from './Plagiarism';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export function Home() {
  const { user, loggedIn, checkLoginState } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [activeTool, setActiveTool] = useState('');

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

  return (
    <div className="home-container">
      {!loggedIn ? (
        <p>Please log in to view your dashboard.</p>
      ) : (
        <>
          <header className="home-header">
            <h1>Dashboard</h1>
          </header>
          <div className="user-info">
            <img src={user?.picture} alt={user?.name} className="user-picture" />
            <div className="user-details">
              <h4>{user?.name}</h4>
              <button className="nav-button" onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className="welcome-container">
            {activeTool === 'grammar' && <GrammarChecker />}
            {activeTool === 'plagiarism' && <PlagiarismChecker />}
            {!activeTool && (
              <>
                <header className="welcome-header">
                  <h1>Welcome to Your Writing Assistant</h1>
                  <nav className="header-nav">
                    <ul>
                      <li><button className="nav-button" onClick={() => handleToolClick('plagiarism')}>Plagiarism Check</button></li>
                      <li><button className="nav-button">Paraphrasing</button></li>
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
  );
}

export default Home;
