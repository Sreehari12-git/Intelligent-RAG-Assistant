import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv"
dotenv.config()

export const model = new ChatGoogleGenerativeAI({
    apiKey : process.env.GEMINI_API_KEY,
    model: "gemini-2.5-flash"
})
