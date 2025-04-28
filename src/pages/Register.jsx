import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ToastMessage from "../components/common/ToastMessage";
import { getLogoImage } from "../util/get-images";
import { signup } from "../api/authService";
import { showErrorToast, showSuccessToast } from "../util/toast";
import "./Register.css";
import { sendMail } from "../api/mailService";

const Register = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [emailSent, setEmailSent] = useState(false);

  const goHome = () => navigate("/");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendCode = async () => {

    const requestBody = {
      email: form.email,
    };

    try {
      const response = await sendMail(requestBody);
      showSuccessToast(response.data);
      setEmailSent(true);
    } catch (e) {
      console.log(e);
      showErrorToast(e);
    }
  }

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
          <div className="email-input-wrapper">
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
            <button type="button" className="email-btn" onClick={handleSendCode}>
              인증코드 발송
            </button>
          </div>
        </div>

        {emailSent && (
          <div className="form-group">
            <label htmlFor="code">인증 코드</label>
            <input
              className="register-input"
              id="code"
              name="code"
              type="text"
              placeholder="인증 코드를 입력하세요."
              value={form.code}
              onChange={handleChange}
              required
            />
          </div>
        )}

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
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            className="register-input"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
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