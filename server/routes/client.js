const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// In-memory clients array (for demo, no persistence)
let clients = [
  { _id: '1', name: 'Sample Client', email: 'client@example.com', phone: '123-456-7890', company: 'Sample Co', status: 'active', createdBy: 1, createdAt: new Date() }
];

// Get all clients
router.get('/', auth, (req, res) => {
  const userClients = clients.filter(client => client.createdBy === req.user.id);
  res.json(userClients);
});

// Add client
router.post('/', auth, (req, res) => {
  const { name, email, phone, company, status } = req.body;
  const newClient = {
    _id: Date.now().toString(),
    name, email, phone, company, status,
    createdBy: req.user.id,
    createdAt: new Date()
  };
  clients.push(newClient);
  res.json(newClient);
});

// Delete client
router.delete('/:id', auth, (req, res) => {
  const index = clients.findIndex(client => client._id === req.params.id && client.createdBy === req.user.id);
  if (index === -1) return res.status(404).json({ msg: 'Client not found' });
  
  clients.splice(index, 1);
  res.json({ msg: 'Client removed' });
});

module.exports = router;
