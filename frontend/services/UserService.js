import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Get the currently logged user Id
export const getCurrentUser = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/get-current`, data);
  return response.data;
}

// Get an user by email
export const getUserbyEmail = async (email) => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/get-by-email/${email}`, data);
  return response.data;
}

// Get an user by id
export const getUserbyId = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/get-by-id/${id}`, data);
  return response.data;
}

//Below is the User model
// const userSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     picture: { type: String },
//     chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }], // Array of Chat references
//   },
//   {
//     timestamps: true,
//   }
// );