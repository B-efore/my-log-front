const UserInfoForm = ({
    formData,
    onInputChange,
    onSubmit,
    onCancel
}) => (
    <form onSubmit={onSubmit} >
        <div className="username-div">
            <h4>닉네임</h4>
            <input
                placeholder="닉네임을 입력하세요."
                type="text"
                value={formData.username}
                onChange={(e) => onInputChange('username', e.target.value)}
            />
        </div>
        <div className="bio-div">
            <h4>소개글</h4>
            <input
                placeholder="소개글을 입력하세요."
                type="text"
                value={formData.bio}
                onChange={(e) => onInputChange('bio', e.target.value)}
            />
        </div>
        <div className="setting-form-btn-div">
            <button type="submit">확인</button>
            <button type="button" onClick={onCancel}>취소</button>
        </div>
    </form>
);

export default UserInfoForm;