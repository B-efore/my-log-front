import React, { useRef, useEffect, useState } from "react";
import { getMyInfo, updateMyInfo } from "../api/userService";
import Header from "../components/header/Header";
import './Settings.css'
import { showErrorToast, showSuccessToast } from "../util/toast";
import { uploadImageToS3, uploadProfile } from "../api/imageService";
import defaultProfileImage from "../assets/mini왹.png";

const Settings = () => {

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const res = await getMyInfo();
                const { username, bio, profileImageUrl } = res.data;
                setUsername(username);
                setBio(bio);
                setPreviewUrl(`https://mylog-image-bucket.s3.ap-northeast-2.amazonaws.com/${profileImageUrl}`);
                console.log(res);
            } catch (error) {
                console.error("내 정보 조회 실패");
            }
        };
        fetchMyInfo();
    }, []);

    const handleClickImage = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const res = await uploadProfile(file);
            console.log(res);

            const { presignedUrl, key, type } = res?.data;

            const s3Res = await uploadImageToS3(presignedUrl, file);
            console.log(s3Res);

            const preview = presignedUrl.split("?")[0];
            setPreviewUrl(preview);
            showSuccessToast("이미지가 변경 되었습니다.");
        } catch (err) {
            console.log("프로필 업로드 실패", err);
            showErrorToast("이미지 업로드에 실패했습니다.");
        }
    }

    const handleConfirm = async () => {

        const requestBody = { username, bio, profileImageUrl };

        try {
            const res = await updateMyInfo(requestBody);
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
                <form className="setting-container" onSubmit={handleConfirm}>
                    <div className="profile-div">
                        <h4>프로필 사진</h4>

                        <img
                            src={previewUrl || defaultProfileImage}
                            alt="profile"
                            className="settings-profile-image"
                            onClick={handleClickImage}
                        />

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{display:"none"}}
                        />
                    </div>
                    <div className="username-div">
                        <h4>닉네임</h4>
                        <input
                            value = {username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="bio-div">
                        <h4>소개글</h4>
                        <input
                            value = {bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                    <div className="setting-form-btn-div">
                        <button type="submit">확인</button>
                        <button>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;