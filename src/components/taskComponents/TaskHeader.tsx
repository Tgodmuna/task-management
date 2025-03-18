import { useContext } from "react";
import { ChevronDown, Plus } from "lucide-react";
import type { TaskContextType, TaskHeaderPropType } from "../../types";
import { TaskContext } from "./Task";
import { AppContext } from "../../App";

const TaskHeader: React.FC<TaskHeaderPropType> = ({
  tasks,
  title = "To-do",
  dropdownContext,
  setter,
}) => {
  const taskContext = useContext(TaskContext) as TaskContextType | null;
  const appContext = useContext(AppContext);
  const taskCount = tasks.length;
  const toggleDropdown = () => {
    const setterKey = `set${setter}` as keyof TaskContextType;
    if (taskContext && typeof taskContext[setterKey] === "function") {
      (taskContext[setterKey] as Function)((prev: boolean) => !prev);
    }
  };

  return (
    <div className="flex justify-between border-gray-500 items-center p-3 bg-slate-200 shadow-md rounded-lg">
      {/* Task Count with Dropdown */}
      <div className="flex items-center gap-2 relative">
        <button onClick={toggleDropdown}>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              dropdownContext ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
        <h2 className="text-lg font-semibold">
          {title} <span className="size-4 text-sm p-2 rounded-full bg-blue-600">{taskCount}</span>
        </h2>
      </div>

      {/* Add Task Button */}
      <button
        title="Add Task"
        onClick={() => appContext?.onCreateTask()}
        className="flex items-center gap-2 text-white px-4 py-2 rounded-md hover:bg-gray-400">
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TaskHeader;
