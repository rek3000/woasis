const User = require("../models/User");

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return {
      status: "OK",
      message: "SUCCESS",
      data: user,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error.message || "Internal Server Error",
    };
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        status: "ERROR",
        message: "User not found",
      };
    }
    return {
      status: "OK",
      message: "SUCCESS",
      data: user,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error.message || "Internal Server Error",
    };
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
