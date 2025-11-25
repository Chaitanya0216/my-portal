import { useState, useEffect } from 'react';

function TaskManager() {
  // 1. Load tasks from local storage or start empty
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("myTasks");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newTask, setNewTask] = useState("");

  // 2. Save to local storage whenever 'tasks' changes
  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a task
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    setNewTask(""); // Clear input
  };

  // Function to toggle "Done" status
  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="task-container">
      <h2>📝 Daily Tasks</h2>
      
      {/* Input Area */}
      <div className="input-group">
        <input 
          type="text" 
          placeholder="What needs to be done?" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask} className="add-btn">Add</button>
      </div>

      {/* The List */}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.done ? 'completed' : ''}>
            <span onClick={() => toggleTask(task.id)}>
              {task.done ? "✅" : "⬜"} {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">❌</button>
          </li>
        ))}
      </ul>
      
      {/* Empty State Message */}
      {tasks.length === 0 && <p className="empty-msg">No tasks yet. Enjoy your day! ☀️</p>}
    </div>
  );
}

export default TaskManager;