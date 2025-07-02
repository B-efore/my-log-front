import logo from './../assets/earth.png';
import defaultProfile from './../assets/mini왹.png'
import searchBtn from './../assets/search.png'
import searchAlienBtn from './../assets/search-alien.png'
import writeBtn from './../assets/write.png'

export function getLogoImage() {
    return logo;
}

export function getDefaultImage() {
    return defaultProfile;
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