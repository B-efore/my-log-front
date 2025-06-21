import React from "react";

const EmailAndCodeInput = ({ form, handlers, state }) => {

    const { email, code } = form;
    const { onChange, onSend, onVerify, onSuccess } = handlers;
    const { emailSent, codeVerified } = state;

    return (
        <div className="email-code-wrapper">
            <div className="form-group">
                <label htmlFor="email">이메일</label>
                <div className="btn-input-wrapper">
                    <input
                        className="register-input"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={onChange}
                        required
                    />
                    <button type="button" className="code-btn" onClick={() => onSend(email)} disabled={codeVerified}>
                        {emailSent ? "코드 재발송" : "코드 발송"}
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="code">인증 코드</label>
                <div className="btn-input-wrapper">
                    <input
                        className="register-input"
                        id="code"
                        name="code"
                        type="text"
                        placeholder="인증 코드를 입력하세요."
                        value={code}
                        onChange={onChange}
                        required
                    />
                    <button
                        type="button"
                        className="code-btn"
                        disabled={codeVerified}
                        onClick={async () => {
                            try {
                                await onVerify({ email, code })
                                onSuccess();
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailAndCodeInput;