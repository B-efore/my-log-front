import { useEffect, useState } from "react";
import { isTokenExpired, parseToken } from "../util/jwt";
import { getProfileImage } from "../util/get-images";
import ToastMessage from "../components/common/ToastMessage";

const useAuth = () => {
    
  const [userImage, setUserImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      const payload = parseToken(token);
      const profile = localStorage.getItem("profileImage");

      setUserImage(profile || getProfileImage());
      setUserId(payload?.id || null);
      setIsLoggedIn(true);
    } else {
      logout();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
    setUserImage(null);
    setUserId(null);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, userId, userImage, logout };
};

export default useAuth;