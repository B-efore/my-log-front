import './App.css'
import './styles/variables.css'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home";
import PostWrite from "./pages/PostWrite";
import PostEdit from './pages/PostEdit';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from "./pages/NotFound";
import PostDetail from './pages/PostDetail';
import FindAccountId from './pages/auth/FindAccountId';
import FindAccountIdResult from './pages/auth/FindAccountIdResult';
import FindPassword from './pages/auth/FindPassword';
import ResetPassword from './pages/auth/ResetPassword';
import OAuth2Callback from './pages/auth/OAuth2Callback';
import Settings from './pages/Settings';
import BlogPage from './pages/BlogPage';
import Search from './pages/Search';
import FollowerPage from './pages/FollowerPage';
import FollowingPage from './pages/FollowingPage';
import './styles/tailwind-utilities.css';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oauth2/callback" element={<OAuth2Callback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/accountId/find" element={<FindAccountId />} />
        <Route path="/accountId/find/result" element={<FindAccountIdResult />} />
        <Route path="/password/find" element={<FindPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/search" element={<Search />} />

        <Route path="/:userId" element={<BlogPage />} />
        <Route path="/:userId/followings" element={<FollowingPage />}/>
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
