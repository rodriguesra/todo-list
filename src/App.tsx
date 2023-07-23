import "./index.css"
import {TaskObject} from "./components/Task.tsx";
import {useEffect, useState} from "react";
import TaskList from "./components/TaskList.tsx";
import logo from './assets/logo.svg';
import sum from './assets/sum.svg';

function App() {
  // Define the state for the tasks
  const [tasks, setTasks] = useState<TaskObject[]>([]);

  // Define the state for the new task input
  const [newTask, setNewTask] = useState<string>("");

  // Define a function to add a new task
  function addTask(): void {
    // Check if the input is not empty
    if (newTask.trim() !== "") {
      // Create a new task object with the input text and a completed flag
      const newTaskObject = {
        text: newTask,
        completed: false,
      };

      // Update the tasks state with the new task object
      setTasks([...tasks, newTaskObject]);

      // Clear the input field
      setNewTask("");
    }
  }

  // Define a function to toggle the completed status of a task
  function toggleCompleted(index: number): void {
    // Copy the tasks array
    const newTasks = [...tasks];

    // Toggle the completed flag of the task at the given index
    newTasks[index].completed = !newTasks[index].completed;

    // Update the tasks state with the modified array
    setTasks(newTasks);
  }

  // Define a function to remove a task
  function removeTask(index: number): void {
    // Copy the tasks array
    const newTasks = [...tasks];

    // Remove the task at the given index
    newTasks.splice(index, 1);

    // Update the tasks state with the modified array
    setTasks(newTasks);
  }

  // Use useEffect to load and save the tasks from/to localStorage
  useEffect(() => {
    // Load the tasks from localStorage when the app mounts
    const savedTasks = localStorage.getItem("tasks");

    // Check if savedTasks is not null before parsing
    if (savedTasks !== null) {
      const parsedTasks = JSON.parse(savedTasks);
      console.log("Loading tasks from localStorage: ", parsedTasks);
      setTasks(parsedTasks);
    }
  }, []); // Only run once on mount

  useEffect(() => {
    // Save the tasks to localStorage when they change
    if (tasks.length) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log("Saving tasks to localStorage: ", tasks);
    }
  }, [tasks]); // Run whenever tasks change

  return (
    <div className="h-screen bg-gray-600">
      <div className="flex flex-col justify-center items-center bg-gray-700 h-[200px]">
        <img src={logo} alt="" className="w-48 h-20"/>
      </div>
      <div className="text-gray-100 mx-auto py-10 px-4 w-2/3 -mt-16">
        <div className="w-2/3 mx-auto">
          <div className="flex justify-center mb-10">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Adicione uma nova tarefa"
              className="border-none rounded-lg py-2 px-4 w-full mr-2 bg-gray-500"
            />
            <button onClick={addTask}
                    className="flex justify-center items-center gap-2 bg-blue-dark text-white text-xs font-semibold tracking-wide py-2 px-4 rounded-lg shadow-sm hover:bg-blue">Criar
              <img src={sum} alt=""/>
            </button>
          </div>
        </div>
        <TaskList
          tasks={tasks}
          toggleCompleted={toggleCompleted}
          removeTask={removeTask}
        />
      </div>
    </div>
  );
}

export default App
