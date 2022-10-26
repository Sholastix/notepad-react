import React, { useEffect, useState } from 'react';

import './scss/main.css';
import { idGenerator } from './utilities/idGenerator';

const App = () => {
  const [taskList, setTaskList] = useState([]);

  const [taskInput, setTaskInput] = useState('');
  const maxLimitOfChars = 50;
  const [numberOfChars, setNumberOfChars] = useState(maxLimitOfChars);
  const [charCounterColor, setCharCounterColor] = useState('chars-ui-counter-green');

  const [pointerEvents, setPointerEvents] = useState('auto');
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(false);

  const [filterInput, setFilterInput] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    getTaskList();
  }, []);

  useEffect(() => {
    taskFilter();
  }, [filterInput]);

  useEffect(() => {
    taskFilter();
  }, [taskList]);

  // GET ALL TASKS FROM LOCAL STORAGE (LS) AND SHOW IT IN UI.
  const getTaskList = () => {
    try {
      let tasks;
      // Check if we already have 'tasks' key in LS. If YES - get the data from it. If NO - create this key and set initial value as empty array.
      // REMEMEBER - LS stores 'STRING' type of data only. We must convert this string into object at first.
      localStorage.getItem('tasks') ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = [];
      // Set value from LS as current taskList value.
      setTaskList(tasks);
    } catch (error) {
      console.error(error);
    };
  };

  // HANDLING CHANGES IN THE INPUT FIELD & CHAR COUNTER.
  const handleChange = (event) => {
    try {
      const userInput = event.target.value;
      // Set value from user as current taskInput value.
      setTaskInput(userInput);
      // Handling changes in the char counter (text & color).
      if (userInput.length <= maxLimitOfChars) {
        // Calculate number of chars available to the user.
        setNumberOfChars(maxLimitOfChars - userInput.length);
        // Set color of char counter to 'green'.
        setCharCounterColor('chars-ui-counter-green');
        // Turn on cursor and allow user to submit the data.
        setPointerEvents('auto');
        // Visually turn on the 'submit' button.
        setDisabledSubmitButton(false);
      } else {
        // Set warning for user in char counter.
        setNumberOfChars('ALARM! CHARS OVERLOAD :)');
        // Set color of char counter to 'red'.
        setCharCounterColor('chars-ui-counter-red');
        // Turn off cursor and prevent user from submitting the data.
        setPointerEvents('none');
        // Visually turn off the 'submit' button.
        setDisabledSubmitButton(true);
      };
    } catch (error) {
      console.error(error);
    };
  };

  // CREATE NEW TASK.
  const createNewTask = () => {
    return {
      id: idGenerator(),
      text: taskInput,
    };
  };

  // ADD NEW TASK.
  const addTask = (event) => {
    try {
      // Check if user input is empty or not.
      if (taskInput.length === 0) {
        // If empty - show warning.
        alert('PLEASE WRITE SOMETHING!');
        // Prevent page reloading.
        event.preventDefault();
      } else {
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
        // Reset char counter value.
        setNumberOfChars(maxLimitOfChars);
        // Prevent page reloading.
        event.preventDefault();
      };
    } catch (error) {
      console.error(error);
    };
  };

  // DELETE ONE TASK.
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

  // DELETE ALL TASKS.
  const deleteAllTasks = () => {
    try {
      // Checking if we have tasks in task list.
      if (taskList.length > 0) {
        // If YES - ask user if he really want to delete all of it.
        if (window.confirm('ARE YOU SURE?')) {
          // If YES - clear the LS...
          localStorage.clear();
          // ... and refresh task list in UI.
          getTaskList();
        };
      };
    } catch (error) {
      console.error(error);
    };
  };

  // TASK FILTERING.
  // Handling changes in the filter input field.
  const handleFilterChange = (event) => {
    try {
      // Changing filter input value from default to user's value.
      const filterText = event.target.value;
      setFilterInput(filterText);
    } catch (error) {
      console.error(error);
    };
  };

  // Function which filters task list accordingly to user's request.
  const taskFilter = () => {
    setFilteredTasks(taskList.filter((item) => {
      // Creating regexp for dynamic input data from user.
      const regExp = new RegExp(`^${filterInput}`, 'gi');
      // Shows in UI only tasks which matches user request.
      return item.text.match(regExp) ? true : false;
    }));
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
                onChange={handleChange}
                type='text'
                className='task-input'
                name='task-input'
                value={taskInput}
                placeholder='New task'>
              </input>
            </div>

            <div className='button-submit text-left'>
              <input
                onClick={addTask}
                disabled={disabledSubmitButton}
                style={{ pointerEvents }}
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
              onChange={handleFilterChange}
              type='text'
              className='filter'
              name='filter'
              placeholder='Search task'
            />
          </div>
          <ul className='tasks-list'>
            {filteredTasks.map((task) => {
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
