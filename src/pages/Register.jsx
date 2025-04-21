import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ToastMessage from "../components/common/ToastMessage";
import { getLogoImage } from "../util/get-images";
import { signup } from "../api/authService";
import { showErrorToast } from "../util/toast";
import "./Register.css";

const Register = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const goHome = () => navigate("/");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      ToastMessage("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (err) {
      console.error("요청 실패");
      showErrorToast("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="register-wrapper">
      <img onClick={goHome} src={getLogoImage()} alt="logo" className="register-logo" />
      <form className="register-box" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            className="register-input"
            id="email"
            name="email"
            type="email"
            placeholder="아이디"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            className="register-input"
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />
          <small>비밀번호는 영문 대소문자, 숫자, 특수문자를 혼합해 8~16자를 사용하세요.</small>
        </div>

        <div className="form-group">
          <label htmlFor="username">닉네임</label>
          <input
            className="register-input"
            id="username"
            name="username"
            type="text"
            placeholder="닉네임"
            value={form.username}
            onChange={handleChange}
            required
          />
          <small>닉네임은 한글, 영문, 숫자, '-', '_' 조합의 2~10자리를 사용하세요.</small>
        </div>

        <button type="submit" className="submit-btn">
          확인
        </button>
      </form>

      <div className="register-footer">
        계정이 이미 존재합니다. <Link to="/login" replace>로그인</Link>
      </div>
    </div>
  );
};

export default Register;