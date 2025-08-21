import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLogoImage } from "../../util/get-images";
import { resetPassword } from "../../api/authService";
import PasswordInput from "../../components/input/PasswordInput";
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
            console.error(error);
            showErrorToast("비밀번호 변경 실패");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center pt-30 gap-2">
            <img src={getLogoImage()} alt="logo" className="icon-btn w-20" />
            <h2 className="font-default-bold text-xl mb-8">
                새로운 비밀번호를 입력해주세요.
            </h2>

            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <PasswordInput
                    form={form}
                    handleChange={handleChange}
                />
                <div className="flex flex-col text-left x-full box-border my-4">
                    <button
                        type="submit"
                        className="btn-primary p-3 disabled: bg-gray-300"
                        disabled={!form.password || !form.confirmPassword}>
                        확인
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;