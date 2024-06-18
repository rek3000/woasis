const path = require('path');
const dotenv = require("dotenv").config({path: path.resolve(__dirname, "../.env") });
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const sendPromptToGemini = async (prompt) => {
  try {
    if (!prompt) {
      prompt = "Introduce yourself, Gemini. Describe your ability on grammar check, text completion, paraphrasing and plagiarism check.";
    }
    console.log("PROMT_TO_GEMINI:"+prompt);
    // console.log(process.env.GEMINI_API_KEY);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: process.env.MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(prompt); // Use `prompt` instead of `message`
    const response = result.response;
    console.log(response.text());
    return response.text(); // Adjusted to return text directly
  } catch (error) {
    throw new Error(error.message || "Internal Server Error (at Gemini API)");
  }
};

module.exports = {
  sendPromptToGemini,
};
