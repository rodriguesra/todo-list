import {BiTrash} from "react-icons/bi";

// Define the structure of the task object
export interface TaskObject {
  id: string;
  text: string;
  completed: boolean;
}

// Define the props structure for the Task component
interface TaskProps {
  task: TaskObject;
  toggleCompleted: (id: string) => void;
  removeTask: (id: string) => void;
}

function Task({ task, toggleCompleted, removeTask }: TaskProps) {
  return (
    <div className="flex justify-between p-6 rounded-lg bg-gray-500 mb-2">
      <div className="flex">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompleted(task.id)}
          className={`mr-4 form-checkbox rounded-full text-white my-auto ${
            task.completed
              ? "checked:bg-purple"
              : "border-blue border-1 bg-gray-500"
          } box-border`}
        />
        <span
          className={`${
            task.completed
              ? "text-sm line-through text-gray-300"
              : "text-sm text-gray-200"
          }`}
        >
          {task.text}
        </span>
      </div>
      <button
        className="text-red-500 hover:text-red-600 text-gray-300"
        onClick={() => removeTask(task.id)}
      >
        <BiTrash />
      </button>
    </div>
  );
}

export default Task;
