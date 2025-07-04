import axios from "./axios";

export const follow = async (toUserId) => {
    return axios.post(`/users/follow/${toUserId}`);
}

export const unfollow = async (toUserId) => {
    return axios.delete(`/users/follow/${toUserId}`);
}

export const checkFollowing = async (currentUserId, targetUserId) => {
    return axios.get(`/users/${currentUserId}/followings/${targetUserId}`)
}

export const getFollowCounts = async (userId) => {
    return axios.get(`/users/${userId}/follows`);
}

export const getFollowers = async (userId) => {
    return axios.get(`/users/${userId}/followers`);
}

export const getFollowings = async (userId) => {
    return axios.get(`/users/${userId}/followings`);
}