import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { setLogoutHandler } from "./api/axios";
import { useNavigate } from "react-router-dom";

const AppInitializer = () => {
  const { setLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLogoutHandler(() => {
      setLogout();
    });
  }, [setLogout, navigate]);

  return null;
};

export default AppInitializer;