import { searchWeb } from "./services/tavilyService.js";
import dotenv from "dotenv"
dotenv.config();

const result = await searchWeb("Who is the CEO of apple?")

console.log(result);
