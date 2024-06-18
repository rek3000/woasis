  const axios = require("axios");
  const queryString = require("querystring");
  const jwt = require("jsonwebtoken");
  const UserService = require("./UserService");
  const dotenv = require("dotenv");

  dotenv.config();

  const config = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    redirectUrl: process.env.REDIRECT_URL,
    clientUrl: process.env.CLIENT_URL,
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: 36000,
  };

  const authParams = queryString.stringify({
    client_id: config.clientId,
    redirect_uri: config.redirectUrl,
    response_type: "code",
    scope: "openid profile email",
    access_type: "offline",
    state: "standard_oauth",
    prompt: "consent",
  });

  const getTokenParams = (code) =>
    queryString.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: config.redirectUrl,
    });

  const getAuthUrl = () => {
    return `${config.authUrl}?${authParams}`;
  };

  const getToken = async (code) => {
    const tokenParam = getTokenParams(code);
    const {
      data: { id_token },
    } = await axios.post(`${config.tokenUrl}?${tokenParam}`);
    return id_token;
  };

  const getUserFromToken = (id_token) => {
    return jwt.decode(id_token);
  };

  const createOrUpdateUser = async (userData) => {
    const { email, name, picture } = userData;

    let userResponse = await UserService.getUserByEmail(email);
    if (userResponse.status === "ERROR") {
      userResponse = await UserService.createUser({ name, email, picture });
    }

    return userResponse.data;
  };

  const createToken = (user) => {
    return jwt.sign({ user }, config.tokenSecret, {
      expiresIn: config.tokenExpiration,
    });
  };

  const verifyToken = (token) => {
    return jwt.verify(token, config.tokenSecret);
  };

  const getCurrentUser = async (request) => {
    try {
      const token = request.headers.authorization.split(" ")[1];
      const decodedToken = jwt.decode(verifyToken(token)); // decode
      const userId = decodedToken.user._id; 

      const userResponse = await UserService.getUserById(userId);
      if (userResponse.status === "ERROR") {
        throw new Error(userResponse.message);
      }

      return userResponse.data;
    } catch (error) {
      throw new Error("Invalid or missing token");
    }
  };

  const getCurrentUserId = async (request) => {
    console.log(request.query)
    try {
      // Retrieve the token from the cookies
      console.log("Cookies:", request.cookies);
      const token = request.cookies.token;
      if (!token) {
        throw new Error("Token not found in cookies");
      }
  
      // Verify and decode the token
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      if (!decodedToken) {
        throw new Error("Token verification failed");
      }
  
      // Extract user ID from the decoded token
      const userId = decodedToken.user._id;
      if (!userId) {
        throw new Error("User ID not found in token");
      }
  
      return userId;
    } catch (error) {
      console.error("Error in getCurrentUserId:", error.message);
      throw new Error("Invalid or missing token");
    }
  };

  module.exports = {
    getAuthUrl,
    getToken,
    getUserFromToken,
    createOrUpdateUser,
    createToken,
    verifyToken,
    getCurrentUser,
    getCurrentUserId,
  };
