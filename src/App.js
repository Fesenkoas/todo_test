import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";

export const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task, index) => index !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task, key) =>
        key === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Список дел
        </h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="ml-2 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            <FaPlus />
          </button>
        </div>
        <div>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center">
            No tasks to display
            </p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task, key) => (
                <li
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-md border ${
                    task.completed
                      ? "bg-green-100 border-green-400"
                      : "bg-gray-50 border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mx-2"
                    onClick={() => toggleComplete(key)}
                  />
                  <span
                    className={`flex-1 cursor-pointer ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(key)}
                    className="p-3 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    <FaTrashAlt />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
