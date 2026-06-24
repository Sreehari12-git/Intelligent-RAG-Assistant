import express from "express";
import { askQuestion, getChatHistory } from "../controllers/ask.controller.js";

const router = express.Router();

router.post("/ask", askQuestion);
router.get("/history", getChatHistory);

export default router;

