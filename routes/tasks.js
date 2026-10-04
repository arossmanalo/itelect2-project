import express from 'express';
import {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask,
} from '../controllers/taskController.js';
import verifyToken from '../middleware/verifyToken.js';
import requireRole from '../middleware/requireRole.js';

const router = express.Router();

router.get('/', listTasks);
router.get('/:id', getTask);
router.post('/', verifyToken, createTask);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, requireRole('admin'), deleteTask);

export default router;