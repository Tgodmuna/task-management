import React, { useEffect, useState } from "react";
import "./App.css";
import type { AppContextType, TaskType, userType } from "./types";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard-components/Dashboard";
import LoginForm from "./components/auth/Login";
import { toast, ToastContainer } from "react-toastify";
import RegisterForm from "./components/auth/Register";
import Authenticator from "./components/auth/Authenticator";
import UseFetchUserData from "./components/hooks/UseFetchUser";
import axios from "axios";
import useEnvironmentUrls from "./components/hooks/UseEnvironmentVar";
import { UseFetchToken } from "./components/hooks/UseFetchToken";
//AppContext
export const AppContext = React.createContext<null | AppContextType>(null);

function App() {
  const [isloggedIn, SetIsloggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<null | userType>(UseFetchUserData());
  const [tasks, setTasks] = useState<TaskType[] | []>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const { serverUrl } = useEnvironmentUrls();
  const token = UseFetchToken();

  //create task toggle function
  const onCreateTask = () => {
    setIsAddTaskOpen(!isAddTaskOpen);
  };

  const changeLoginState = (data: boolean) => {
    console.log("called toggleLogin");
    SetIsloggedIn(data);
  };

  const addTask = async (newTask: TaskType) => {
    try {
      const response = await axios.post(`${serverUrl}/api/task/createTask`, newTask, {
        headers: {
          "x-auth-token": token,
        },
      });
      setTasks([...tasks, response.data.task]);
      toast.success("Task added successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add task. Please try again.");
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`${serverUrl}/api/task/delete/${taskId}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  

  const getTask = async (taskId: string) => {
    try {
      const response = await axios.get(`${serverUrl}/api/task/getTask/${taskId}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      return response.data.task;
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch task. Please try again.");
    }
  };

  const modifyTask = async (taskId: string, updatedTask: TaskType) => {
    try {
      const response = await axios.patch(`${serverUrl}/api/task/updateTask/${taskId}`, updatedTask, {
        headers: {
          "x-auth-token": token,
        },
      });
      setTasks(tasks.map((task) => (task._id === taskId ? response.data.task : task)));
      toast.success("Task updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update task. Please try again.");
    }
  };
  

  //fetch tasks
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get(`${serverUrl}/api/task/readTasks`, {
          headers: {
            "x-auth-token": token,
          },
        });
        if (response.status === 401) {
          console.log("access denied, no token provided");
          toast.error(response.data);
          return;
        }

        if (!response) {
          toast.error("failed to fetch task");
          console.log("failed to fetch task ");
          return;
        }
        console.log(response);
        setTasks(response.data?.tasks);
      } catch (err) {
        console.log(err);
        toast.error(
          `${
            (err as any)?.response?.data ||
            (err as any)?.response?.data?.error ||
            (err as Error)?.message
          } || ${(err as any).code}` || "failed to fetch tasks.  Please try again."
        );
      }
    }
    //fetch task when user is logged in
    isloggedIn && fetchTasks();
  }, [isloggedIn, serverUrl, token]);

  return (
    <AppContext.Provider
      value={{
        userData,
        isloggedIn,
        toggleLogin: changeLoginState,
        setUserData,
        setTasks,
        tasks,
        onCreateTask,
        isAddTaskOpen,
        addTask,
        deleteTask,
        getTask,
        modifyTask,
      }}>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={<LoginForm />}
          />

          {/* dashboard */}
          <Route
            path="/dashboard"
            element={
              <Authenticator>
                <Dashboard />
              </Authenticator>
            }
          />
          {/* auth */}
          <Route
            path="/login"
            element={<LoginForm />}
          />
          <Route
            path="/register"
            element={<RegisterForm />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
