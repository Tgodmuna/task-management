import {} from "./components/taskComponents/Task";

export interface AppContextType {
  isAddTaskOpen: boolean;
  onCreateTask: () => void;
  isloggedIn: boolean;
  toggleLogin: (data: boolean) => void;
  setUserData: React.Dispatch<React.SetStateAction<userType | null>>;
  userData: userType | null;
  tasks: TaskType[] | [];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[] | []>>;
  addTask: (newTask: TaskType) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  getTask: (taskId: string) => Promise<TaskType | undefined>;
  modifyTask: (taskId: string, updatedTask: TaskType) => Promise<void>;
}

export interface userType {
  name: string;
  email: string;
  password: string;
  tasks: TaskType[];
  profileUrl: string | undefined;
  _id: string;
}

export interface TaskType {
  taskName: string;
  description: string;
  estimation: string;
  type: string;
  priority: string;
  people?: userType[];
  status?: string;
  _id?: string;
}

export type newTaskType = Omit<TaskType, "people"> & {
  people: string[];
};

export interface TaskHeaderPropType {
  tasks: TaskType[];
  title: string;
  dropdownContext: boolean;
  setter: string;
}

export type TaskContextType = {
  isTaskListDropdownOpen: boolean;
  inProgressTaskList: boolean;
  completedTaskList: boolean;
  setInProgressTaskList: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleteTaskList: React.Dispatch<React.SetStateAction<boolean>>;

  setIsTaskListDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
