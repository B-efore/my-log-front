import { getDefaultImage } from "../../util/get-images";

const ProfileImageSection = ({
    userImage,
    onImageClick,
    onImageDelete,
    onImageUpload,
    fileInputRef
}) => (
    <div className="profile-div">
        <h4>프로필 사진</h4>

        <img
            src={userImage || getDefaultImage()}
            alt="profile"
            className="settings-profile-image"
            onClick={onImageClick}
        />

        <button
            type="button"
            onClick={onImageDelete}
            className="image-delete-btn"
        >
            이미지 삭제
        </button>

        <p className="setting-profile-image-explain">
            파일 업로드: jpg, jpeg, png 및 1MB 이하의 파일만 지원
        </p>

        <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={onImageUpload}
            style={{ display: "none" }}
        />
    </div>
);

export default ProfileImageSection;