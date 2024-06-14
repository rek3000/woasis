const ChatService = require("../services/ChatService");

const createChat = async (request, respond) => {
  try {
    const { user, name, prompts } = request.body; 
    if (!user) {
      return respond.status(400).json({
        status: "ERROR",
        message: "Parameter Required: 'user' (the user Id) is missing",
      })
    }
    if (!name) {
      return respond.status(400).json({
        status: "ERROR",
        message: "Parameter Required: 'name' (Chat name) is missing",
      })
    }
    const chatResponse = await ChatService.createChat(user, name, prompts);

    return respond.status(200).json({
      status: "OK",
      message: "Chat created successfully",
      data: chatResponse.data,
    });
  } catch (error) {
    return respond.status(500).json({
      status: "ERROR",
      message: error.message + " [Internal Server Error (at Chat Controller)]",
    });
  }
};

const getChatDetail = async (request, respond) => {
  try {
    const chatId = request.params.id;
    if (!chatId) {
      return respond.status(400).json({
        status: "ERROR",
        message: "Missing Chat ID",
      });
    }

    const chatResponse = await ChatService.getChatDetail(chatId);
    if (chatResponse.status === "ERROR") {
      return respond.status(404).json(chatResponse); // Chat not found
    }

    return respond.status(200).json(chatResponse);
  } catch (error) {
    return respond.status(500).json({
      status: "ERROR",
      message: error.message + " [Internal Server Error (at Chat Controller)]",
    });
  }
};

module.exports = {
  createChat,
  getChatDetail,
};
