import express from 'express';
import { verifyToken } from '../utils/jwt';

// Extend Express Request type to include user
// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         id: string;
//       };
//     }
//   }
// }

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Token not found
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }

    // Add user to request
    req.user = {
      id: decoded.id
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Not authorized' });
  }
};