import React from "react";

const PasswordInput = ({ form, handleChange }) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="password">비밀번호</label>
        <input
          className="register-input"
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
        />
        <small>비밀번호는 영문 대소문자, 숫자, 특수문자를 혼합해 8~16자를 사용하세요.</small>
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          className="register-input"
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