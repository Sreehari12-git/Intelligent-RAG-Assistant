import express from "express"
import { retrieveContext } from "../services/retrieveContext.js"

const router = express.Router();

router.post("/ask", async(req,res) => {
    try {
        const {question} = req.body;

        const context =  await retrieveContext(question);

        res.json({question, context});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
})

export default router;
