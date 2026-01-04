const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// In-memory tasks array (for demo, no persistence)
let tasks = [
  { _id: '1', title: 'Sample Task', description: 'This is a sample task', status: 'pending', dueDate: '2026-01-10', client: '1', assignedTo: 1, createdAt: new Date() }
];

// Get tasks
router.get('/', auth, (req, res) => {
  const userTasks = tasks.filter(task => task.assignedTo === req.user.id);
  res.json(userTasks);
});

// Add task
router.post('/', auth, (req, res) => {
  const { title, description, status, dueDate, client } = req.body;
  const newTask = {
    _id: Date.now().toString(),
    title, description, status, dueDate, client,
    assignedTo: req.user.id,
    createdAt: new Date()
  };
  tasks.push(newTask);
  res.json(newTask);
});

// Update task status
router.patch('/:id', auth, (req, res) => {
  const task = tasks.find(t => t._id === req.params.id && t.assignedTo === req.user.id);
  if (!task) return res.status(404).json({ msg: 'Task not found' });
  
  task.status = req.body.status || task.status;
  res.json(task);
});

module.exports = router;
