const PromptService = require("../services/PromptService");
const GeminiService = require("../services/GeminiService");
const OAuth2Service = require("../services/OAuth2Service");

const createPrompt = async (request, respond) => {
  try {
    const { content } = request.body;

    if (!content) {
      return respond.status(400).json({
        status: "ERROR",
        message: "Parameter Required: 'content' is missing",
      });
    }
    // console.log(OAuth2Service.getCurrentUserId(request));
    const userId = await OAuth2Service.getCurrentUserId(request);

    const geminiResponse = await GeminiService.sendPromptToGemini(content);

    const newPrompt = {
      content,
      result: geminiResponse,
    };

    const promptResponse = await PromptService.createPrompt(newPrompt, userId);

    return respond.status(200).json({
      status: "OK",
      message: "Prompt created successfully",
      data: {
        prompt: promptResponse.data,
      },
    });
  } catch (error) {
    return respond.status(500).json({
      status: "ERROR",
      message: error.message + " [Internal Server Error (at Prompt Controller - Create Prompt)]",
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
      message: error.message + " [Internal Server Error (at Prompt Controller - Get Prompt Detail)]",
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
      message: error.message + "[Internal Server Error (at Prompt Controller - Get All Prompt Detail)]",
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
      message: error.message + " [Internal Server Error (at Prompt Controller - Delete Prompt)]",
    })
  }
};

module.exports = {
  createPrompt,
  getPromptDetail,
  getAllPromptDetail,
  deletePrompt,
};
