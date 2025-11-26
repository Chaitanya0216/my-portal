import { useState, useEffect } from 'react';
import './App.css';

// --- SUB-COMPONENTS ---

const DashboardView = ({ tasks, schedule }) => {
  const draft = tasks.filter(t => t.status === 'draft').length;
  const prog = tasks.filter(t => t.status === 'inprogress').length;
  const done = tasks.filter(t => t.status === 'done').length;
  const max = Math.max(draft, prog, done, 1);

  return (
    <div className="dashboard-layout">
      <div className="monitor-board">
        <h2>Overview</h2>
        <div className="monitor-grid">
          <div className="monitor-card draft"><h3>Draft</h3><h1>{draft}</h1></div>
          <div className="monitor-card prog"><h3>In Progress</h3><h1>{prog}</h1></div>
          <div className="monitor-card done"><h3>Done</h3><h1>{done}</h1></div>
        </div>
      </div>
      <div className="right-widgets">
          <div className="widget">
              <h3>Completed Tasks</h3>
              <div className="bar-chart-container">
                  <div className="bar-group"><div className="bar-bg"><div className="bar-fill blue" style={{height: `${(draft/max)*100}%`}}></div></div><span className="bar-num">{draft}</span><span className="bar-label">Draft</span></div>
                  <div className="bar-group"><div className="bar-bg"><div className="bar-fill purple" style={{height: `${(prog/max)*100}%`}}></div></div><span className="bar-num">{prog}</span><span className="bar-label">Active</span></div>
                  <div className="bar-group"><div className="bar-bg"><div className="bar-fill pink" style={{height: `${(done/max)*100}%`}}></div></div><span className="bar-num">{done}</span><span className="bar-label">Done</span></div>
              </div>
          </div>
          <div className="widget mini-plan" style={{flex: 1}}>
              <h3>Today's Plan</h3>
              {schedule.length === 0 ? <p style={{color:'var(--text-muted)', fontSize:13, textAlign:'center'}}>No plan yet.</p> : 
                schedule.map((s,i) => (
                  <div key={i} className="mini-item"><span>{s.time}</span> {s.activity}</div>
              ))}
          </div>
      </div>
    </div>
  );
};

