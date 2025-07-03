import React, { useState } from "react";
import google_logo from '../../assets/google_logo.png'
import kakao_logo from '../../assets/kakao_logo.png'
import naver_logo from '../../assets/naver_logo.png'
import github_logo from '../../assets/github_logo.png'
import { useNavigate, Link, replace } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../api/authService";
import { getLogoImage } from '../../util/get-images';

import "./Login.css";
import { showErrorToast } from "../../util/toast";

const Login = () => {

  const oAuth2BaseUrl = import.meta.env.VITE_OAUTH2_BASE_URL;

  const navigate = useNavigate();
  const { setLogin } = useAuth();

  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    try {

      const requestBody = {
        accountId: accountId,
        password: password,
      };

      const res = await login(requestBody);

      if (res.status === 200) {
        setLogin(res.data.accessToken);
        navigate("/");
      } else {
        showErrorToast("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.log("응답 상태:", error);
      showErrorToast("서버 에러");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  }

  const handleSocialLogin = (provider) => {
    console.log(`${oAuth2BaseUrl}/api/oauth2/authorization/${provider}`);
    window.location.href = `${oAuth2BaseUrl}/api/oauth2/authorization/${provider}`;
  };


  return (
    <div className="login-wrapper">

      <div className="login-logo">
        <img className="logo-image" src={getLogoImage()} onClick={() => navigate("/")} />
      </div>

      <div className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="아이디"
            className="login-input"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button">
            아이디로 로그인
          </button>
        </form>
      </div>

      <div className="login-links">
        <Link to="/accountId/find">아이디 찾기</Link>
        <Link to="/password/find">비밀번호 찾기</Link>
        <Link to="/register" replace>회원가입</Link>
      </div>

      <div className="login-divider">
        <span>간편 로그인</span>
      </div>

      <div className="social-buttons">
        <img src={google_logo} alt="Google 로그인" className="social-circle" onClick={() => handleSocialLogin("google")}></img>
        <img src={kakao_logo} alt="Kakao 로그인" className="social-circle" onClick={() => handleSocialLogin("kakao")}></img>
        <img src={naver_logo} alt="Naver 로그인" className="social-circle"></img>
        <img src={github_logo} alt="Github 로그인" className="social-circle"></img>
      </div>

    </div>
  );
};

export default Login;