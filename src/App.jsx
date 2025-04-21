import './App.css'
import './styles/variables.css'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home";
import PostWrite from "./pages/PostWrite";
import PostEdit from './pages/PostEdit';
import Login from "./pages/Login";
import Register from './pages/Register';
import NotFound from "./pages/NotFound";
import PostDetail from './pages/PostDetail';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/write" element={<PostWrite />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/write/:postId" element={<PostEdit />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App
