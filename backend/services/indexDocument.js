import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embeddings } from "../config/embedding.js";
import { getCollection } from "../config/chroma.js";
import { v4 as uuidv4 } from "uuid";


export async function indexDocument(docs) {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50
    })

    const splitsDocs = await splitter.splitDocuments(docs);

    const texts = splitsDocs.map(doc => doc.pageContent);

    const vectors = await embeddings.embedDocuments(texts);

    const collection = await getCollection();

    await collection.add({
        ids: splitsDocs.map(() => uuidv4()),
        documents: texts,
        embeddings: vectors,
    });

    return splitsDocs.length;
}

