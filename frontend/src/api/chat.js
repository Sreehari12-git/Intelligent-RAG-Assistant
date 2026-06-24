import api from "./axios";

export const askQuestion = async ({question, deviceId}) => {
    try {
        const response = await api.post("/ask", { question, deviceId }, { 
            responseType: "text"
        });

        const raw = response.data;
        const answer = raw.split("Answer:")[1]?.trim();
        return answer;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

