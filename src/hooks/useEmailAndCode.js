import { useState } from "react";
import { sendMail } from "../api/mailService";
import { findPassword, verifyCode } from "../api/authService";
import { showErrorToast, showSuccessToast } from "../util/toast";

export const useEmailVerification = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [codeVerified, setCodeVerified] = useState(false);

    const sendCode = async (email) => {
        try {
            const response = await sendMail({ email: email });
            setEmailSent(true);
            showSuccessToast(response.data);
        } catch (error) {
            console.log(error);
            showErrorToast("발송 실패");
        }
    };

    const sendCodeForPassword = async (email) => {
        try {
            const response = await findPassword({ email: email });
            setEmailSent(true);
            showSuccessToast("인증번호를 전송했습니다.");
        } catch (error) {
            console.log(error);
            showErrorToast("발송 실패");
        }
    }

    const verify = async ({ email, code }) => {
        try {
            const response = await verifyCode({ email, code });
            setCodeVerified(true);
            showSuccessToast(response.data);
        } catch (error) {
            console.log(error);
            showErrorToast("인증 실패");
        }
    };

    return {
        emailSent,
        codeVerified,
        sendCode,
        sendCodeForPassword,
        verify,
    };
};