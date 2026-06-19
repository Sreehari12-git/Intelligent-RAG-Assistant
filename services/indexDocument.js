import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embeddings } from "../config/embedding.js";
import { getCollection } from "../config/chroma.js";

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
        ids: splitsDocs.map((_, i) => `chunk-${Date.now()}-${i}`),
        documents: texts,
        embeddings: vectors,
    });

    return splitsDocs.length;
}

