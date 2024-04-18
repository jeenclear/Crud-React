import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseUrl } from "./utils/constant";

// Styles
import './assets/css/style.css';

const App = () => {
  const [input, setInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
     axios.post(`${baseUrl}/save`, {task: input, name: nameInput}).then((res) => {
      console.log(res.data);
      setInput("");
      setNameInput("");
      setUpdateUI((prevState) => !prevState);
     });
  };

  const updateMode = (id, task, name) => {
    console.log(task);
    setInput(task);
    setNameInput(name);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.put(`${baseUrl}/update/${updateId}`, {task: input, name: nameInput}).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput("");
      setNameInput("");
    })
  }
  
  return (
    <main>
      <h1 className="title">CRUD Operations</h1>

      <div className="input_holder">
        <h2>Add Task</h2>
        <div className="form_field">
          <label>Task</label>
          <div class="input_field">
            <input 
              type="text" 
              value={input}
              placeholder="Task"
              onChange={(e) => setInput(e.target.value)} 
            />
          </div>
        </div>
        
        <div className="form_field">
          <label>Name</label>
          <div class="input_field">
            <input 
              type="text" 
              value={nameInput}
              placeholder="Name"
              onChange={(e) => setNameInput(e.target.value)} 
            />
          </div>
        </div>
        
        <div className="form_field">
          <button type="submit" onClick={updateId ? updateTask : addTask}>
            {updateId ? "Update Task": "Add Task"}
          </button>
        </div>
      </div>

      <ul>
        {tasks.map((task) => (
          <List 
            key={task._id} 
            id={task._id} 
            task={task.task} 
            name={task.name} 
            setUpdateUI={setUpdateUI} 
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  )
}

export default App