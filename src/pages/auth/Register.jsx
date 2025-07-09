import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ToastMessage from "../../components/common/ToastMessage";
import { getLogoImage } from "../../util/get-images";
import { signup } from "../../api/authService";
import { showErrorToast } from "../../util/toast";
import { useEmailVerification } from "../../hooks/useEmailAndCode";
import EmailAndCodeInput from "../../components/input/EmailAndCodeInput";
import PasswordInput from "../../components/input/PasswordInput";

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
    <div className="flex flex-col items-center h-screen">
      <img onClick={goHome} src={getLogoImage()} alt="logo" className="icon-btn w-20 my-5" />
      <form className="round-box-border p-10" onSubmit={handleSubmit}>

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

        <div className="flex flex-col text-left x-full box-border my-2">
          <label htmlFor="accountId">아이디</label>
          <input
            className="round-box-border input-form"
            id="accountId"
            name="accountId"
            type="text"
            placeholder="아이디"
            value={form.accountId}
            onChange={handleChange}
            required
          />
          <small className="text-gray-500">아이디는 영문, 숫자, '-', '_' 조합의 6~20자리를 사용하세요.</small>
        </div>

        <PasswordInput
          form={form}
          handleChange={handleChange}
        />

        <div className="flex flex-col text-left x-full box-border my-2">
          <label htmlFor="username">닉네임</label>
          <input
            className="round-box-border input-form"
            id="username"
            name="username"
            type="text"
            placeholder="닉네임"
            value={form.username}
            onChange={handleChange}
            required
          />
          <small className="text-gray-500">닉네임은 한글, 영문, 숫자, '-', '_' 조합의 2~10자리를 사용하세요.</small>
        </div>

        <div className="flex flex-col text-left x-full box-border my-2">
          <button
            type="submit"
            className="btn-primary p-3 disabled:bg-gray-300"
            disabled={!codeVerified | !form.email | !form.password | !form.confirmPassword | !form.username}>
            확인
          </button>
        </div>
      </form>


      <div className="text-sm py-8">
        계정이 이미 존재합니다. <Link className="hover:underline" to="/login" replace>로그인</Link>
      </div>
    </div>
  );
};

export default Register;