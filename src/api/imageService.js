import axios from "./axios"

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post('/images', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
};

export const uploadImageToS3 = async (url, file) => {
    return await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": file.type,
        },
        body: file,
    });
};

export const uploadProfile = async (file) => {
    return axios.post("/users/me/profile", null, {
        params: { fileName : file.name }
    });
}

export const deleteProfile = async () => {
    return axios.delete("/users/me/profile");
}