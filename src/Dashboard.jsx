import { useState, useEffect } from 'react';

function Dashboard({ setActiveTab }) {
  // --- 1. STATS & EFFICIENCY LOGIC ---
  const [stats, setStats] = useState({ 
    total: 0, 
    pending: 0, 
    done: 0, 
    efficiency: 0 
  });
  
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("myTasks") || "[]");
    const videos = JSON.parse(localStorage.getItem("myVideos") || "[]");
    
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.done).length;
    const efficiencyScore = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    setStats({
      total: totalTasks,
      pending: tasks.filter(t => !t.done).length,
      videoCount: videos.length,
      efficiency: efficiencyScore
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
      <div className="welcome-banner">
        <h2>🚀 Mission Control</h2>
        <p className="quote">"{quote}"</p>
      </div>

      <div className="dashboard-grid">
        
        {/* WIDGET 1: EFFICIENCY CHART */}
        <div className="widget-card efficiency-widget">
            <h3>📊 Efficiency</h3>
            <div className="chart-container">
                <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle" 
                        strokeDasharray={`${stats.efficiency}, 100`} 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    />
                    <text x="18" y="20.35" className="percentage">{stats.efficiency}%</text>
                </svg>
            </div>
            <div className="mini-stats">
                <span>✅ {stats.done} Done</span>
                <span>⏳ {stats.pending} Pending</span>
            </div>
        </div>

        {/* WIDGET 2: QUICK ACTIONS */}
        <div className="widget-card links-widget">
            <h3>🔗 Quick Access</h3>
            <div className="links-grid">
                <a href="https://github.com" target="_blank" className="link-btn github">GitHub</a>
                <a href="https://chatgpt.com" target="_blank" className="link-btn chatgpt">ChatGPT</a>
                <a href="https://mail.google.com" target="_blank" className="link-btn gmail">Gmail</a>
                <div onClick={() => setActiveTab('playlist')} className="link-btn video-link" style={{cursor: 'pointer'}}>
                    📺 Saved Videos ({stats.videoCount})
                </div>
            </div>
        </div>

        {/* WIDGET 3: SCRATCHPAD */}
        <div className="widget-card notes-widget">
            <h3>💡 Scratchpad</h3>
            <textarea 
                placeholder="Paste code snippets here..."
                value={note}
                onChange={handleNoteChange}
            ></textarea>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;