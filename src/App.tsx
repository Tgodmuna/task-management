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

  const toggleLogin = (data: boolean) => {
    console.log("called toggleLogin");
    SetIsloggedIn(data);
  };

  useEffect(() => console.log({ isloggedIn }), [isloggedIn]);

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
        toggleLogin,
        setUserData,
        setTasks,
        tasks,
        onCreateTask,
        isAddTaskOpen,
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
