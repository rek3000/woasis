const PromptService = require("../services/PromptService");
const GeminiService = require("../services/GeminiService");

const createPrompt = async (request, respond) => {
  try {
    const { content } = request.body;
    if (!content) {
      return respond.status(400).json({
        status: "ERROR",
        message: "Parameter Required: 'content' is missing",
      });
    }

    // Send prompt to Gemini and get response
    const geminiResponse = await GeminiService.sendPromptToGemini(content);

    // Create new prompt object with content and geminiResponse
    const newPrompt = {
      content,
      result: geminiResponse, // Assuming geminiResponse is a string
    };

    // Store prompt in database
    const response = await PromptService.createPrompt(newPrompt);

    return respond.status(200).json({
      status: "OK",
      message: "SUCCESS",
      data: response.data,
    });
  } catch (error) {
    return respond.status(500).json({
      status: "ERROR",
      message: error.message + " [Internal Server Error (at Prompt Controller)]",
    });
  }
};

const getPromptDetail = async (request, respond) => {
  try {
    const promptId = request.params.id;
    if (!promptId) {
      return respond.status(400).json({
        status: "ERROR",
        message: "Missing Prompt ID",
      });
    }

    const response = await PromptService.getPromptDetail(promptId);
    if (response.status === "ERROR") {
      return respond.status(404).json(response); // Prompt not found
    }

    return respond.status(200).json(response);
  } catch (error) {
    return respond.status(500).json({
      status: "ERROR",
      message: error.message + " [Internal Server Error (at Prompt Controller)]",
    });
  }
};

const getAllPromptDetail = async (request, response) => {
  try {
    const responseData = await PromptService.getAllPromptDetail();

    return response.status(200).json({
      status: "OK",
      message: "SUCCESS",
      data: responseData.data,
    });
  } catch (error) {
    return response.status(500).json({
      status: "ERROR",
      message: error.message + "[Internal Server Error (at Prompt Controller)]",
    });
  }
};

const deletePrompt = async (request, respond) => {
  try {
    const promptId = request.params.id;
    if (!promptId) {
      return respond.status(400).json({
        status: "ERROR",
        message: "Missing Prompt ID",
      });
    }
    const response = await PromptService.deletePrompt(promptId);
    return respond.status(200).json(response);
  } catch (error) {
    return respond.status(500).json({
      status: "ERROR",
      message: error.message + " [Internal Server Error (at Prompt Controller)]",
    })
  }
};

module.exports = {
  createPrompt,
  getPromptDetail,
  getAllPromptDetail,
  deletePrompt,
};
