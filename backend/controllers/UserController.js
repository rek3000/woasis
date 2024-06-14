const UserService = require("../services/UserService");
const OAuth2Service = require("../services/OAuth2Service");

const createUser = async (request, response) => {
  try {
    const { name, email } = request.body;
    if (!name || !email) {
      return response.status(400).json({
        status: "ERROR",
        message: "Name and Email are required",
      });
    }

    const userResponse = await UserService.createUser({ name, email });

    return response.status(200).json({
      status: "OK",
      message: "SUCCESS",
      data: userResponse.data,
    });
  } catch (error) {
    return response.status(500).json({
      status: "ERROR",
      message: error.message + " [Internal Server Error (at UserController)]",
    });
  }
};

const getCurrentUser = async (request, response) => {
  try {
    const user = await OAuth2Service.getCurrentUser(request);
    return response.status(200).json({
      status: "OK",
      message: "SUCCESS",
      data: user,
    });
  } catch (error) {
    return response.status(401).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const getUserById = async (request, response) => {
  try {
    const { id } = request.params;
    if (!id) {
      return response.status(400).json({
        status: "ERROR",
        message: "ID is required",
      });
    }

    const userResponse = await UserService.getUserById(id);

    if (userResponse.status === "OK") {
      return response.status(200).json({
        status: "OK",
        message: "SUCCESS",
        data: userResponse.data,
      });
    } else {
      return response.status(404).json({
        status: "ERROR",
        message: userResponse.message,
      });
    }
  } catch (error) {
    return response.status(500).json({
      status: "ERROR",
      message: error.message + " [Internal Server Error (at UserController)]",
    });
  }
};

const getUserByEmail = async (request, response) => {
  try {
    const { email } = request.params;
    if (!email) {
      return response.status(400).json({
        status: "ERROR",
        message: "Email is required",
      });
    }

    const userResponse = await UserService.getUserByEmail(email);

    if (userResponse.status === "OK") {
      return response.status(200).json({
        status: "OK",
        message: "SUCCESS",
        data: userResponse.data,
      });
    } else {
      return response.status(404).json({
        status: "ERROR",
        message: userResponse.message,
      });
    }
  } catch (error) {
    return response.status(500).json({
      status: "ERROR",
      message: error.message + " [Internal Server Error (at UserController)]",
    });
  }
};

module.exports = {
  createUser,
  getCurrentUser,
  getUserByEmail,
  getUserById,
};
