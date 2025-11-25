import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './Dashboard';
import TaskManager from './TaskManager';
import VideoLibrary from './VideoLibrary';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <aside className="sidebar">
        <h2>My Portal</h2>
        <nav>
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            📊 Dashboard
          </button>
          <button className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>
            📝 Tasks
          </button>
          <button className={activeTab === 'playlist' ? 'active' : ''} onClick={() => setActiveTab('playlist')}>
            📺 Playlists
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div>
            {/* NAME UPDATED HERE */}
            <h1>Welcome, Chandu</h1> 
            <span style={{color: 'var(--text-secondary)'}}>
              {new Date().toLocaleDateString()}
            </span>
          </div>
          <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        <div className="content-area">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'tasks' && <TaskManager />}
          {activeTab === 'playlist' && <VideoLibrary />}
        </div>
      </main>
    </div>
  )
}

export default App