import React, { Component } from 'react';

import './scss/main.css';

class App extends Component {
  render() {

    return (
      <div className='container'>
        <div className='card text-center'>
          <div className='card-content'>
            <h2>Notepad</h2>
            <form id='task-form'>
              <div className='input-field'>
                <p className='chars-ui'>Remaining characters: <span className='chars-ui-counter'></span></p>
                <input type='text' className='task-input' name='task-input' placeholder='New task' required></input>
              </div>

              <div className='button-submit text-left'>
                <input type='submit' value="ADD TASK" className='btn-main' />
              </div>
            </form>
          </div>

          <div className='card-action'>
            <h4 className='task-title'>Tasks List</h4>
            <div className='input-field'>
              <input type='text' className='filter' name='filter' placeholder='Search task' />
            </div>
            <ul className='tasks-list'>
            </ul>
            <a href='#' className='tasks-clear btn-main'>CLEAR ALL</a>
          </div>
        </div>
      </div>
    );
  };
};

export default App;
