export const showErrorToast = (msg = "알 수 없는 오류가 발생했습니다.") =>
    ToastMessage(msg, { type: "error" });
  
  export const showSuccessToast = (msg) =>
    ToastMessage(msg, { type: "success" });