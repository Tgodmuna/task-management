import React, { useState } from "react";
import "./App.css";
import type { AppContextType } from "./types";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard-components/Dashboard";
import LoginForm from "./components/auth/Login";
import { ToastContainer } from "react-toastify";
import RegisterForm from "./components/auth/Register";
//AppContext
export const AppContext = React.createContext<null | AppContextType>(null);

function App() {
  const [isloggedIn, SetIsloggedIn] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ isloggedIn, SetIsloggedIn }}>
      <div className="App">
        <ToastContainer />

        <Routes>
          {/* dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* auth */}
          <Route
            path="/login"
            element={<LoginForm />}
          />  <Route
            path="/register"
            element={<RegisterForm />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
