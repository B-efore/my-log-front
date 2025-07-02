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