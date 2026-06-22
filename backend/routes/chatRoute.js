import express from "express";
import { askQuestion } from "../services/ragService.js";

const router = express.Router();

router.post("/ask", async (req, res) => {
    try {
        const { question } = req.body;
        const result = await askQuestion(question);

        res.set("Content-Type", "text/plain");
        res.send(`Source: ${result.source}\n\nQuestion: ${result.question}\nAnswer: ${result.answer}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;