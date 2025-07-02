import { useRef } from "react";
import { updateMyInfo } from "../api/userService";
import Header from "../components/header/Header";
import './Settings.css'
import { showErrorToast, showSuccessToast } from "../util/toast";
import { deleteProfile, uploadImageToS3, uploadProfile } from "../api/imageService";
import defaultProfileImage from "../assets/mini왹.png";
import { useAuth } from "../context/AuthContext";

const Settings = () => {

    const MAX_SIZE = 1 * 1024 * 1024;
    const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png"];

    const { userId, userImage, username, bio, setUserImage, setUsername, setBio } = useAuth();
    const fileInputRef = useRef(null);

    const isValidFile = (file) => {
        const extension = file.name.split(".").pop()?.toLowerCase();

        if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
            showErrorToast("지원하지 않는 파일 형식입니다.");
            return false;
        }

        if (file.size > MAX_SIZE) {
            showErrorToast("최대 1MB까지 업로드 가능합니다.");
            return false;
        }

        return true;
    };

    const handleClickImage = () => {
        fileInputRef.current.click();
    }

    const handleFileDelete = async () => {
        try {
            const res = await deleteProfile(userId);
            console.log(res);
            showSuccessToast("이미지 삭제 완료!");
        } catch (err) {
            console.log(err);
            showErrorToast("이미지 삭제 실패");
        }
    }

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        
        if (!file || !isValidFile(file)) return;

        try {
            const res = await uploadProfile(file);
            console.log(res);

            const { presignedUrl } = res?.data;

            const s3Res = await uploadImageToS3(presignedUrl, file);
            console.log(s3Res);

            const preview = presignedUrl.split("?")[0];
            setUserImage(preview);
            showSuccessToast("이미지가 변경 되었습니다.");
        } catch (err) {
            console.log("프로필 업로드 실패", err);
            showErrorToast("이미지 업로드에 실패했습니다.");
        }
    }

    const handleConfirm = async (e) => {
        e.preventDefault()

        const requestBody = { username, bio };

        try {
            const res = await updateMyInfo(requestBody);
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            console.log(res.data);
            showSuccessToast("성공적으로 저장되었습니다.");
        } catch (error) {
            showErrorToast("정보 저장에 실패했습니다.");
            console.error("정보 업데이트 실패");
        }
    }

    return (
        <div className="settings-root">
            <Header />
            <div className="settings-body">
                <div className="setting-container" >
                    <div className="profile-div">
                        <h4>프로필 사진</h4>

                        <img
                            src={userImage || defaultProfileImage}
                            alt="profile"
                            className="settings-profile-image"
                            onClick={handleClickImage}
                        />

                        <button onClick={handleFileDelete}>이미지 삭제</button>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </div>
                    <form onSubmit={handleConfirm} >
                        <div className="username-div">
                            <h4>닉네임</h4>
                            <input
                                value={username || ""}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="bio-div">
                            <h4>소개글</h4>
                            <input
                                value={bio || ""}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                        <div className="setting-form-btn-div">
                            <button type="submit">확인</button>
                            <button type="button">취소</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;