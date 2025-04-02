import { useEffect, useState } from "react";
import { getProfileImage } from "../util/get-images";

const useAuth = () => {
  const [userImage, setUserImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const profile = localStorage.getItem("profileImage");
      setUserImage(profile || getProfileImage());
      setIsLoggedIn(true);
    } else {
      setUserImage(null);
      setIsLoggedIn(false);
    }
  }, []);

  return { isLoggedIn, userImage };
};

export default useAuth;