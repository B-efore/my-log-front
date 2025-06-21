import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLogoImage } from "../../util/get-images";
import { useEmailVerification } from "../../hooks/useEmailAndCode";
import EmailAndCodeInput from "../../components/input/EmailAndCodeInput";
import "./FindPassword.css";

const FindAccountId = () => {

    const [form, setForm] = useState({
        email: "",
        code: "",
    });

    const { emailSent, codeVerified, sendCode, verify } = useEmailVerification();

    const navigate = useNavigate();
    const goHome = () => navigate("/", { replace: true });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleVerifySuccess = () => {
        navigate("/accountId/find/result", {
            state: { email: form.email },
            replace: true,
        });
    };

    return (
        <div className="find-password-wrapper">
            <img onClick={goHome} src={getLogoImage()} alt="logo" className="find-password-logo" />
            <div className="title-wrapper">
                <h2 className="title">
                    회원가입한 아이디의 이메일을 입력해주세요.
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

export default FindAccountId;