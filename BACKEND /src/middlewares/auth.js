// middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const {refreshUser} = require('../controllers/userController')
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies['accessToken']) {
    try {
      // Get token from cookies
      token = req.cookies['accessToken'];
      if (!token) {
        await refreshUser(req, res);
      } else {
      // Decodes token id
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

      // Attaches user information to the request object
      req.user = await User.findById(decoded.id).select('-password');
      next();
      }
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});


module.exports = { protect };
