import React from "react";

const EmailAndCodeInput = ({ form, handlers, state }) => {

    const { email, code } = form;
    const { onChange, onSend, onVerify, onSuccess } = handlers;
    const { emailSent, codeVerified } = state;

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="w-full text-left">
                <label htmlFor="email">이메일</label>
                <div className="flex flex-row gap-2">
                    <input
                        className="w-100 round-box-border input-form"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={onChange}
                        required
                    />
                    <button type="button" className="btn-primary w-30 text-sm" onClick={() => onSend(email)} disabled={codeVerified}>
                        {emailSent ? "코드 재발송" : "코드 발송"}
                    </button>
                </div>
            </div>

            <div className="w-full text-left">
                <label htmlFor="code">인증 코드</label>
                <div className="flex flex-row gap-2">
                    <input
                        className="w-100 round-box-border input-form"
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
                        className="btn-primary w-30 text-sm"
                        disabled={codeVerified}
                        onClick={async () => {
                            try {
                                await onVerify({ email, code })
                                onSuccess();
                            } catch (err) {
                                console.error(err);
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