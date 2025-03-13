import {} from "./components/taskComponents/Task";

export interface AppContextType {
  isloggedIn: boolean;
  SetIsloggedIn: (value: boolean) => void;
}

export interface TaskType {
  taskName: string;
  description: string;
  estimation: string;
  type: string;
  priority: string;
  people?: string[];
  status?: "to-do" | "in progress" | "completed";
}

export interface TaskHeaderPropType {
  tasks: TaskType[];
  onAddTask?: () => void;
  title: string;
  dropdownContext: boolean;
  setter: string;
}

export type TaskContextType = {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  setIsAddTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddTaskOpen?: boolean;
  isTaskListDropdownOpen: boolean;
  inProgressTaskList: boolean;
  completedTaskList: boolean;
  setInProgressTaskList: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleteTaskList: React.Dispatch<React.SetStateAction<boolean>>;

  setIsTaskListDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
