import { getDefaultImage } from "../../util/get-images";

const ProfileImageSection = ({
    userImage,
    onImageClick,
    onImageDelete,
    onImageUpload,
    fileInputRef
}) => (
    <div className="flex flex-col text-left">
        <h4 className="text-base my-2">프로필 사진</h4>

        <img
            src={userImage || getDefaultImage()}
            alt="profile"
            className="w-[150px] aspect-square round-box-border rounded-full cursor-pointer"
            onClick={onImageClick}
        />

        <button
            type="button"
            onClick={onImageDelete}
            className="mt-4 mr-auto btn-primary text-sm px-5 py-1.5 disabled:bg-gray-300"
            disabled={!userImage}
       >
            이미지 삭제
        </button>

        <p className="text-sm text-gray-400 mb-4">
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