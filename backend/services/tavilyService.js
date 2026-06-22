import { tavily } from "@tavily/core"

const client = tavily({
    apiKey: process.env.TAVILY_API_KEY
});

export async function searchWeb(question) {
    try {
        const response = await client.search(question, {
            searchDepth: "advanced",
            maxResults: 5,
        });

        return response.results.map((item) => ({
            title: item.title,
            content: item.content,
            url: item.url
        }));

    } catch(error) {
        throw new Error("Tavily search failed: " + error.message);
    }
}