const TaskView = ({ tasks, addTask, moveTask, deleteTask }) => {
  const [input, setInput] = useState("");
  const handleAdd = () => { if(!input.trim()) return; addTask(input); setInput(""); };

  return (
    <div className="task-view">
      <div className="header-row">
        <h2>Task To Do</h2> 
        <div style={{display:'flex', gap:10}}>
            <input style={{width:'250px'}} value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAdd()} placeholder="New task..." />
            <button className="add-btn" onClick={handleAdd}>+ Add</button>
        </div>
      </div>
      <div className="kanban-board">
        {['draft', 'inprogress', 'done'].map(status => (
          <div key={status} className={`kanban-col`}>
            <h3>{status.toUpperCase()}</h3>
            {tasks.filter(t => t.status === status).map(t => (
              <div key={t.id} className="task-card">
                <span style={{flex:1}}>{t.text}</span>
                <div className="controls">
                  {status !== 'done' && <button className="move-btn" onClick={() => moveTask(t.id, status === 'draft' ? 'inprogress' : 'done')}>→</button>}
                  <button className="del-btn" onClick={() => deleteTask(t.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const NoteView = ({ notes, addNote, deleteNote }) => {
  const [input, setInput] = useState("");
  const handleAdd = () => { if (!input.trim()) return; addNote(input); setInput(""); };

  return (
    <div className="note-view">
      <h2 style={{marginBottom:20, color:'var(--text-main)'}}>📝 Memorized Things</h2>
      <div className="note-input-bar" style={{display:'flex', gap:10, marginBottom:20}}>
        <input type="text" placeholder="Type a new note..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAdd()} />
        <button className="add-btn" onClick={handleAdd}>Add</button>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:10}}>
        {notes.map(n => (
            <div key={n.id} className="note-card">
                <p style={{margin:0, flex:1, color:'var(--text-main)'}}>{n.text}</p>
                <button className="del-btn-small" onClick={() => deleteNote(n.id)}>🗑️</button>
            </div>
        ))}
      </div>
    </div>
  );
};

const PlaylistView = ({ playlists, addLink }) => (
  <div className="playlist-view">
    <h2 style={{marginBottom:20, color:'var(--text-main)'}}>📺 Learning Playlists</h2>
    <div className="playlist-grid">
      <div className="play-col"><h3>CS / Web-3.0</h3><button className="add-btn" style={{width:'100%', fontSize:12, marginBottom:10}} onClick={() => addLink('cs')}>+ Add Link</button>{playlists.cs.map((l, i) => <a key={i} href={l.url} target="_blank" className="link-card">🔗 {l.title}</a>)}</div>
      <div className="play-col"><h3>Core Subject</h3><button className="add-btn" style={{width:'100%', fontSize:12, marginBottom:10}} onClick={() => addLink('core')}>+ Add Link</button>{playlists.core.map((l, i) => <a key={i} href={l.url} target="_blank" className="link-card">🔗 {l.title}</a>)}</div>
      <div className="play-col"><h3>Q & A</h3><button className="add-btn" style={{width:'100%', fontSize:12, marginBottom:10}} onClick={() => addLink('qa')}>+ Add Link</button>{playlists.qa.map((l, i) => <a key={i} href={l.url} target="_blank" className="link-card">🔗 {l.title}</a>)}</div>
    </div>
  </div>
);

const AIView = ({ openTool }) => (
  <div className="ai-view">
    <h2 style={{marginBottom:20, color:'var(--text-main)'}}>🤖 AI Agent Tools</h2>
    <div className="tools-grid">
      <div className="tool-card" onClick={() => openTool('https://tinyjpg.com/')}><span style={{fontSize:30}}>🖼️</span><br/>Compress Image</div>
      <div className="tool-card" onClick={() => openTool('https://picwish.com/photo-enhancer')}><span style={{fontSize:30}}>✨</span><br/>Enhance Image</div>
      <div className="tool-card" onClick={() => openTool('https://www.ilovepdf.com/jpg_to_pdf')}><span style={{fontSize:30}}>📄</span><br/>Image to PDF</div>
      <div className="tool-card" onClick={() => openTool('https://www.ilovepdf.com/pdf_to_jpg')}><span style={{fontSize:30}}>🖼️</span><br/>PDF to Image</div>
      <div className="tool-card" onClick={() => openTool('https://cloudconvert.com/')}><span style={{fontSize:30}}>🔄</span><br/>File Converter</div>
    </div>
  </div>
);

const PlanView = ({ schedule, addScheduleItem, deleteScheduleItem }) => (
  <div className="plan-view">
    <div className="header-row" style={{display:'flex', justifyContent:'space-between', marginBottom:20}}><h2>📅 Schedule</h2> <button className="add-btn" onClick={addScheduleItem}>+ Add Time</button></div>
    <div className="schedule-list">
      {schedule.map((item, index) => (
        <div key={index} className="schedule-row">
          <div><span style={{color:'var(--primary)', fontWeight:'bold', marginRight:10}}>{item.time}</span> {item.activity}</div>
          <button className="del-btn-small" onClick={() => deleteScheduleItem(index)}>×</button>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP ---

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light'); // Default Light

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((curr) => (curr === 'dark' ? 'light' : 'dark'));
  
  // Data States
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("myTasks")) || []);
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("myNotesList")) || []);
  const [playlists, setPlaylists] = useState(() => JSON.parse(localStorage.getItem("myPlaylists")) || { cs: [], core: [], qa: [] });
  const [schedule, setSchedule] = useState(() => JSON.parse(localStorage.getItem("mySchedule")) || []);

  useEffect(() => { localStorage.setItem("myTasks", JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem("myNotesList", JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem("myPlaylists", JSON.stringify(playlists)); }, [playlists]);
  useEffect(() => { localStorage.setItem("mySchedule", JSON.stringify(schedule)); }, [schedule]);

  // Actions
  const addTask = (text) => setTasks([...tasks, { id: Date.now(), text, status: 'draft' }]);
  const moveTask = (id, newStatus) => setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  const deleteTask = (id) => { if(window.confirm("Delete?")) setTasks(tasks.filter(t => t.id !== id)); };
  const addNote = (text) => setNotes([...notes, { id: Date.now(), text }]);
  const deleteNote = (id) => setNotes(notes.filter(n => n.id !== id));
  const addLink = (category) => { const title = prompt("Link Title:"); const url = prompt("URL:"); if(title && url) setPlaylists({ ...playlists, [category]: [...playlists[category], { title, url }] }); };
  const addScheduleItem = () => { const time = prompt("Time:"); const activity = prompt("Activity:"); if(time && activity) setSchedule([...schedule, { time, activity }]); };
  const deleteScheduleItem = (index) => { const newSchedule = [...schedule]; newSchedule.splice(index, 1); setSchedule(newSchedule); };
  const openTool = (url) => window.open(url, '_blank');

  return (
    <div className="app-container">
      
      {/* SIDEBAR */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? '◀' : '☰'}
        </div>
        
        <div className="nav-items">
          <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <span className="nav-icon">📊</span> {isSidebarOpen && "Dashboard"}
          </button>
          <button className={`nav-btn ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>
            <span className="nav-icon">📝</span> {isSidebarOpen && "Task To Do"}
          </button>
          <button className={`nav-btn ${activeTab === 'note' ? 'active' : ''}`} onClick={() => setActiveTab('note')}>
            <span className="nav-icon">💡</span> {isSidebarOpen && "Note"}
          </button>
          <button className={`nav-btn ${activeTab === 'playlist' ? 'active' : ''}`} onClick={() => setActiveTab('playlist')}>
            <span className="nav-icon">📺</span> {isSidebarOpen && "Playlist"}
          </button>
          <button className={`nav-btn ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>
            <span className="nav-icon">🤖</span> {isSidebarOpen && "AI Agent"}
          </button>
          <button className={`nav-btn ${activeTab === 'plan' ? 'active' : ''}`} onClick={() => setActiveTab('plan')}>
            <span className="nav-icon">📅</span> {isSidebarOpen && "Plan"}
          </button>
        </div>

        {/* THEME TOGGLE */}
        <div style={{marginTop: 'auto', marginBottom: 20, width: '100%', padding: '0 20px'}}>
            <button className="nav-btn" onClick={toggleTheme}>
                <span className="nav-icon">{theme === 'dark' ? '☀️' : '🌙'}</span> {isSidebarOpen && (theme === 'dark' ? 'Light Mode' : 'Dark Mode')}
            </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar"><h1>TASK MANAGEMENT</h1><div className="profile-badge">Chandu</div></header>
        <div className="content-area">
          {activeTab === 'dashboard' && <DashboardView tasks={tasks} schedule={schedule} />}
          {activeTab === 'tasks' && <TaskView tasks={tasks} addTask={addTask} moveTask={moveTask} deleteTask={deleteTask} />}
          {activeTab === 'note' && <NoteView notes={notes} addNote={addNote} deleteNote={deleteNote} />}
          {activeTab === 'playlist' && <PlaylistView playlists={playlists} addLink={addLink} />}
          {activeTab === 'ai' && <AIView openTool={openTool} />}
          {activeTab === 'plan' && <PlanView schedule={schedule} addScheduleItem={addScheduleItem} deleteScheduleItem={deleteScheduleItem} />}
        </div>
      </main>
    </div>
  );
}

export default App;