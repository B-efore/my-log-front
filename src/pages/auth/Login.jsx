import React, { useState } from "react";
import google_logo from '../../assets/google_logo.png'
import kakao_logo from '../../assets/kakao_logo.png'
import naver_logo from '../../assets/naver_logo.png'
import github_logo from '../../assets/github_logo.png'
import { useNavigate, Link, replace } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../api/authService";
import { getLogoImage } from '../../util/get-images';

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
    <div className="flex flex-col justify-center items-center min-h-screen px-4 py-8 sm:px-6 lg:px-8">

      <div className="mb-6 sm:mb-8 cursor-pointer">
        <img className="icon-btn w-16 sm:w-20" src={getLogoImage()} onClick={() => navigate("/")} />
      </div>

      <div className="p-6 sm:p-8 md:p-12 w-full max-w-sm sm:max-w-md bg-white text-center round-box-border">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="아이디"
            className="text-sm sm:text-base round-box-border input-form"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="text-sm sm:text-base round-box-border input-form"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-primary py-3 text-sm sm:text-base">
            발사!
          </button>
        </form>
      </div>

      <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 text-center">
        <Link to="/accountId/find">아이디를 보다</Link>
        <Link to="/password/find">비밀번호를 보다</Link>
        <Link to="/register" replace>회원이 되다</Link>
      </div>

      <div className="w-full max-w-sm sm:max-w-md flex items-center text-center my-8 sm:my-12">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm sm:text-base text-gray-500 px-4">간편!</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="flex justify-between gap-8">
        <img src={google_logo} alt="Google 로그인" className="icon-btn w-16" onClick={() => handleSocialLogin("google")}></img>
        <img src={kakao_logo} alt="Kakao 로그인" className="icon-btn w-16" onClick={() => handleSocialLogin("kakao")}></img>
        <img src={naver_logo} alt="Naver 로그인" className="icon-btn w-16"></img>
        <img src={github_logo} alt="Github 로그인" className="icon-btn w-16"></img>
      </div>

    </div>
  );
};

export default Login;