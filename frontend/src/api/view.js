import axios from "axios";
import api from "./axios";

export const viewDocuments = async() => {
    const res = await api.get("/document/view-all");
    return res.data;
}

export async function deleteDocument(fileName) {
  const res = await fetch(`/api/delete/${fileName}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed"); 
  return res.json();
}

