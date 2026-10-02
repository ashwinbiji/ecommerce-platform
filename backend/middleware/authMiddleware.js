const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token (Header format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in the DB and attach it to the request object (excluding the password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move on to the actual route handler
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// We'll also need this later for admin-only routes (like adding products)
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

module.exports = { protect, admin };