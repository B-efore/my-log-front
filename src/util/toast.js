import { Bounce, Flip, Zoom } from "react-toastify";
import ToastMessage from "../components/common/ToastMessage";

export const showErrorToast = (msg = "알 수 없는 오류가 발생했습니다.") =>
  ToastMessage(msg, { type: "error" });

export const showSuccessToast = (msg) =>
  ToastMessage(msg, { type: "success" });

export const showAlienToast = (msg, size='3rem') =>
  ToastMessage(msg, { style: {
    background: '#312e81',
    color: '#d8b4fe',
    fontFamily: 'ghost',
    boxShadow: '0 0 16px #8b5cf6',
    fontSize: size,
    width: 'fit-content',
    height: 'fit-content',
    padding: "0 5rem",
  },
  icon: false,
  transition: Bounce,
  autoClose: 500,
});