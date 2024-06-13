const PromptService = require("../services/PromptService");

const createPrompt = async (request, respond) => {
  try {
    const { content } = request.body;
    if (!content) {
      return respond.status(400).json({
        status: "ERROR",
        message: "Parameter Required",
      });
    }
    const response = await PromptService.createPrompt(request.body);
    return respond.status(200).json(response); // Corrected here to use 'response'
  } catch (error) {
    return respond.status(500).json({
      status: "ERROR",
      message: error.message + "[Internal Server Error (at Prompt Service)]",
    });
  }
};

const getPromptDetail = async (request, respond) => {
  try {
    const promptId = request.params.id;
    if (!promptId) {
      return respond.status(500).json({
        status: "ERROR",
        message: "Missing Prompt ID"
      });
    }
    const response = await PromptService.getPromptDetail(promptId); // Corrected function name
    return respond.status(200).json(response); // Corrected here to use 'response'
  } catch (error) {
    return respond.status(500).json({
      status: "ERROR",
      message: error.message + "[Internal Server Error (at Prompt Service)]"
    });
  }
};

module.exports = {
  createPrompt,
  getPromptDetail,
};
