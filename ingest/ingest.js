import fs from "fs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embeddings } from "../config/embedding.js";
import { client, COLLECTION_NAME } from "../config/chroma.js";

const text = fs.readFileSync("data/data.txt", "utf8");

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
});

const docs = await splitter.createDocuments([text]);

const texts = docs.map(doc => doc.pageContent);

const vectors = await embeddings.embedDocuments(texts);

const collection = await client.getOrCreateCollection({
  name: COLLECTION_NAME,
});

await collection.add({
  ids: docs.map((_, i) => `doc-${i}`),
  documents: texts,
  embeddings: vectors,
});

console.log("Documents stored successfully");
