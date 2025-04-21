import React, { useState } from "react";
import { useNavigate, Link, replace } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../api/authService";
import axios from "../api/axios";
import { getLogoImage } from '../util/get-images';

import "./Login.css";
import { showErrorToast } from "../util/toast";

const Login = () => {

  const navigate = useNavigate();
  const { setLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    try {

      const requestBody = {
        email: email,
        password: password,
      };

      const res = await login(requestBody);

      console.log(res);

      if (res.status === 200) {
        setLogin(res.data.accessToken);
        navigate("/");
      } else {
        showErrorToast("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.log("응답 상태:", error.response?.status);

      console.error("서버 응답 없음 또는 기타 오류", error);

      showErrorToast("이메일 또는 비밀번호가 올바르지 않습니다.");
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
        <Link to="/register">아이디 찾기</Link>
        <Link to="/register" replace>비밀번호 찾기</Link>
        <Link to="/register" replace>회원가입</Link>
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