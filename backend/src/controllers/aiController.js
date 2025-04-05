import { Request, Response } from 'express';
import Task from '../models/Task';
import { generateTaskRecommendations } from '../services/openai';

// Get AI-generated task recommendations
export const getTaskRecommendations = async (req, res) => {
  try {
    const userId = req.user?.id;
    const count = parseInt(req.query.count) || 3;
    
    // Limit count to reasonable range
    const safeCount = Math.min(Math.max(count, 1), 5);
    
    // Get user's existing tasks
    const existingTasks = await Task.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('title description status priority');
    
    // Generate recommendations
    const recommendations = await generateTaskRecommendations(existingTasks, safeCount);
    
    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ message: 'Failed to generate recommendations' });
  }
};

// Create a recommended task
export const createRecommendedTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    
    const task = new Task({
      title,
      description,
      priority,
      status: 'pending',
      userId: req.user?.id
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating recommended task:', error);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};