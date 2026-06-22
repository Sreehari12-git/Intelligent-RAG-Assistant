import axios from "axios";
import api from "./axios";

export const loginUser = async(email,password) => {
    try {
        const response = await api.post("/auth/login", {
            email,
            password
        })

        return response.data
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

export const getMe = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (err) {
    return null;
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
