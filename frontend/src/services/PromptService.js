import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

// const api = axios.create({
//   baseURL: process.env.REACT_APP_SERVER_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Function to send prompt to Gemini
// export const sendPromptToGemini = async (prompt) => {
//   try {
//     const response = await api.post('/prompt/create', { content: prompt });
//     return response.data.data; // Assuming your backend returns the prompt data with generated response
//   } catch (error) {
//     console.error('Error sending prompt to Gemini:', error);
//     throw error;
//   }
// };

// Helper function to handle responses
const handleResponse = async (response) => {
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

// Create a prompt which takes the question/content from the body
export const createPrompt = async (data) => {
  const response = await fetch("http://localhost:8000/api/prompt/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

// Get prompt details (content and result)
export const getPromptDetail = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/prompt/get/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(response);
};

// Delete a prompt
export const deletePrompt = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/prompt/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(response);
};
