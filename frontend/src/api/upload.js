import api from "./axios";

export const uploadDocuments = async (files) => {
    try {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });

        const response = await api.post("/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

