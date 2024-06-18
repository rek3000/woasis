const jwt = require('jsonwebtoken');
const OAuth2Service = require('../services/OAuth2Service');

const authMiddleware = (req, res, next) => {
  try {
    // Log cookies
    console.log("Cookies:", req.cookies);
    console.log("Decoded:", req.get)

    const token = req.cookies.token;
    if (!token) {
      console.error("Token not found in cookies");
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = OAuth2Service.verifyToken(token);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
