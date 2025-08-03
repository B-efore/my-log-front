import logo from './../assets/earth.png';
import defaultProfile from './../assets/mini왹.png'
import searchBtn from './../assets/search.png'
import searchAlienBtn from './../assets/search-alien.png'
import writeBtn from './../assets/write.png'
import notFoundImg from './../assets/not_found.png'
import strongAlien from './../assets/strong-alien.png'
import coinAlien from './../assets/coin_alien.png'
import ghost from './../assets/ghost.png'
import notification from './../assets/notification.png'
import likeAlien from './../assets/like_alien.png'

export const MAX_POST_IMAGE_SIZE = 1 * 1024 * 1024;
export const VALID_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];

export function validatePostImage(file) {
    const extension = file.name.split(".").pop().toLowerCase();

    if (!VALID_EXTENSIONS.includes(extension)) {
        return { valid: false, error: "지원하지 않는 이미지 형식입니다." };
    }

    if (file.size > MAX_POST_IMAGE_SIZE) {
        return { valid: false, error: "이미지 크기는 1MB를 초과할 수 없습니다." };
    }

    return { valid: true };
}

export function getLogoImage() {
    return logo;
}

export function getDefaultImage() {
    return defaultProfile;
}

export function getNotFound() {
    return notFoundImg;
}

export const getProfileImage = (key) => {
    return key && key.trim()
        ? `https://mylog-image-bucket.s3.ap-northeast-2.amazonaws.com/${key}`
        : defaultProfile;
}

export function getSearchBtnImage() {
    return searchBtn;
}

export function getSearchHoverBtnImage() {
    return searchAlienBtn;
}

export function getWriteBtnImage() {
    return writeBtn;
}

export function getStrongAlien() {
    return strongAlien;
}

export function getCoinAlien() {
    return coinAlien;
}

export function getGhost() {
    return ghost;
}

export function getNotificationIcon() {
    return notification;
}

export function getLikeAlien() {
    return likeAlien;
}