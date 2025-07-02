import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "../util/jwt";
import { getMyInfo } from "../api/userService";
import { getProfileImage } from "../util/get-images";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setUserId(decoded?.id || null);
        console.log(decoded);
        setIsLoggedIn(true);

        const cachedUserInfo = localStorage.getItem("userInfo");

        if (cachedUserInfo) {
          const data = JSON.parse(cachedUserInfo);
          setUserInfo(data);
        } else {
          getMyInfo().then((res) => {
            console.log(res.data);
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            setUserInfo(res.data);
          })
        }
      } catch (err) {
        console.error("Invalid token");
        setLogout();
      }
    }
  }, []);

  const setLogin = (token) => {
    localStorage.setItem("token", token);

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setUserId(decoded?.id || null);

      getMyInfo().then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        setUserInfo(res.data);
      })

      setIsLoggedIn(true);
    } catch {
      setLogout();
    }
  };

  const setLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUser(null);
    setUserId(null);
    setUserImage(null);
    setUsername(null);
    setBio(null);
    setIsLoggedIn(false);
    console.log("로그아웃 완료");
  };

  const setUserInfo = (data) => {
    setUserImage(getProfileImage(data.imageKey));
    setUsername(data.username);
    setBio(data.bio);
  }
  

  return (
    <AuthContext.Provider
      value={{
        user, userId, userImage, username, bio, isLoggedIn,
        setUserImage, setUsername, setBio,
        setLogin, setLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);