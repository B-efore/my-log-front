const UserInfoForm = ({
    formData,
    onInputChange,
    onSubmit,
    onCancel
}) => (
    <form onSubmit={onSubmit} >
        <div className="flex flex-col">
            <h4>닉네임</h4>
            <input
                className="w-full px-3 py-1 round-box-border input-form"
                placeholder="닉네임을 입력하세요."
                type="text"
                value={formData.username}
                onChange={(e) => onInputChange('username', e.target.value)}
            />
        </div>
        <div className="flex flex-col">
            <h4>소개글</h4>
            <input
                className="w-full px-3 py-1 round-box-border input-form"
                placeholder="소개글을 입력하세요."
                type="text"
                value={formData.bio}
                onChange={(e) => onInputChange('bio', e.target.value)}
            />
        </div>
        <div className="flex w-fit h-fit mt-4 gap-2 ml-auto">
            <button
                className="btn-primary text-sm px-5 py-1.5 disabled:bg-gray-300"
                type="submit"
                disabled={!formData.username | !formData.bio}
            >확인
            </button>
            <button className="btn-second text-sm px-5 py-1.5" type="button" onClick={onCancel}>취소</button>
        </div>
    </form>
);

export default UserInfoForm;