import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import fs from "fs/promises";

export async function loadDocument(filePath) {
  const extension = filePath.split(".").pop().toLowerCase();

  switch (extension) {
    case "pdf": {
      const loader = new PDFLoader(filePath);
      return await loader.load();
    }

    case "docx": {
      const loader = new DocxLoader(filePath);
      return await loader.load();
    }

    case "txt": {
      const text = await fs.readFile(filePath, "utf8");
      return [{ pageContent: text }];
    }

    default:
      throw new Error("Unsupported file type");
  }
}

