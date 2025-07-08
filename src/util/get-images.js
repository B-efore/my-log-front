import logo from './../assets/earth.png';
import defaultProfile from './../assets/mini왹.png'
import searchBtn from './../assets/search.png'
import searchAlienBtn from './../assets/search-alien.png'
import writeBtn from './../assets/write.png'
import notFoundImg from './../assets/not_found.png'
import strongAlien from './../assets/strong-alien.png'

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