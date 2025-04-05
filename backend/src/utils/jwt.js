const jwt = require('jsonwebtoken');
const { Types } = require('mongoose');

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Generate token for user
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Verify token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
};
