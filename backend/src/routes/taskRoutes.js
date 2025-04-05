import express from 'express';
import { 
  getTasks, 
  getTaskById, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/taskController';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All task routes require authentication
router.use(protect);

// Task routes
router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

export default router;