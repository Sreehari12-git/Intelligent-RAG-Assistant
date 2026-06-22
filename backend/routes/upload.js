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

router.post("/upload", upload.array("files",10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    let totalChunks = 0;
    for(const file of req.files) {
      const filePath = file.path;
      console.log("File saved at : ", filePath);
      const docs = await loadDocument(filePath);
      const chunks = await indexDocument(docs);
      totalChunks += chunks;
    }
    console.log(`Stored ${totalChunks} chunks`);

    res.json({ message: "Document indexed successfully", chunks: totalChunks });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

