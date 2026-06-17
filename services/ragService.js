import { retrieveContext } from "./retrieveContext.js";
import { model } from "../config/llm.js";
import { searchWeb } from "./tavilyService.js";

export async function askQuestion(question) {

    const docs = await retrieveContext(question);

    let context = "";
    let source = "";

    // 🔥 SAFE CHECK: only trust meaningful docs
    const hasValidDocs =
        docs &&
        docs.length > 0 &&
        docs.some(d => d && d.trim().length > 30);

    if (hasValidDocs) {
        context = docs.join("\n\n");
        source = "documents";
    } else {
const webData = await searchWeb(question);

context = webData
    .map(item => `
Title: ${item.title}
Content: ${item.content}
URL: ${item.url}
    `)
    .join("\n\n");

source = "internet";
    }

    const response = await model.invoke(`
Answer the question using the context.

Context:
${context}

Question:
${question}
    `);


    return {
        question,
        answer: response.content,
        source
    };
}
