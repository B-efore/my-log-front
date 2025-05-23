import { useEffect, useState } from "react";
import { getMyInfo, updateMyInfo } from "../api/userService";
import Header from "../components/header/Header";
import './Settings.css'
import { showErrorToast, showSuccessToast } from "../util/toast";

const Settings = () => {

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [profileImageUrl, setProfileImageUrl] = useState("");

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const res = await getMyInfo();
                const { username, bio, profileImageUrl } = res.data;
                setUsername(username);
                setBio(bio);
                setProfileImageUrl(profileImageUrl);
                console.log(res);
                console.log("username {}, bio {}", username, bio);
            } catch (error) {
                console.error("내 정보 조회 실패");
            }
        };
        fetchMyInfo();
    }, []);

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
                        <button className="settings-profile-image" />
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