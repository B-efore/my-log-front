import axios from ".axios";

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const rest = await axios.post('/images', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
};

return res.data.url;