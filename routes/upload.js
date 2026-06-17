import express from "express";
import multer from "multer";
import path from "path";
import { loadDocument } from "../loaders/documentLoader.js";
import { indexDocument } from "../services/indexDocument.js";


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); 
    cb(null, Date.now() + ext);                 
  }
});

const upload = multer({ storage });  

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const filePath = req.file.path;
    console.log("File saved at:", filePath); 

    const docs = await loadDocument(filePath);
    const totalChunks = await indexDocument(docs);
    console.log(`Stored ${totalChunks} chunks`);

    res.json({ message: "Document indexed successfully", chunks: totalChunks });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

