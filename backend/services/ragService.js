import { retrieveContext } from "./retrieveContext.js";
import { model } from "../config/llm.js";
import { searchWeb } from "./tavilyService.js";
import { indexWebResults } from "./indexWebResults.js";
import { classifyIntent, getChitchatResponse } from "./intentRouter.js";


export async function askQuestion(question) {

    const intent = await classifyIntent(question);

    if(intent === "chitchat") {
        const answer = await getChitchatResponse(question);
        return {
            question,
            answer,
            source: "chitchat"
        }
    }

    let docs = await retrieveContext(question);

    let context = "";
    let source = "";

    const hasValidDocs = docs && docs.length > 0 && docs.some(d => d && d.trim().length > 30);

    if (hasValidDocs) {
        context = docs.join("\n\n");
        source = "documents";
    } else {
        const webData = await searchWeb(question);
        await indexWebResults(webData, question); 

        context = webData.map(item => `Title: ${item.title}\nContent: ${item.content}\nURL: ${item.url}`).join("\n\n");
        source = "internet"; 
    }

    const response = await model.invoke(
        `Answer the question using the context. Context: ${context} Question: ${question}`
    );

    return {
        question,
        answer: response.content,
        source
    };
}

