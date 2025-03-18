import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseFetchToken } from "../hooks/UseFetchToken";
import { AppContext } from "../../App";

const Authenticator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = UseFetchToken();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (!token) {
      appContext?.toggleLogin(false);
      setIsAuthenticated(false);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } else {
      setIsAuthenticated(true);
      appContext?.toggleLogin(true);
    }
  }, [token, navigate, appContext]);

  if (!isAuthenticated) {
    return (
      <h1 className="text-red-500 text-center animate-pulse m-auto text-4xl">
        Not Authenticated, Redirecting...
      </h1>
    );
  }

  return <>{children}</>;
};

export default React.memo(Authenticator);
