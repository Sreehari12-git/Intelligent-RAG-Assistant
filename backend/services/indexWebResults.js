import { getCollection } from "../config/chroma.js"
import { embeddings } from "../config/embedding.js";

export async function indexWebResults(webResults, question) {
    const collection = await getCollection();

    const documents = webResults.map(item => {
        return `${item.title}\n\n${item.content}\n\nSource: ${item.url}`; 
    })
    
    const metadatas = webResults.map(item => ({
        source: "internet",
        url: item.url,
        question: question
    }))

    const ids = webResults.map((_,i) => `web-${Date.now()}-${i}`);

    const embeddingsArray = await embeddings.embedDocuments(documents);

    await collection.add({ids,documents,embeddings: embeddingsArray,metadatas});
}

