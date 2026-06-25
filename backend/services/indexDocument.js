import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embeddings } from "../config/embedding.js";
import { getCollection } from "../config/chroma.js";
import { v4 as uuidv4 } from "uuid";


export async function indexDocument(docs, fileName) {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50
    })

    const splitsDocs = await splitter.splitDocuments(docs);

    const texts = splitsDocs.map(doc => doc.pageContent);

    const vectors = await embeddings.embedDocuments(texts);

    const collection = await getCollection();
    console.log("fileName received", fileName)
    console.log("sample metadata", {fileName: fileName});
    

    await collection.add({
        ids: splitsDocs.map(() => uuidv4()),
        documents: texts,
        embeddings: vectors,
        metadatas: splitsDocs.map(() => ({ fileName: fileName }))
    });

    return splitsDocs.length;
}

