const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Predefined users (in production, use database)
const users = [
  { id: 1, name: 'Admin', email: 'admin@admin.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Client User', email: 'client@client.com', password: 'client123', role: 'client' },
  { id: 3, name: 'Team User', email: 'team@team.com', password: 'team123', role: 'team' }
];

// @route   POST api/auth/register
router.post('/register', (req, res) => {
  res.status(400).json({ msg: 'Registration not allowed. Use predefined accounts.' });
});

// @route   POST api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

  const payload = { user: { id: user.id, role: user.role } };
  const jwtSecret = process.env.JWT_SECRET || 'fallbacksecret123';
  jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
    if (err) throw err;
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });
});

// @route   GET api/auth/user
router.get('/user', auth, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json(user);
});

module.exports = router;
