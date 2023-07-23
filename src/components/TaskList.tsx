import Task, { TaskObject } from "./Task.tsx";
import clipboard from "../assets/clipboard.svg";

// Define the props structure for the TaskList component
interface TaskListProps {
  tasks: TaskObject[];
  toggleCompleted: (id: string) => void;
  removeTask: (id: string) => void;
}

function TaskList({ tasks, toggleCompleted, removeTask }: TaskListProps) {
  // Calcular o número total de tarefas
  const totalTasks = tasks.length;

  // Calcular o número de tarefas concluídas
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="w-2/3 mx-auto space-y-4 mt-16">
      <div className="flex justify-between mb-6 bg-white shadow-sm rounded-lg">
        <h3 className="font-semibold text-blue">
          Tarefas criadas{" "}
          <span className="ml-2 px-3 py-1 bg-gray-500 text-gray-100 text-xs rounded-xl">
            {totalTasks}
          </span>
        </h3>
        <h3 className="font-semibold text-purple">
          Concluídas{" "}
          <span className="ml-2 px-3 py-1 bg-gray-500 text-gray-100 text-xs rounded-xl">
            {totalTasks === 0 ? `0` : `${completedTasks} de ${totalTasks}`}
          </span>
        </h3>
      </div>
      {totalTasks === 0 && <hr className="mb-6 border-gray-400" />}
      {totalTasks === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <img className="mt-10" src={clipboard} alt="" />
          <h2 className="font-semibold text-gray-300 mt-4">
            Você ainda não tem tarefas cadastradas
          </h2>
          <p className="text-gray-300">
            Crie tarefas e organize seus itens a fazer
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleCompleted={toggleCompleted}
            removeTask={removeTask}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
