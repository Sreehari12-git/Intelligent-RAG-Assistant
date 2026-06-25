import { model } from "../config/llm.js";

const GREETING_PATTERN = /^\s*(hi+|hello+|hey+|good\s*(morning|afternoon|evening)|yo|sup|hola)\s*[!.?]*\s*$/i;
const FAREWELL_PATTERN = /^\s*(bye|goodbye|see\s*you|thanks?|thank\s*you|ty|cya)\s*[!.?]*\s*$/i;

function ruleBasedIntent(question) {
    const q = question.trim();
    if (GREETING_PATTERN.test(q) || FAREWELL_PATTERN.test(q)) return "chitchat";
    return null;
}

const CLASSIFIER_PROMPT = (question) => `You are an intent classifier.
Classify the message into exactly one label: "chitchat" or "query".
- "chitchat": greetings, small talk, thanks, farewells.
- "query": a real question that needs information.

Respond with ONLY the label.

Message: "${question}"
Label:`;

async function llmClassifyIntent(question) {
    const response = await model.invoke(CLASSIFIER_PROMPT(question));
    const label = response.content.trim().toLowerCase();
    return label.includes("chitchat") ? "chitchat" : "query";
}

export async function classifyIntent(question) {
    const quick = ruleBasedIntent(question);
    if (quick) return quick;

    if (question.trim().split(/\s+/).length > 12) return "query";

    return await llmClassifyIntent(question);
}

const CHITCHAT_SYSTEM_PROMPT = `You are a warm, respectful, and helpful assistant.
Reply briefly (1-2 sentences) and politely to greetings, small talk, or thanks.
If it's a greeting, end by offering to help, e.g. "Hello! How can I help you today?"`;

export async function getChitchatResponse(question) {
    const response = await model.invoke(
        `${CHITCHAT_SYSTEM_PROMPT}\n\nUser message: "${question}"`
    );
    return response.content;
}

