import express from 'express';
import { 
  getTaskRecommendations, 
  createRecommendedTask 
} from '../controllers/aiController';
import { protect } from '../middleware/auth';
import { aiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// All AI routes require authentication
router.use(protect);

// Apply AI-specific rate limiting
router.use(aiLimiter);

// AI routes
router.get('/recommendations', getTaskRecommendations);
router.post('/recommendations', createRecommendedTask);

export default router;