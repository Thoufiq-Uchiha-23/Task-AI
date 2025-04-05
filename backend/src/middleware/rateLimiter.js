import rateLimit from 'express-rate-limit';

const createLimiter = (options) => rateLimit({
  standardHeaders: true,
  legacyHeaders: false,
  ...options
});

// General API rate limiter
export const apiLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { 
    status: 429,
    message: 'Too many requests, please try again later' 
  },
  keyGenerator: (req) => req.headers['x-forwarded-for'] || req.ip,
  skip: (req) => req.path === '/health'
});

// Stricter rate limiter for auth endpoints
export const authLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { 
    status: 429,
    message: 'Too many login attempts, please try again later' 
  }
});

// AI API specific rate limiter
export const aiLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  message: { 
    status: 429,
    message: 'AI request limit reached, please try again later' 
  }
});