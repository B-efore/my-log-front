import React from "react";

const PasswordInput = ({ form, handleChange }) => {
  return (
    <>
      <div className="flex flex-col text-left x-full box-border my-2">
        <label htmlFor="password">비밀번호</label>
        <input
          className="round-box-border input-form"
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
        />
        <small className="text-gray-500">비밀번호는 영문 대소문자, 숫자, 특수문자를 혼합해 8~16자를 사용하세요.</small>
      </div>

      <div className="flex flex-col text-left x-full box-border my-2">
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          className="round-box-border input-form"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
};

export default PasswordInput;