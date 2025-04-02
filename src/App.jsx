import './App.css'
import './styles/variables.css'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PostWrite from "./pages/PostWrite";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import error from "./assets/불왹.png"

function App() {


  return (
  <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/write" element={<PostWrite />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
  </>
  );
}

export default App
