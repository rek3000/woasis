const express = require("express");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server-side error!");
})

app.get("/api/ai/test", async (req, res) => {
  let message = req.body.message;
  if (!message) {
    message = "hello, Gemini. Describe your self"
  }

  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  const MODEL_NAME = "gemini-1.0-pro-001";
  const API_KEY = "AIzaSyCLQyY4qFOSDcBPNoEv3J1AN3lTkUhIeUY";

  async function runChat() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

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
      history: [
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    console.log(response.text());
    return res.type('text/plain').send(response.text());
  }

  runChat();

});

app.listen(8000);
