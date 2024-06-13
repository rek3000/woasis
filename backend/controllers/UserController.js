const UserService = require("../services/UserService");

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
  getUserByEmail,
};
