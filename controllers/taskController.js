import db from '../models/index.cjs';

const { Task, User } = db;

export async function listTasks(req, res) {
  const allTasks = await Task.findAll({
    include: {
      model: User,
      attributes: ['name'],
    },
    order: [['id', 'ASC']],
  });

  res.json(allTasks);
}

export async function getTask(req, res) {
  const task = await Task.findByPk(req.params.id, {
    include: {
      model: User,
      attributes: ['name'],
    },
  });

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
}

export async function createTask(req, res) {
  const task = await Task.create(req.body);
  res.status(201).json(task);
}

export async function updateTask(req, res) {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  await task.update(req.body);
  res.json(task);
}

export async function deleteTask(req, res) {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  await task.destroy();
  res.json({ message: 'Deleted', task });
}