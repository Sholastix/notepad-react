const TaskList = (props) => {
  return (
    <ul className='tasks-list'>
      {props.filteredTasks.map((task) => {
        return <li key={task.id} className='tasks-list-item'>
          <i className='fas fa-times' onClick={() => props.deleteSelectedTask(task.id)}></i>
          {task.text}
        </li>
      })}
    </ul>
  );
};

export default TaskList;