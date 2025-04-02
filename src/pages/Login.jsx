import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { getLogoImage } from '../util/get-logo';
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/auth/login", {
        email,
        password
      });

      console.log(res);

      if (res.status == "200") {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {

    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  }


  return (
    <div className="login-wrapper">

      <div className="login-logo">
        <img className="logo-image" src={getLogoImage()} />
      </div>

      <div className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
          <input 
          type="text" 
          placeholder="아이디" 
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <input 
          type="password" 
          placeholder="비밀번호" 
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button">
            이메일로 로그인
          </button>
        </form>
      </div>

      <div className="login-links">
        <a href="#">아이디 찾기</a>
        <a href="#">비밀번호 찾기</a>
        <a href="#">회원가입</a>
      </div>

        <div className="login-divider">
          <span>간편 로그인</span>
        </div>

        <div className="social-buttons">
          <button className="social-circle" title="Google 로그인"></button>
          <button className="social-circle" title="Kakao 로그인"></button>
          <button className="social-circle" title="Naver 로그인"></button>
          <button className="social-circle" title="GitHub 로그인"></button>
        </div>

    </div>
  );
};

export default Login;