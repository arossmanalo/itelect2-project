import express from 'express';
import { tasks, validateTask, mergeTaskUpdate } from '../src/utils.js';
import { fetchSampleUsers } from '../src/api.js';

const router = express.Router();

let cachedUsers = [];

fetchSampleUsers()
    .then(users => {
        cachedUsers = users;
        console.log('Users successfully fetched and cached.');
    })
    .catch(error => {
        console.error('Error fetching sample users:', error);
    });

router.get('/tasks', (req, res) => {
    res.json(tasks);
});

router.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

router.get('/users', (req, res) => {
    res.json(cachedUsers);
});

let nextId = 3;

router.post('/tasks', (req, res, next) => {
    if (!validateTask(req.body)) {
        const err = new Error("title and dueDate required");
        err.status = 400;
        return next(err);
    }
    const task = { id: nextId++, ...req.body, completed: false };
    tasks.push(task);
    res.status(201).json(task);
});

router.put('/tasks/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
        const err = new Error("Task not found");
        err.status = 404;
        return next(err);
    }

    tasks[index] = mergeTaskUpdate(tasks[index], req.body);
    res.status(200).json(tasks[index]);
});

router.delete('/tasks/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
        const err = new Error("Task not found");
        err.status = 404;
        return next(err);
    }

    const [removed] = tasks.splice(index, 1);
    res.status(200).json({ message: "Deleted", task: removed });
});

export default router;