import { useState, useEffect } from 'react';

function TaskManager() {
  // Load tasks (Default to empty list)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("myTasks");
    // Migration: If old data exists with 'done', reset it. If clean, use empty array.
    try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0 && parsed[0].status === undefined) {
            return []; // Reset if old format to avoid bugs
        }
        return parsed || [];
    } catch {
        return [];
    }
  });
  
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      id: Date.now(),
      text: newTask,
      status: 'todo', // Default status
      tag: 'Main Task' // Placeholder for future features
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  // Move task to next stage
  const moveTask = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Helper to render a column
  const TaskColumn = ({ title, status, colorClass }) => (
    <div className={`kanban-column ${colorClass}`}>
        <div className="column-header">
            <h3>{title}</h3>
            <span className="count">{tasks.filter(t => t.status === status).length}</span>
        </div>
        
        <div className="kanban-list">
            {tasks.filter(t => t.status === status).map(task => (
                <div key={task.id} className="kanban-card">
                    <span className="task-tag">{task.tag}</span>
                    <p>{task.text}</p>
                    
                    <div className="card-actions">
                        {status === 'todo' && (
                            <button onClick={() => moveTask(task.id, 'inprogress')} className="action-btn start">▶ Start</button>
                        )}
                        {status === 'inprogress' && (
                            <button onClick={() => moveTask(task.id, 'done')} className="action-btn finish">✔ Finish</button>
                        )}
                        {status === 'done' && (
                            <button onClick={() => moveTask(task.id, 'todo')} className="action-btn restart">↺ Redo</button>
                        )}
                        <button onClick={() => deleteTask(task.id)} className="delete-btn">🗑️</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  return (
    <div className="task-manager-container">
      {/* Input Area */}
      <div className="add-task-bar">
        <input 
          type="text" 
          placeholder="Add a new task..." 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask} className="add-main-btn">+ Add Task</button>
      </div>

      {/* The 3 Columns */}
      <div className="kanban-board">
        <TaskColumn title="📌 To Do" status="todo" colorClass="col-todo" />
        <TaskColumn title="⚡ In Progress" status="inprogress" colorClass="col-doing" />
        <TaskColumn title="✅ Completed" status="done" colorClass="col-done" />
      </div>
    </div>
  );
}

export default TaskManager;