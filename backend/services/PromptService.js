const Prompt = require("../models/Prompt")

const createPrompt = async (newPrompt) => {
  const {
    content,
  } = newPrompt;

  try {
    const prompt = new Prompt({
      content,
    });
  
    await prompt.save();
  
    return {
      status: "OK",
      message: "SUCESS",
      data: prompt,
    }
  } catch (error) {
    throw new Error(error.message || "Check Internal Server Error")
  };
};

const getPromptDetail = async (id) => {
  try {
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return {
        status: "ERROR",
        message: "Undefined Prompt",
      };
    }
    return {
      status: "OK",
      message: "SUCCESS",
      data: prompt,
    };
  } catch (error) {
    throw new Error(error.message || "Internal Server Error");
  }
};

module.exports = {
  createPrompt,
  getPromptDetail,
};