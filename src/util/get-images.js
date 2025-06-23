import logo from './../assets/earth.png';
import defaultProfile from './../assets/mini왹.png'

export function getLogoImage() {
    return logo;
}

export function getDefaultImage() {
    return defaultProfile;
}

export const getProfileImage = (key) => {
      return key 
    ? `https://mylog-image-bucket.s3.ap-northeast-2.amazonaws.com/${key}` 
    : defaultProfile;
}