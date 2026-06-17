// import fs from "fs";
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// import { embeddings } from "../config/embedding.js";
// import { client, COLLECTION_NAME } from "../config/chroma.js";
// import {loadDocument} from "../loaders/documentLoader.js"


// const docs = await loadDocument("data/sample.pdf");

// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 500,
//   chunkOverlap: 50,
// });

// const splitDocs = await splitter.splitDocuments(docs);

// const texts = splitDocs.map(doc => doc.pageContent);

// const vectors = await embeddings.embedDocuments(texts);

// const collection = await client.getOrCreateCollection({
//   name: COLLECTION_NAME,
// });

// await collection.add({
//   ids: docs.map((_, i) => `doc-${i}`),
//   documents: texts,
//   embeddings: vectors,
// });

// console.log("Documents stored successfully");
