import { getCollection } from "../config/chroma.js";
import { embeddings } from "../config/embedding.js";

export async function retrieveContext(question) {
    const collection = await getCollection();
    const queryEmbedding = await embeddings.embedQuery(question);
    
    const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: 3
    })

    return results.documents[0];
}