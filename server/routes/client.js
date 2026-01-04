const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const auth = require('../middleware/auth');

// Get all clients
router.get('/', auth, async (req, res) => {
  try {
    const clients = await Client.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add client
router.post('/', auth, async (req, res) => {
  const { name, email, phone, company, status } = req.body;
  try {
    const newClient = new Client({
      name, email, phone, company, status,
      createdBy: req.user.id
    });
    const client = await newClient.save();
    res.json(client);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete client
router.delete('/:id', auth, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ msg: 'Client not found' });
    if (client.createdBy.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    
    await Client.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Client removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
