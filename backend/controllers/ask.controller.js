import { PrismaClient } from "../generated/prisma/client.js";
import { askQuestion as ragAskQuestion } from "../services/ragService.js";

const prisma = new PrismaClient();

export const askQuestion = async (req, res) => {
    try {
        const { question, deviceId } = req.body;
        const result = await ragAskQuestion(question);

        await prisma.chatHistory.create({
        data: {
            deviceId,
            question,
            answer: result.answer
        }
        });

        res.set("Content-Type", "text/plain");
        res.send(`Source: ${result.source}\n\nQuestion: ${result.question}\nAnswer: ${result.answer}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


export const getChatHistory = async (req, res) => {
    try {
        const { deviceId } = req.query;

        if (!deviceId) {
            return res.status(400).json({ error: "deviceId is required" });
        }

        const history = await prisma.chatHistory.findMany({
            where: { deviceId },
            orderBy: { createdAt: "asc" }
        });

        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


