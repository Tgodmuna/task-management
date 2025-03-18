import React, { useContext, useMemo } from "react";
import TableHeader from "./TaskTableHead";
import TableRow from "./TaskTableRow";
import { TaskContext } from "./Task";
import TaskHeader from "./TaskHeader";

const TaskList: React.FC = () => {
  const taskContext = useContext(TaskContext);
  const tasks = taskContext?.tasks;

  // Filter tasks by status
  const inProgressTasks = useMemo(
    () => tasks && tasks.filter((task) => task.status?.toLowerCase() === "in progress"),
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks && tasks.filter((task) => task.status?.toLowerCase() === "completed"),
    [tasks]
  );

  //on empty task list
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg  shadow-md h-[100vh] w-full flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold mb-4">Task List</h2>
        <div className="text-center text-gray-500">
          <svg
            className="w-16 h-16 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m2 0a2 2 0 100-4 2 2 0 000 4zm-2 0a2 2 0 11-4 0 2 2 0 014 0zm-2 0a2 2 0 100-4 2 2 0 000 4zm-2 0a2 2 0 11-4 0 2 2 0 014 0zm-2 0a2 2 0 100-4 2 2 0 000 4zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <p>No tasks available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 flex bg-yellow-100 p-2 flex-col`}>
      {/* todo tasks */}
      {tasks && tasks.length > 0 && (
        <div className={`w-full`}>
          <TaskHeader
            title={"todo"}
            dropdownContext={taskContext?.isTaskListDropdownOpen}
            tasks={tasks}
            setter={"IsTaskListDropdownOpen"}
          />
          <div
            className={`${
              taskContext?.isTaskListDropdownOpen ? "h-full p-4  transition-all duration-500" : ""
            }h-0 p-0 transition-all overflow-hidden duration-500  bg-white  rounded-lg shadow-md w-full `}>
            <table className="w-full border-collapse">
              <TableHeader />
              <TableRow tasks={tasks} />
            </table>
          </div>
        </div>
      )}

      {/* In Progress Tasks */}
      {inProgressTasks && inProgressTasks.length > 0 && (
        <div className={`w-full`}>
          <TaskHeader
            title={"in-progress"}
            dropdownContext={taskContext?.inProgressTaskList}
            tasks={inProgressTasks}
            setter={"InProgressTaskList"}
          />

          <div
            className={`${
              taskContext?.inProgressTaskList ? "h-full p-4  transition-all duration-500" : ""
            }h-0 p-0 transition-all overflow-hidden duration-500  bg-white  rounded-lg shadow-md w-full  `}>
            <table className={"w-full border-collapse"}>
              <TableHeader />
              <TableRow tasks={inProgressTasks} />
            </table>
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks && completedTasks.length > 0 && (
        <div className={`w-full`}>
          <TaskHeader
            tasks={completedTasks}
            dropdownContext={taskContext?.completedTaskList}
            title={"completed"}
            setter="CompleteTaskList"
          />

          <div
            className={`${
              taskContext?.completedTaskList ? "h-full p-4  transition-all duration-500" : ""
            }h-0 p-0 transition-all overflow-hidden duration-500  bg-white  rounded-lg shadow-md w-full  `}>
            <table className={"w-full border-collapse"}>
              <TableHeader />
              <TableRow tasks={completedTasks} />
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TaskList);
