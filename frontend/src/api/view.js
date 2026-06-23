import axios from "axios";
import api from "./axios";

export const viewDocuments = async() => {
    const res = await api.get("/document/view-all");
    return res.data;
}

export const deleteDocument = async (fileName) => {
    const res = await api.delete("/document/delete", {
        data: { fileName }
    });
    return res.data;
}