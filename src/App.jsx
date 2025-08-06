import './styles/tailwind-utilities.css';
import './App.css'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/main/Home";
import PostWrite from "./pages/post/PostWrite";
import PostEdit from './pages/post/PostEdit';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from "./pages/NotFound";
import PostDetail from './pages/post/PostDetail';
import FindAccountId from './pages/auth/FindAccountId';
import FindAccountIdResult from './pages/auth/FindAccountIdResult';
import FindPassword from './pages/auth/FindPassword';
import ResetPassword from './pages/auth/ResetPassword';
import OAuth2Callback from './pages/auth/OAuth2Callback';
import Settings from './pages/user/Settings';
import BlogPage from './pages/user/BlogPage';
import Search from './pages/main/Search';
import FollowerPage from './pages/user/FollowerPage';
import FollowingPage from './pages/user/FollowingPage';
import NoticeWrite from './pages/admin/NoticeWrite';
import Notice from './pages/main/Notice';
import Ghost from './pages/main/Ghost';
import Shop from './pages/main/Shop';
import AdminPage from './pages/admin/AdminPage';
import ItemUpload from './pages/admin/ItemUpload';
import { useEffect, useRef } from 'react';
import { useAuth } from './context/AuthContext';
import { showSuccessToast } from './util/toast';
import Readme from './components/blog/Readme';
import Fortune from './pages/main/Fortune';
import Statistic from './pages/user/Statistic';

function App() {

  const SSE_URL = import.meta.env.VITE_SSE_URL;

  const { userId, isLoggedIn } = useAuth();
  const eventSourceRef = useRef(null);

  useEffect(() => {

    if (userId && isLoggedIn) {

      const accessToken = localStorage.getItem('token');
      document.cookie = `accessToken=${accessToken}; Secure; path=/api/sse`;

      const eventSource = new EventSource(`${SSE_URL}`, {
        withCredentials: true,
      })

      eventSource.onopen = () => {
        console.log("연결");
      };

      eventSource.onmessage = (event) => {
        console.log(event);
        // showSuccessToast(event.data);
      };

      eventSource.addEventListener('notification', (event) => {
        showSuccessToast(event.data);
      });

      eventSource.onerror = (e) => {
        console.error(e);
      };

      eventSourceRef.current = eventSource;
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current = close();
        eventSourceRef.current = null;
      }
    }

  }, [userId, isLoggedIn]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/write" element={<NoticeWrite />} />
        <Route path="/admin/item/upload" element={<ItemUpload />} />

        <Route path="/notices" element={<Notice />} />

        <Route path="/" element={<Home />} />
        <Route path="/oauth2/callback" element={<OAuth2Callback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/accountId/find" element={<FindAccountId />} />
        <Route path="/accountId/find/result" element={<FindAccountIdResult />} />
        <Route path="/password/find" element={<FindPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} />

        <Route path="/ghost" element={<Ghost />} />
        <Route path="/ghost/shop" element={<Shop />} />
        <Route path="/fortune" element={<Fortune />} />

        <Route path="/statistic" element={<Statistic />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/search" element={<Search />} />

        <Route path="/:userId" element={<BlogPage />} />
        <Route path="/:userId/readme" element={<Readme />} />
        <Route path="/:userId/followings" element={<FollowingPage />} />
        <Route path="/:userId/followers" element={<FollowerPage />} />

        <Route path="/write" element={<PostWrite />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/write/:postId" element={<PostEdit />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App
