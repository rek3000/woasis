import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Create a prompt which take the question/content from the body
export const createPrompt = async () => {
  const respond = await axios.post(`${process.env.REACT_APP_SERVER_URL}/prompt/create`, data);
  return respond.data
}

// Get a prompt details (content and result)
export const getPromptDetail = async (id) => {
  const respond = await axios.get(`${process.env.REACT_APP_SERVER_URL}/prompt/get/${id}`, data);
  return respond.data
}

// Delete a prompt
export const deletePrompt = async (id) => {
  const respond = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/prompt/delete/${id}`, data)
  return respond.data
}

//Below is the Prompt model
// const promptSchema = new Schema(
//   {
//     content: { type: String, required: true },
//     result: {type: String, required: true},
//   },
//   {
//     timestamps: true,
//   }
// );