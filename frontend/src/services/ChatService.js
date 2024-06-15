import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Create a chat
export const createChat = async () => {
  const respond = await axios.post(`${process.env.REACT_APP_SERVER_URL}/chat/create`, data);
  return respond.data
}

// Get a chat data
export const getChatDetail = async (id) => {
  const respond = await axios.post(`${process.env.REACT_APP_SERVER_URL}/chat/create/${id}`, data);
  return respond.data
}

// Below is the Chat model
// const chatSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     prompts: [{ type: Schema.Types.ObjectId, ref: 'Prompt' }], // Array of Prompt references
//     user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
//   },
//   {
//     timestamps: true,
//   }
// );