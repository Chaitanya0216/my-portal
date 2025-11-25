import { useState, useEffect } from 'react';

function Dashboard({ setActiveTab }) {
  // --- 1. STATISTICS LOGIC ---
  const [stats, setStats] = useState({ taskCount: 0, videoCount: 0 });
  
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("myTasks") || "[]");
    const videos = JSON.parse(localStorage.getItem("myVideos") || "[]");
    setStats({
      taskCount: tasks.filter(t => !t.done).length,
      videoCount: videos.length
    });
  }, []);

  // --- 2. DAILY QUOTE LOGIC ---
  const [quote, setQuote] = useState("");
  const quotes = [
    "The only way to do great work is to love what you do.",
    "Discipline is doing what needs to be done, even if you don't want to.",
    "Code is like humor. When you have to explain it, it’s bad.",
    "Your future is created by what you do today, not tomorrow.",
    "Dream big. Work hard. Stay humble."
  ];

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  // --- 3. SCRATCHPAD LOGIC ---
  const [note, setNote] = useState(() => localStorage.getItem("quickNote") || "");
  
  const handleNoteChange = (e) => {
    setNote(e.target.value);
    localStorage.setItem("quickNote", e.target.value);
  };

  return (
    <div className="dashboard-container">
      {/* SECTION A: Welcome & Quote */}
      <div className="welcome-banner">
        <h2>🚀 Ready to grind, Chandu?</h2>
        <p className="quote">"{quote}"</p>
      </div>

      <div className="dashboard-grid">
        {/* WIDGET 1: Status Cards */}
        <div className="widget-col">
            <div className="stat-card task-card" onClick={() => setActiveTab('tasks')}>
                <h3>📝 Tasks Pending</h3>
                <div className="number">{stats.taskCount}</div>
            </div>
            <div className="stat-card video-card" onClick={() => setActiveTab('playlist')}>
                <h3>📺 Saved Videos</h3>
                <div className="number">{stats.videoCount}</div>
            </div>
        </div>

        {/* WIDGET 2: Quick Links */}
        <div className="widget-card links-widget">
            <h3>🔗 Quick Access</h3>
            <div className="links-grid">
                <a href="https://github.com" target="_blank" className="link-btn github">GitHub</a>
                <a href="https://chatgpt.com" target="_blank" className="link-btn chatgpt">ChatGPT</a>
                <a href="https://mail.google.com" target="_blank" className="link-btn gmail">Gmail</a>
                <a href="#" className="link-btn college">College Portal</a>
            </div>
        </div>

        {/* WIDGET 3: Scratchpad */}
        <div className="widget-card notes-widget">
            <h3>💡 Scratchpad</h3>
            <textarea 
                placeholder="Paste code snippets or ideas here..."
                value={note}
                onChange={handleNoteChange}
            ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;