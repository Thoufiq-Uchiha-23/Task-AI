import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { apiLimiter } from './middleware/rateLimiter.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
const connectDB = async () => {
  // try {
  //   const conn = await mongoose.connect(process.env.MONGODB_URI);
  //   console.log(`MongoDB Connected: ${conn.connection.host}`);
  // } catch (error) {
  //   console.error(`Error: ${error.message}`);
  //   process.exit(1);
  // }
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not found in environment variables');
    process.exit(1);
  }
};

connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to all requests
app.use(apiLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;