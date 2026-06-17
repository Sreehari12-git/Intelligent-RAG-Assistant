import { embeddings } from "../config/embedding.js";
import { getCollection } from "../config/chroma.js";

export async function retrieveContext(question) {
  const collection = await getCollection();
  const queryEmbedding = await embeddings.embedQuery(question);
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 2,
  });
  return results.documents[0].join("\n");
}

