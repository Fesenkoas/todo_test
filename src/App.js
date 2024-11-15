import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";

export const App = () => {
  //стейт общих задач с проверкой, имеется ли локальное хранилище при первой загрузке страницы
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  //временный стейт для новои задачи 
  const [newTask, setNewTask] = useState("");

  //кнопка добавления задичи в список
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  //кнопка удаления задачи из списка
  const deleteTask = (id) => {
    setTasks(tasks.filter((task, index) => index !== id));
  };

  //чек выполения задачи
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task, key) =>
        key === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //при обовлении стейта, рендерится страница и сохраняет список в локальное хранилище  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        To-Do List
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
