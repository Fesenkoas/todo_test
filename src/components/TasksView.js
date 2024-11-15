import React from "react";
import Task from "./Task";

function TasksView({tasks, deleteTask, toggleCompletedCheckBox}) {
  return (
    <div className="TasksView space-y-2">
      {tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <Task key={index} task={task} deleteTask={deleteTask} toggleCompletedCheckBox={toggleCompletedCheckBox} index={index} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No tasks to display</p>
      )}
    </div>
  );
}

export default TasksView;
