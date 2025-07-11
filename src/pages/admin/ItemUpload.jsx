import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { getDefaultImage } from "../../util/get-images";
import { showErrorToast, showSuccessToast } from "../../util/toast";
import { createItem } from "../../api/itemService";
import { HttpStatusCode } from "axios";

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

const ItemUpload = () => {

    const { user, role } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', description: '', price: 0 });
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (role != 'ROLE_ADMIN') {
            navigate("/", {replace: true});
        }
    }, [user]);

    const validateFile = (file) => {

        if (!file) return false;

        const extension = file.name.split(".").pop()?.toLowerCase();

        if (!extension || !FILE_CONSTRAINTS.ALLOWED_EXTENSIONS.includes(extension)) {
            showErrorToast(MESSAGES.INVALID_FILE_TYPE);
            return false;
        }

        if (file.size > FILE_CONSTRAINTS.MAX_SIZE) {
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

        // if (userImage == null) return;

        try {
            // await deleteProfile(userId);
            showSuccessToast(MESSAGES.IMAGE_DELETE_SUCCESS);
        } catch (err) {
            console.log(err);
            showErrorToast(MESSAGES.IMAGE_DELETE_FAILED);
        }
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];

        if (!validateFile(file)) {
            return;
        }

        try {
            // const res = await uploadProfile(file);
            const { presignedUrl } = res?.data;

            // await uploadImageToS3(presignedUrl, file);
            const preview = presignedUrl.split("?")[0];
            showSuccessToast(MESSAGES.IMAGE_UPLOAD_SUCCESS);
        } catch (err) {
            console.log(err);
            showErrorToast(MESSAGES.IMAGE_UPLOAD_FAILED);
        }
    }

    const handleConfirm = async (e) => {
        e.preventDefault()

        try {
            console.log(formData);

            const res = await createItem(formData);
            console.log(res);
            if (res.status != HttpStatusCode.Created) {
                throw err;
            }
            showSuccessToast(MESSAGES.SAVE_SUCCESS);
        } catch (err) {
            showErrorToast(MESSAGES.SAVE_FAILED);
            console.error(err);
        }
    }

    return (
        <div className="flex w-full h-full">
            <Header />
            <div className="mt-14 w-full h-full flex flex-col">
                <div className="mt-10 min-w-md mx-auto text-left" >


                    {/* <ProfileImageSection
                        userImage={userImage}
                        onImageClick={handleImageClick}
                        onImageDelete={handleImageDelete}
                        onImageUpload={handleImageUpload}
                        fileInputRef={fileInputRef}
                    /> */}

                    <form onSubmit={handleConfirm} >
                        <div className="flex flex-col">
                            <h4>아이템 이름</h4>
                            <input
                                className="w-full px-3 py-1 round-box-border input-form"
                                placeholder="아이템 이름을 입력하세요."
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <h4>아이템 설명</h4>
                            <input
                                className="w-full px-3 py-1 round-box-border input-form"
                                placeholder="아이템 설명을 입력하세요."
                                type="text"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <h4>아이템 가격</h4>
                            <input
                                className="w-full px-3 py-1 round-box-border input-form"
                                placeholder="아이템 가격을 입력하세요."
                                type="number"
                                value={formData.price}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                            />
                        </div>
                        <div className="flex w-fit h-fit mt-4 gap-2 ml-auto">
                            <button
                                className="btn-primary text-sm px-5 py-1.5 disabled:bg-gray-300"
                                type="submit"
                                disabled={!formData.name | !formData.description | !formData.price}
                            >확인
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ItemUpload;