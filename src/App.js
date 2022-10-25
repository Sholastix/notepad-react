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

  const [pointerEvents, setPointerEvents] = useState('auto');
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(false);

  const [filterInput, setFilterInput] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

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

  // HANDLING CHANGES IN THE INPUT FIELD & CHAR COUNTER.
  const handleChange = (event) => {
    const userInput = event.target.value;

    try {
      // Changing task input value from default to user's value. 
      setTaskInput(userInput);

      // Handling changes in the char counter (text & color).
      if (userInput.length <= maxLimitOfChars) {
        // Calculate number of chars available to the user.
        setNumberOfChars(maxLimitOfChars - userInput.length);
        // Set color of char counter to 'green'.
        setCharcounterColor('chars-ui-counter-green');
        // Turn on cursor and allow user to submit the data.
        setPointerEvents('auto');
        // Visually turn on the 'submit' button.
        setDisabledSubmitButton(false);
      } else {
        // Set warning for user in char counter.
        setNumberOfChars('ALARM! CHARS OVERLOAD :)');
        // Set color of char counter to 'red'.
        setCharcounterColor('chars-ui-counter-red');
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
      id: IdGenerator(),
      text: taskInput,
    };
  };

  // ADD NEW TASK.
  const addTask = (event) => {
    try {
      if (taskInput.length === 0) {
        alert('PLEASE WRITE SOMETHING!');
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
      if (taskList.length > 0) {
        if (window.confirm('ARE YOU SURE?')) {
          localStorage.clear();
          getTaskList();
        };
      };
    } catch (error) {
      console.error(error);
    };
  };

  // TASK FILTERING.
  // Handling changes in task filter input.
  const handleFilterInputChange = (event) => {
    try {
      // Changing filter input value from default to user's value converted to lower case.
      const inputText = event.target.value.toLowerCase();
      setFilterInput(inputText);
    } catch (error) {
      console.error(error);
    };
  };

  // // Get the filtered tasks and show it to user.
  // const taskFilter = () => {
  //   const filtrationResult = taskList.filter((item) => {
  //     const storedText = item.text.toLowerCase();
  //     const regExp = new RegExp(`^${filterInput}`, 'gi');

  //     return storedText.match(regExp) ? true : false;
  //   });

  //   console.log(filtrationResult);
  //   // setFilteredTasks(filtrationResult);
  // };

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
              onChange={handleFilterInputChange}
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
