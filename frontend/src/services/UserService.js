import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const handleResponse = async (response) => {
<<<<<<< HEAD
  const contentType = response.headers.get("content-type");
  if (!response.ok) {
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    } else {
      throw new Error("Network response was not ok and not JSON");
    }
  }
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    throw new Error("Network response was not JSON");
  }
};

// Get the currently logged user Id
// export const getCurrentUser = async () => {
//   const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/get-current`, data);
//   return response.data;
// }

// Create a prompt which takes the question/content from the body
export const getCurrentUser = async (data) => {
  const response = await fetch("http://localhost:8000/api/user/get-current", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};
=======
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

>>>>>>> ea52429e65f9a739f71d536e73ad58e05265db2d


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