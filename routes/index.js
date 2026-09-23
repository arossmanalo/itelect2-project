import express from 'express';
import db from '../models/index.cjs';
import verifyToken from '../middleware/verifyToken.js';
import requireRole from '../middleware/requireRole.js';
const { Task, User } = db;
const router = express.Router();

router.get('/tasks', async (req, res) => {
     const allTasks = await Task.findAll({ include: User, order: [['id', 'ASC']] });
     res.json(allTasks);
});

router.get('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id, { include: User });

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
});

router.get('/users', async (req, res) => {
    const users = await User.findAll({ order: [['id', 'ASC']] });
    res.json(users);
});


router.post('/tasks', verifyToken, async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

router.put('/tasks/:id', verifyToken, async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  await task.update(req.body);
  res.json(task);
});

router.delete(
  '/tasks/:id',
  verifyToken,
  requireRole('admin'),
  async (req, res) => {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Deleted', task });
  }
);
export default router;