import React, { useEffect, useState } from "react";
import "./App.css";
import ToDoItem from "./components/ToDoItem";
import TasksView from "./components/TasksView";

function loadFromLocalStorage() {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
}

function App() {
  const [tasks, setTasks] = useState(loadFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(newTask) {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
    }
  }

  function deleteTask(indexToDelete) {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  }

  function toggleCompletedCheckBox(indexToToggle) {
    setTasks(
      tasks.map((task, index) =>
        index === indexToToggle ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-10">
      <div className="bg-white p-6 rounded-lg w-[380px]">
        <h1 className="text-2xl font-bold text-center mb-6">
          TODO List
        </h1>
        <ToDoItem addTask={handleAddTask} />
        <TasksView
          tasks={tasks}
          deleteTask={deleteTask}
          toggleCompletedCheckBox={toggleCompletedCheckBox}
        />
      </div>
    </div>
  );
}

export default App;
