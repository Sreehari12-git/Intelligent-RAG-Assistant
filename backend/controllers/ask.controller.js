import { askQuestion as ragAskQuestion } from "../services/ragService.js";

export const askQuestion = async (req, res) => {
    try {
        console.log("req.body:", req.body);
        const { question} = req.body;
        console.log("question:", question);
        const result = await ragAskQuestion(question);

        res.set("Content-Type", "text/plain");
        res.send(`Source: ${result.source}\n\nQuestion: ${result.question}\nAnswer: ${result.answer}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

