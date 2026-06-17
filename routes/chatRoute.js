import express from "express"
import { retrieveContext } from "../services/retrieveContext.js"
import { model } from "../config/llm.js";


const router = express.Router();

router.post("/ask", async(req,res) => {
    try {
        const {question} = req.body;

        const context =  await retrieveContext(question);
        const prompt = `You are a helpful assistant.Answer the user's question using only the context below.Context: ${context.join("\n\n")} Question:${question}`;
        const response = await model.invoke(prompt);


        res.set("Content-Type","text/plain")
        res.send(`Question: ${question}\nAnswer: ${response.content}`);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
})

export default router;
