import React, { useEffect, useState } from 'react';

import './scss/main.css';

const App = () => {

  /////////////////////////////////// STATE SETTINGS ////////////////////////////////

  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState('');


  /////////////////////////////////// HANDLERS ////////////////////////////////

  // useEffect(() => {
  //   getTaskList();
  // });

  // // Get all tasks from local storage.  ()
  // const getTaskList = () => {
  //   try {
  //     const tasks = localStorage.getItem('key');
  //     setTaskList(tasks);
  //   } catch (error) {
  //     console.error(error);
  //   };
  // };

  // FOLLOWING UP CHANGES IN INPUT FIELD. (REMEMBER TO SET LIMITATIONS FOR INPUT DATA!).
  const handleChange = (event) => {
    try {
      // const input = event.target;
  
      // Change task input value from default to user's value. 
      setTaskInput(event.target.value);
    } catch (error) {
      console.error(error);
    };
  };

  // ADD NEW TASK.
  const addTask = (event) => {
    try {
      // Add new input value to list of tasks in our form.
      setTaskList(taskInput);

      // Insert input value in localStorage. (REMEMBER TO ADD KEY GENERATOR FOR VALUES!).
      localStorage.setItem('key', taskInput);

      // Clearing input field after value submitting.
      setTaskInput('');

      // Prevent page reload.
      event.preventDefault();
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
              <input value={taskInput} onChange={handleChange} type='text' className='task-input' name='task-input' placeholder='New task' required></input>
            </div>

            <div className='button-submit text-left'>
              <input onClick={addTask} type='submit' value="ADD TASK" className='btn-main' />
            </div>
          </form>
        </div>

        <div className='card-action'>
          <h4 className='task-title'>Tasks List</h4>
          <div className='input-field'>
            <input type='text' className='filter' name='filter' placeholder='Search task' />
          </div>
          <ul className='tasks-list'>
            {taskList}
          </ul>
          <button className='tasks-clear btn-main'>CLEAR ALL</button>
        </div>
      </div>
    </div>
  )
};

export default App;
