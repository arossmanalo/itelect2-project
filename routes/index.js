import express from 'express';
import { tasks } from '../src/utils.js';
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

export default router;