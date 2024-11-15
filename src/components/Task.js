import React from "react";
import { FaTrashAlt } from "react-icons/fa";

function Task({ deleteTask, task, toggleCompletedCheckBox, index }) {

  return (
    <li className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md ">
      <input
        type="checkbox"
        className="mx-2"
        onChange={() => toggleCompletedCheckBox(index)}
        
      />
      <p className={task.completed ? "text-gray-700 line-through" : "text-gray-700"}>{task.text}</p>
      <button
        onClick={() => deleteTask(index)}
        className="p-3 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        <FaTrashAlt />
      </button>
    </li>
  );
}

export default Task;
