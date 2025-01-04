import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://your-backend-api.com/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task to the backend and update the UI
  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await axios.post('https://your-backend-api.com/tasks', { task: newTask });
      setTasks([...tasks, response.data]); // Update task list with new task
      setNewTask(''); // Clear the input field
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Delete a task from the backend and update the UI
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`https://your-backend-api.com/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId)); // Update UI to remove the deleted task
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      
      {/* Input field and Add button */}
      <div>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Enter new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task list */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
