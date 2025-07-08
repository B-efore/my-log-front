import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLogoImage } from "../../util/get-images";
import { useEmailVerification } from "../../hooks/useEmailAndCode";
import EmailAndCodeInput from "../../components/input/EmailAndCodeInput";

const FindPassword = () => {

    const [form, setForm] = useState({
        email: "",
        code: "",
    });

    const { emailSent, codeVerified, sendCodeForPassword, verify } = useEmailVerification();

    const navigate = useNavigate();
    const goHome = () => navigate("/", { replace: true});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleVerifySuccess = () => {
        navigate("/password/reset", {
            state: { email: form.email },
            replace: true,
        });
    };

    return (
        <div className="flex flex-col justify-center items-center pt-30 gap-2">
            <img onClick={goHome} src={getLogoImage()} alt="logo" className="icon-btn w-20" />
            <div>
                <h2 className="font-default-bold text-xl mb-8">
                    비밀번호를 찾고자하는 이메일을 입력해주세요.
                </h2>
            </div>

            <form className="w-full max-w-lg">
                <EmailAndCodeInput
                    form={{ email: form.email, code: form.code }}
                    handlers={{
                        onChange: handleChange,
                        onSend: sendCodeForPassword,
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