import "dotenv/config";
import { CloudClient } from "chromadb";

export const COLLECTION_NAME = "rag_db";

export const client = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY,
  tenant: process.env.CHROMA_TENANT,
  database: process.env.CHROMA_DATABASE,
});


export async function getCollection() {
  const collection = await client.getOrCreateCollection({
    name: COLLECTION_NAME,
    embeddingFunction: null,
  });
  return collection;
}
