import React, { useEffect, useState } from 'react';

import './scss/main.css';
import { IdGenerator } from './utilities/IdGenerator';

const App = () => {

  /////////////////////////////////// STATE SETTINGS ////////////////////////////////

  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const maxLimitOfChars = 50;
  const [numberOfChars, setNumberOfChars] = useState(maxLimitOfChars);
  const [charCounterColor, setCharcounterColor] = useState('chars-ui-counter-green');

  /////////////////////////////////// HANDLERS ////////////////////////////////

  useEffect(() => {
    getTaskList();
  }, []);

  // GET ALL TASKS FROM LOCAL STORAGE.
  const getTaskList = () => {
    try {
      let tasks;
      // Check if we already have 'tasks' key in LS. If YES - get the data from it. If NO - create this key and set initial value as empty array.
      // REMEMEBER - LS stores 'STRING' type of data only. We must convert this string into object at first.
      localStorage.getItem('tasks') ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = [];
      // Set value from LS as actual taskList value.
      setTaskList(tasks);
    } catch (error) {
      console.error(error);
    };
  };

  // HANDLING CHANGES IN THE INPUT FIELD AND CHAR COUNTER.
  const handleInputChange = (event) => {
    const userInput = event.target.value;
    try {
      // Handling changes in the char counter.
      if (userInput.length > maxLimitOfChars) {
        setNumberOfChars('ALARM! CHARS OVERLOAD :)');
        setCharcounterColor('chars-ui-counter-red');
      } else {
        setNumberOfChars(maxLimitOfChars - userInput.length);
        setCharcounterColor('chars-ui-counter-green');
      };
      // Changing task input value from default to user's value. 
      setTaskInput(userInput);
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

  // ADD NEW TASK.
  const addTask = (event) => {
    try {
      let tasks;
      // Extract the list of tasks from LS.
      localStorage.getItem('tasks') ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = [];
      // Create new task with help of previously made function.
      const newTask = createNewTask();
      // Push this new task into task list.
      tasks.push(newTask);
      // Insert updated list of tasks into LS.
      localStorage.setItem('tasks', JSON.stringify(tasks));
      // Visualise the updated task list from LS in UI.
      getTaskList();
      // Clear the task input field.
      setTaskInput('');
      // Prevent page reloading.
      event.preventDefault();
    } catch (error) {
      console.error(error);
    };
  };

  // DELETE ONE SELECTED TASK.
  const deleteSelectedTask = (id) => {
    // Return all tasks except the targeted one (based on task's ID). 
    // ID we get from taskList.map() method which we use in element with '.task-list'. 
    const newTaskList = taskList.filter((task) => task.id !== id);
    // Set new value to task list value...
    setTaskList(newTaskList);
    // ... and push this new task list value into LS. 
    // REMEMBER - LS only accepts 'STRING' data type, so we have to convert the object to a string at first.
    localStorage.setItem('tasks', JSON.stringify(newTaskList));
  };

  // DELTE ALL FROM LOCAL STORAGE.
  const deleteAllTasks = () => {
    try {
      localStorage.clear();
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
              <p className='chars-ui'>Remaining characters: <span className={charCounterColor}>{numberOfChars}</span></p>
              <input
                onChange={handleInputChange}
                type='text'
                className='task-input'
                name='task-input'
                value={taskInput}
                placeholder='New task'
                required>
              </input>
            </div>

            <div className='button-submit text-left'>
              <input
                onClick={addTask}
                type='submit'
                className='btn-main'
                value='ADD TASK'
              />
            </div>
          </form>
        </div>

        <div className='card-action'>
          <h4 className='task-title'>Tasks List</h4>
          <div className='input-field'>
            <input
              type='text'
              className='filter'
              name='filter'
              placeholder='Search task'
            />
          </div>
          <ul className='tasks-list'>
            {taskList.map((task) => {
              return <li key={task.id} className='tasks-list-item'>
                <i className='fas fa-times' onClick={() => deleteSelectedTask(task.id)}></i>
                {task.text}
              </li>
            })}
          </ul>
          <button className='tasks-clear btn-main' onClick={deleteAllTasks}>CLEAR ALL</button>
        </div>
      </div>
    </div>
  )
};

export default App;
