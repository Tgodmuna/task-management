import { createContext, useContext, useEffect, useState } from "react";
import type { TaskContextType, TaskType } from "../../types";
import TaskList from "./Task_List";
import TaskInput from "./Task_input";
import { AppContext } from "../../App";

export const TaskContext = createContext<TaskContextType | null>(null);

export const Task = () => {
  const [tasks, setTasks] = useState<TaskType[] | []>([]);
  const [isTodoTaskListDropdownOpen, setIsTodoTaskListDropdownOpen] = useState<boolean>(true);
  const [inProgressTaskList, setInProgressTaskList] = useState(true);
  const [completedTaskList, setCompleteTaskList] = useState(true);
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext && appContext?.tasks) setTasks(appContext?.tasks);
  }, [appContext, appContext?.tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        isTaskListDropdownOpen: isTodoTaskListDropdownOpen,
        setIsTaskListDropdownOpen: setIsTodoTaskListDropdownOpen,
        completedTaskList,
        inProgressTaskList,
        setCompleteTaskList,
        setInProgressTaskList,
      }}>
      <TaskList  />
      <TaskInput />
    </TaskContext.Provider>
  );
};
