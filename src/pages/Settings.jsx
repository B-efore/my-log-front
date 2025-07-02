import { useRef, useState } from "react";
import { updateMyInfo } from "../api/userService";
import Header from "../components/header/Header";
import './Settings.css'
import { showErrorToast, showSuccessToast } from "../util/toast";
import { deleteProfile, uploadImageToS3, uploadProfile } from "../api/imageService";
import { useAuth } from "../context/AuthContext";
import ProfileImageSection from "../components/setting/ProfileImageSection";
import UserInfoForm from "../components/setting/UserInfoForm";

const FILE_CONSTRAINTS = {
    MAX_SIZE: 1 * 1024 * 1024,
    ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png']
};

const MESSAGES = {
    INVALID_FILE_TYPE: '지원하지 않는 파일 형식입니다.',
    FILE_TOO_LARGE: '최대 1MB까지 업로드 가능합니다.',
    IMAGE_DELETE_SUCCESS: '이미지 삭제 완료!',
    IMAGE_DELETE_FAILED: '이미지 삭제 실패',
    IMAGE_UPLOAD_SUCCESS: '이미지가 변경 되었습니다.',
    IMAGE_UPLOAD_FAILED: '이미지 업로드에 실패했습니다.',
    SAVE_SUCCESS: '정보가 성공적으로 저장되었습니다.',
    SAVE_FAILED: '정보 저장에 실패했습니다.'
};

const Settings = () => {

    const { userId, userImage, username, bio, setUserImage, setUsername, setBio } = useAuth();
    const [formData, setFormData] = useState({username: username || '', bio: bio || ''});
    const fileInputRef = useRef(null);

    const validateFile = (file) => {

        if (!file) return false;

        const extension = file.name.split(".").pop()?.toLowerCase();

        if (!extension || !FILE_CONSTRAINTS.ALLOWED_EXTENSIONS.includes(extension)) {
            showErrorToast(MESSAGES.INVALID_FILE_TYPE);
            return false;
        }

        if (file.size > MAX_SIZE) {
            showErrorToast(MESSAGES.FILE_TOO_LARGE);
            return false;
        }

        return true;
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const handleImageDelete = async () => {
        try {
            const res = await deleteProfile(userId);
            console.log(res);
            showSuccessToast(MESSAGES.IMAGE_DELETE_SUCCESS);
        } catch (err) {
            console.log(err);
            showErrorToast(MESSAGES.IMAGE_DELETE_FAILED);
        }
    }

    const handleImageUpload= async (e) => {
        const file = e.target.files?.[0];

        if (!file || !validateFile(file)) {
            e.target.value = '';
            return;
        }

        try {
            const res = await uploadProfile(file);
            const { presignedUrl } = res?.data;

            await uploadImageToS3(presignedUrl, file);
            const preview = presignedUrl.split("?")[0];
            setUserImage(preview);
            showSuccessToast(IMAGE_UPLOAD_SUCCESS);
        } catch (err) {
            console.log(err);
            showErrorToast(IMAGE_UPLOAD_FAILED);
        }
    }

    const handleConfirm = async (e) => {
        e.preventDefault()

        try {
            const res = await updateMyInfo(formData);
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            setUsername(formData.username);
            setBio(formData.bio);
            showSuccessToast(MESSAGES.SAVE_SUCCESS);
        } catch (error) {
            showErrorToast(MESSAGES.SAVE_FAILED);
            console.error(error);
        }
    }

    const handleCancel = () => {
        setFormData({
            username: username || '',
            bio: bio || ''
        })
    }

    return (
        <div className="settings-root">
            <Header />
            <div className="settings-body">
                <div className="setting-container" >

                    <ProfileImageSection
                        userImage={userImage}
                        onImageClick={handleImageClick}
                        onImageDelete={handleImageDelete}
                        onImageUpload={handleImageUpload}
                        fileInputRef={fileInputRef}
                    />
                    
                    <UserInfoForm
                        formData={formData}
                        onInputChange={handleInputChange}
                        onSubmit={handleConfirm}
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        </div>
    );
};

export default Settings;