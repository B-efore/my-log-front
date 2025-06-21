import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ToastMessage from "../../components/common/ToastMessage";
import { getLogoImage } from "../../util/get-images";
import { signup } from "../../api/authService";
import { showErrorToast } from "../../util/toast";
import { useEmailVerification } from "../../hooks/useEmailAndCode";
import EmailAndCodeInput from "../../components/input/EmailAndCodeInput";
import PasswordInput from "../../components/input/PasswordInput";
import "./Register.css";

const Register = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    code: "",
    accountId: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const { emailSent, codeVerified, sendCode, verify } = useEmailVerification();

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

  const handleVerifySuccess = () => {

  };

  return (
    <div className="register-wrapper">
      <img onClick={goHome} src={getLogoImage()} alt="logo" className="register-logo" />
      <form className="register-box" onSubmit={handleSubmit}>

        <EmailAndCodeInput
          form={{ email: form.email, code: form.code }}
          handlers={{
            onChange: handleChange,
            onSend: sendCode,
            onVerify: verify,
            onSuccess: handleVerifySuccess,
          }}
          state={{ emailSent, codeVerified }}
        />

        <div className="form-group">
          <label htmlFor="accountId">아이디</label>
          <input
            className="register-input"
            id="accountId"
            name="accountId"
            type="text"
            placeholder="아이디"
            value={form.accountId}
            onChange={handleChange}
            required
          />
          <small>아이디는 영문, 숫자, '-', '_' 조합의 6~20자리를 사용하세요.</small>
        </div>

        <PasswordInput
          form={form}
          handleChange={handleChange}
        />

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

        <div className="form-group">
          <button
            type="submit"
            className="submit-btn"
            disabled={!codeVerified | !form.email | !form.password | !form.confirmPassword | !form.username}>
            확인
          </button>
        </div>
      </form>


      <div className="register-footer">
        계정이 이미 존재합니다. <Link to="/login" replace>로그인</Link>
      </div>
    </div>
  );
};

export default Register;