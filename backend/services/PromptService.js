const Prompt = require("../models/Prompt");

const createPrompt = async (newPrompt, userId) => {
  try {
    // Create a new prompt document
    const prompt = new PromptModel(newPrompt);

    // Save the prompt to the database
    const savedPrompt = await prompt.save();

    // Find the user by userId and update their prompts array
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { prompts: savedPrompt._id } },
      { new: true, useFindAndModify: false }
    );

    // If the user is not found, throw an error
    if (!user) {
      throw new Error("User not found");
    }

    return {
      status: "OK",
      data: savedPrompt,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error.message,
    };
  }
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
