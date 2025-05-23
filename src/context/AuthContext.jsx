import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "../util/jwt";
import { getProfileImage } from "../util/get-images";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      try {
        if (!isTokenExpired(token)) {
          const decoded = jwtDecode(token);
          setUser(decoded);
          setUserId(decoded?.id || null);
          setUserImage(getProfileImage());
          setIsLoggedIn(true);
        } else {
        }
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  const setLogin = (token) => {
    localStorage.setItem("token", token);

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setUserId(decoded?.id || null);
      setUserImage(getProfileImage());
      setIsLoggedIn(true);
    } catch {
      logout();
    }
  };

  const setLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserId(null);
    setUserImage(null);
    setIsLoggedIn(false);
    console.log("로그아웃 완료");
  };

  return (
    <AuthContext.Provider value={{ user, userId, userImage, isLoggedIn, setLogin, setLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);