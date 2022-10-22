import React, { useEffect, useState } from 'react';

import './scss/main.css';
import { IdGenerator } from './utilities/IdGenerator';

const App = () => {

  /////////////////////////////////// STATE SETTINGS ////////////////////////////////

  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState('');


  /////////////////////////////////// HANDLERS ////////////////////////////////

  useEffect(() => {
    getTaskList();
  }, []);

  // GET ALL TASKS FROM LOCAL STORAGE.
  const getTaskList = () => {
    try {
      let tasks;
      localStorage.getItem('tasks') ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = [];
      setTaskList(tasks);
    } catch (error) {
      console.error(error);
    };
  };

  // FOLLOWING UP CHANGES IN INPUT FIELD. (REMEMBER TO SET LIMITATIONS FOR INPUT DATA!).
  const handleInputChange = (event) => {
    try {
      // Change task input value from default to user's value. 
      setTaskInput(event.target.value);
    } catch (error) {
      console.error(error);
    };
  };

  // CREATE NEW TASK.
  const createNewTask = () => {
    return {
      id: IdGenerator(),
      text: taskInput,
    };
  };

  // ADD NEW TASK TO LOCAL STORAGE.
  const addTaskToLocalStorage = (event) => {
    try {
      let tasks;
      localStorage.getItem('tasks') ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = [];
      tasks.push(createNewTask());
      localStorage.setItem('tasks', JSON.stringify(tasks));
      getTaskList();
      setTaskInput('');
      event.preventDefault();
    } catch (error) {
      console.error(error);
    };
  };

  // DELETE ONE SELECTED TASK.
  const deleteSelectedTask = (id) => {
    const newTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(newTaskList);
    localStorage.setItem('tasks', JSON.stringify(newTaskList));
  };

  // DELETE ALL TASKS FROM LOCAL STORAGE.
  const clearAllTasksFromLocalStorage = () => {
    try {
      localStorage.clear();
      setTaskList(taskList);
      getTaskList();
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <div className='container'>
      <div className='card text-center'>
        <div className='card-content'>
          <h2>Notepad</h2>
          <form id='task-form'>
            <div className='input-field'>
              <p className='chars-ui'>Remaining characters: <span className='chars-ui-counter'></span></p>
              <input value={taskInput} onChange={handleInputChange} type='text' className='task-input' name='task-input' placeholder='New task' required></input>
            </div>

            <div className='button-submit text-left'>
              <input onClick={addTaskToLocalStorage} type='submit' value="ADD TASK" className='btn-main' />
            </div>
          </form>
        </div>

        <div className='card-action'>
          <h4 className='task-title'>Tasks List</h4>
          <div className='input-field'>
            <input type='text' className='filter' name='filter' placeholder='Search task' />
          </div>
          <ul className='tasks-list'>
            {taskList.map((task) => {
              return <li key={task.id} className='tasks-list-item'>
                <i className='fas fa-times' onClick={() => deleteSelectedTask(task.id)}></i>
                {task.text}
              </li>
            })}
          </ul>
          <button className='tasks-clear btn-main' onClick={clearAllTasksFromLocalStorage}>CLEAR ALL</button>
        </div>
      </div>
    </div>
  )
};

export default App;
