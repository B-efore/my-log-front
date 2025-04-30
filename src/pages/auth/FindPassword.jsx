import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLogoImage } from "../../util/get-images";
import { useEmailVerification } from "../../hooks/useEmailAndCode";
import EmailAndCodeInput from "../../components/input/EmailAndCodeInput";
import "./FindPassword.css";

const FindPassword = () => {


    const [form, setForm] = useState({
        email: "",
        code: "",
    });

    const { emailSent, codeVerified, sendCode, verify } = useEmailVerification();

    const navigate = useNavigate();
    const goHome = () => navigate("/");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleVerifySuccess = () => {
        navigate("/password/reset", {
            state: { email: form.email },
        });
    };

    return (
        <div className="find-password-wrapper">
            <img onClick={goHome} src={getLogoImage()} alt="logo" className="find-password-logo" />
            <div className="title-wrapper">
                <h2 className="title">
                    비밀번호를 찾고자하는 이메일을 입력해주세요.
                </h2>
            </div>

            <form className="find-password-box">
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
            </form>
        </div>
    );
};

export default FindPassword;