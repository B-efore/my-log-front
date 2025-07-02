import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "../util/jwt";
import { getMyInfo } from "../api/userService";
import { getProfileImage } from "../util/get-images";

const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo'
};

const INITIAL_USER_STATE = {
  user: null,
  userImage: null,
  userId: null,
  username: '',
  bio: ''
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [userState, setUserState] = useState(INITIAL_USER_STATE);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const updateUserInfo = useCallback((data) => {
    const updatedUserInfo = {
      userImage: data.imageKey ? getProfileImage(data.imageKey) : null,
      username: data.username || '',
      bio: data.bio || ''
    };

    setUserState(prev => ({
      ...prev,
      ...updatedUserInfo
    }));

    return updateUserInfo;
  }, []);

  const saveToStorage = useCallback((key, data) => {
    try {
      if (key === STORAGE_KEYS.TOKEN) {
        localStorage.setItem(key, data);
      } else {
        localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getFromStorage = useCallback((key) => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      if (key === STORAGE_KEYS.TOKEN) {
        return item;
      }

      return JSON.parse(item);
    } catch (err) {
      console.log(err);
      return null;
    }
  }, []);

  const deleteFromStorage = useCallback((key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const validateToken = useCallback((token) => {
    return token && !isTokenExpired(token);
  }, []);

  const loadUserProfile = useCallback(async (useCache = true) => {
    try {
      let userInfo = null;

      if (useCache) {
        userInfo = getFromStorage(STORAGE_KEYS.USER_INFO);
        if (userInfo) {
          updateUserInfo(userInfo);
        }
      }

      const res = await getMyInfo();
      updateUserInfo(res.data);
      saveToStorage(STORAGE_KEYS.USER_INFO, res.data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }, [getFromStorage, updateUserInfo, saveToStorage]);

  const initialize = useCallback(async () => {
    try {
      setIsLoading(true);

      const token = getFromStorage(STORAGE_KEYS.TOKEN);
      if (!validateToken(token)) {
        setLogout();
        return;
      }

      const decoded = jwtDecode(token);
      setUserState(prev => ({
        ...prev,
        user: decoded,
        userId: decoded?.id || null
      }));
      setIsLoggedIn(true);

      await loadUserProfile(true);
    } catch (err) {
      console.log(err);
      setLogout();
    } finally {
      setIsLoading(false);
    }
  }, [getFromStorage, validateToken, loadUserProfile]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const setLogin = useCallback(async (token) => {
    try {
      saveToStorage(STORAGE_KEYS.TOKEN, token);

      const decoded = jwtDecode(token);
      setUserState(prev => ({
        ...prev,
        user: decoded,
        userId: decoded?.id || null
      }));
      setIsLoggedIn(true);
      await loadUserProfile(false);
    } catch (err) {
      console.log(err);
      setLogout();
      throw err;
    }
  }, [saveToStorage, loadUserProfile]);

  const setLogout = useCallback(() => {
    deleteFromStorage(STORAGE_KEYS.TOKEN);
    deleteFromStorage(STORAGE_KEYS.USER_INFO);
    setUserState(INITIAL_USER_STATE);
    setIsLoggedIn(false);
    setIsLoading(false);
    console.log("로그아웃 완료");
  }, [deleteFromStorage]);

  const setUserImage = useCallback((imageUrl) => {
    setUserState(prev => ({ ...prev, userImage: imageUrl }));

    const currentUserInfo = getFromStorage(STORAGE_KEYS.USER_INFO);
    if (currentUserInfo) {
      saveToStorage(STORAGE_KEYS.USER_INFO, {
        ...currentUserInfo,
        imageKey: imageUrl ? imageUrl.split('/').pop() : null
      });
    }
  }, [getFromStorage, saveToStorage]);

  const setUsername = useCallback((username) => {
    setUserState(prev => ({ ...prev, username: username || '' }));

    const currentUserInfo = getFromStorage(STORAGE_KEYS.USER_INFO);
    if (currentUserInfo) {
      saveToStorage(STORAGE_KEYS.USER_INFO, {
        ...currentUserInfo,
        username
      });
    }
  }, [getFromStorage, saveToStorage]);

  const setBio = useCallback((bio) => {
    setUserState(prev => ({ ...prev, bio: bio || '' }));

    const currentUserInfo = getFromStorage(STORAGE_KEYS.USER_INFO);
    if (currentUserInfo) {
      saveToStorage(STORAGE_KEYS.USER_INFO, {
        ...currentUserInfo,
        bio
      });
    }
  }, [getFromStorage, saveToStorage]);

  const refreshProfile = useCallback(async () => {
    if (!isLoggedIn) return;

    try {
      await loadUserProfile(false);
    } catch (err) {
      console.error(err);
    }
  }, [isLoggedIn, loadUserProfile]);

  const contextValue = {
    user: userState.user,
    userId: userState.userId,
    userImage: userState.userImage,
    username: userState.username,
    bio: userState.bio,
    isLoggedIn,
    isLoading,

    setLogin,
    setLogout,
    setUserImage,
    setUsername,
    setBio,
    refreshProfile,

    isAuthenticated: isLoggedIn && !isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("");
  }
  return context;
};