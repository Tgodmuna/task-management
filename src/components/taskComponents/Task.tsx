import { createContext, useState } from "react";
import type { TaskContextType, TaskType } from "../../types";
import TaskList from "./Task_List";
import TaskInput from "./Task_input";

export const TaskContext = createContext<TaskContextType | null>(null);

export const Task = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      taskName: "Employee Details",
      description: "Create a page where there is information about employees",
      estimation: "Feb 14, 2024 - Feb 1, 2024",
      type: "Dashboard",
      people: ["AL", "RT", "D"],
      priority: "Medium",
      status: "completed",
    },
    {
      taskName: "Darkmode version",
      description: "Darkmode version for all screens",
      estimation: "Feb 14, 2024 - Feb 1, 2024",
      type: "Mobile App",
      people: ["Q", "J"],
      priority: "Low",
      status: "in progress",
    },
    {
      taskName: "white version",
      description: "Darkmode version for all screens",
      estimation: "Feb 14, 2024 - Feb 1, 2024",
      type: "Mobile App",
      people: ["Q", "J"],
      priority: "Low",
      status: "to-do",
    },
  ]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isTodoTaskListDropdownOpen, setIsTodoTaskListDropdownOpen] = useState<boolean>(true);
  const [inProgressTaskList, setInProgressTaskList] = useState(true);
  const [completedTaskList, setCompleteTaskList] = useState(true);

  //add task toggle function
  const onAddTask = () => {
    setIsAddTaskOpen(!isAddTaskOpen);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        setIsAddTaskOpen,
        isTaskListDropdownOpen: isTodoTaskListDropdownOpen,
        setIsTaskListDropdownOpen: setIsTodoTaskListDropdownOpen,
        isAddTaskOpen,
        completedTaskList,
        inProgressTaskList,
        setCompleteTaskList,
        setInProgressTaskList,
      }}>
      <TaskList toggleAddTask={onAddTask} />
      <TaskInput />
    </TaskContext.Provider>
  );
};
