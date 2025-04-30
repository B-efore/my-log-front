import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLogoImage } from "../../util/get-images";
import { resetPassword } from "../../api/authService";
import PasswordInput from "../../components/input/PasswordInput";
import "./ResetPassword.css"
import { showErrorToast, showSuccessToast } from "../../util/toast";

const ResetPassword = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const email = location.state?.email;

    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (!email) {
            navigate("/login", { replace: true });
        }
    }, [email, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            showErrorToast("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {

            const requestBody = {
                email: email,
                password: form.password,
                confirmPassword: form.confirmPassword,
            }

            const response = await resetPassword(requestBody);
            showSuccessToast("비밀번호가 변경되었습니다.");
            navigate("/login", { replace: true });
        } catch (error) {
            console.log(error);
            showErrorToast("비밀번호 변경 실패");
        }
    };

    return (
        <div className="reset-password-wrapper">
            <img src={getLogoImage()} alt="logo" className="reset-password-logo" />
            <div className="title-wrapper">
                <h2 className="title">
                    새로운 비밀번호를 입력해주세요.
                </h2>
            </div>

            <form className="reset-password-box" onSubmit={handleSubmit}>
                <PasswordInput
                    form={form}
                    handleChange={handleChange}
                />
                <button
                    className="reset-btn"
                    type="submit"
                    disabled={!form.password || !form.confirmPassword
                    }>
                    확인
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;