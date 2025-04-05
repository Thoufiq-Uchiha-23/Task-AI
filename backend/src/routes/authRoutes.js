import express from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { protect } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Apply stricter rate limiting to auth routes
router.use(authLimiter);

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

export default router;