import React, { useState } from "react";
import {FaPlus } from "react-icons/fa";
function ToDoItem({ addTask }) {
  const [task, setTask] = useState("");

  function handleAddTask() {
    addTask(task);
    setTask("");
  }

  return (
    <div className="flex mb-6">
      <input
        onChange={(e) => setTask(e.target.value)}
        value={task}
        placeholder="Enter a task"
        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none "
      ></input>
      <button
        onClick={handleAddTask}
        className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600"
      >
        <FaPlus />
      </button>
    </div>
  );
}

export default ToDoItem;
