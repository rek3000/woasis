import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const handleResponse = async (response) => {
  if (!response.data) {
    throw new Error("Network response was not ok or no data received");
  }
  return response.data;
};

export const getCurrentUser = async (token) => {
  try {
    const response = await axios.get("http://localhost:8000/api/user/get-current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to get current user: ${error.message}`);
  }
};



// Get an user by email
export const getUserbyEmail = async (email) => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/get-by-email/${email}`);
  return response.data;
}

// Get an user by id
export const getUserbyId = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/get-by-id/${id}`);
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