import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = (message, options = {}) => {
  toast(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    transition: Flip,
    type: "success",
    ...options,
  });
};

export default ToastMessage;