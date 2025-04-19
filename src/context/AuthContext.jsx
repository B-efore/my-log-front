import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "../util/jwt";
import { getProfileImage } from "../util/get-images";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      try {
        const decoded = jwtDecode(token);

        setUser(decoded);
        setUserId(payload?.id || null);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Invalid token");
        logout();
      }
    } else {
      logout();
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setUserId(payload?.id || null);
      setIsLoggedIn(true);
    } catch {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserId(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, userId, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);