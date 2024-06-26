const Prompt = require("../models/Prompt");

const createPrompt = async (newPrompt) => {
  const { content, result } = newPrompt; // Destructure content and result

  try {
    // Create a new Prompt instance with content and result
    const prompt = new Prompt({
      content,
      result, 
    });
    console.log(prompt)

    // Save the prompt to the database
    await prompt.save();

    return {
      status: "OK",
      message: "SUCCESS",
      data: prompt,
    };
  } catch (error) {
    throw new Error(error.message + "Internal Server Error (at Prompt Service)");
  }
};

const getPromptDetail = async (result) => {
  try {
    const prompt = await Prompt.findById(result);
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
    throw new Error(error.message + "Internal Server Error (at Prompt Service)");
  }
};

const getAllPromptDetail = async () => {
  try {
    const prompts = await Prompt.find();
    return {
      status: "OK",
      message: "SUCCESS",
      data: prompts,
    };
  } catch (error) {
    throw new Error(error.message + "Internal Server Error (at Prompt Service)");
  }
};

const deletePrompt = async (id) => {
  try {
    const prompt = await Prompt.findByIdAndDelete(id);
    if (!prompt) {
      return {
        status: "ERROR",
        message: "Undefined Prompt",
      };
    }
    return {
      status: "OK",
      message: "Prompt Deletion Sucessfully",
      data: prompt,
    }

  } catch (error) {
    throw new Error(error.message + "Internal Server Error (at Prompt Service");
  }
};

module.exports = {
  createPrompt,
  getPromptDetail,
  getAllPromptDetail,
  deletePrompt,
};
