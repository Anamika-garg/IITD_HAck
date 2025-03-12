const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const dotenv = require("dotenv");

dotenv.config();

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-pro",
  temperature: 0,
  maxRetries: 2,
});

module.exports = llm;