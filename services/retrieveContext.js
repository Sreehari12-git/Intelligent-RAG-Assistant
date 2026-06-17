import { getCollection } from "../config/chroma.js";
import { embeddings } from "../config/embedding.js";

export async function retrieveContext(question) {
    const collection = await getCollection();
    const queryEmbedding = await embeddings.embedQuery(question);
    
    const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: 3,
        include: ["documents", "distances"]  
    });

    const docs = results.documents[0];
    const distances = results.distances[0];

    console.log("Distances:", distances);  

    const DISTANCE_THRESHOLD = 1.0;
    return docs.filter((doc, i) => distances[i] < DISTANCE_THRESHOLD);
}
