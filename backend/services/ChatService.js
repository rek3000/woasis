const Chat = require('../models/Chat');
const User = require('../models/User');

const createChat = async (user, name, prompts) => {
  try {
    const user = await User.findById(user);
    const chat = new Chat({
      name: name,
      prompts: prompts, // Array of prompt IDs
      user: user, // User ID
    });

    await chat.save();

    // Add the new chat to the user's chats array
    user.chats.push(chat);
    await user.save();

    return {
      status: 'OK',
      message: 'Chat created successfully',
      data: chat, // Include the chat object in the response
    };
  } catch (error) {
    return {
      status: 'ERROR',
      message: error.message || 'Internal Server Error',
    };
  }
};

const getChatDetail = async (chatId) => {
  try {
    const chat = await Chat.findById(chatId).populate('prompts');
    if (!chat) {
      return {
        status: 'ERROR',
        message: 'Chat not found',
      };
    }

    return {
      status: 'OK',
      message: 'SUCCESS',
      data: chat,
    };
  } catch (error) {
    return {
      status: 'ERROR',
      message: error.message || 'Internal Server Error',
    };
  }
}; 

module.exports = {
  createChat,
  getChatDetail,
};
