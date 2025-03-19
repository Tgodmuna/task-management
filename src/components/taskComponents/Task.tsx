import { createContext, useState } from "react";
import type { TaskContextType } from "../../types";
import TaskList from "./Task_List";
import TaskInput from "./Task_input";

export const TaskContext = createContext<TaskContextType | null>(null);

export const Task = () => {
  const [isTodoTaskListDropdownOpen, setIsTodoTaskListDropdownOpen] = useState<boolean>(true);
  const [inProgressTaskList, setInProgressTaskList] = useState(true);
  const [completedTaskList, setCompleteTaskList] = useState(true);

  return (
    <TaskContext.Provider
      value={{
        isTaskListDropdownOpen: isTodoTaskListDropdownOpen,
        setIsTaskListDropdownOpen: setIsTodoTaskListDropdownOpen,
        completedTaskList,
        inProgressTaskList,
        setCompleteTaskList,
        setInProgressTaskList,
      }}>
      <TaskList />
      <TaskInput />
    </TaskContext.Provider>
  );
};
