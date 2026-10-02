const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // Sign the token with the user's MongoDB ID and the secret key
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

module.exports = generateToken;