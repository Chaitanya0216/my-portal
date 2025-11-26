import { useState, useEffect } from 'react';
import TaskManager from './TaskManager';

function Dashboard({ setActiveTab }) {
  // --- STATS LOGIC ---
  const [stats, setStats] = useState({ efficiency: 0, done: 0, pending: 0 });
  
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("myTasks") || "[]");
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'done').length;
    const efficiency = total === 0 ? 0 : Math.round((done / total) * 100);
    setStats({ efficiency, done, pending: total - done });
  }, []);

  // --- EDITABLE SCHEDULE LOGIC (New!) ---
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem("mySchedule");
    // Default Plan if nothing is saved
    return saved ? JSON.parse(saved) : [
      { time: "09:00", activity: "Code 💻", type: "work" },
      { time: "13:00", activity: "Lunch 🍔", type: "break" }
    ];
  });

  const [newPlan, setNewPlan] = useState({ time: "", activity: "", type: "work" });

  useEffect(() => {
    localStorage.setItem("mySchedule", JSON.stringify(schedule));
  }, [schedule]);

  const addPlan = () => {
    if (!newPlan.time || !newPlan.activity) return;
    setSchedule([...schedule, newPlan]);
    setNewPlan({ time: "", activity: "", type: "work" }); // Reset inputs
  };

  const deletePlan = (indexToDelete) => {
    setSchedule(schedule.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="dashboard-layout">
      
      {/* LEFT SIDE: KANBAN */}
      <div className="main-board-section">
        <div className="section-header">
            <h2>Task Management</h2>
            <p className="subtitle">Track your progress</p>
        </div>
        <TaskManager />
      </div>

      {/* RIGHT SIDE: WIDGETS */}
      <div className="sidebar-widgets">
        
        {/* 1. PROFILE */}
        <div className="widget-card profile-widget">
            <div className="profile-header">
                <div>
                    <h3>Chandu</h3>
                    <p>CSE Student</p>
                </div>
                <div className="profile-icon">👨‍💻</div>
            </div>
        </div>

        {/* 2. EFFICIENCY */}
        <div className="widget-card efficiency-widget">
            <h3>Efficiency</h3>
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
        </div>

        {/* 3. EDITABLE PLAN */}
        <div className="widget-card schedule-widget">
            <h3>Plan Your Day</h3>
            
            {/* Input Area */}
            <div className="plan-input-row">
                <input 
                    type="time" 
                    value={newPlan.time}
                    onChange={(e) => setNewPlan({...newPlan, time: e.target.value})}
                    className="mini-input"
                />
                <input 
                    type="text" 
                    placeholder="Activity..." 
                    value={newPlan.activity} 
                    onChange={(e) => setNewPlan({...newPlan, activity: e.target.value})}
                    className="mini-input grow"
                />
                <select 
                    value={newPlan.type} 
                    onChange={(e) => setNewPlan({...newPlan, type: e.target.value})}
                    className="mini-select"
                >
                    <option value="work">🟣</option>
                    <option value="school">🔵</option>
                    <option value="break">🟡</option>
                    <option value="health">🔴</option>
                </select>
                <button onClick={addPlan} className="mini-add-btn">+</button>
            </div>

            {/* The List */}
            <div className="schedule-list">
                {schedule.map((item, index) => (
                    <div key={index} className={`schedule-item ${item.type}`}>
                        <div>
                            <span className="time">{item.time}</span>
                            <div className="activity">{item.activity}</div>
                        </div>
                        <button onClick={() => deletePlan(index)} className="mini-delete-btn">×</button>
                    </div>
                ))}
                {schedule.length === 0 && <p className="subtitle" style={{textAlign:'center', marginTop:10}}>No plan yet.</p>}
            </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;