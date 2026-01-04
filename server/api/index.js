const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Connected Successfully");
    // Create default user if not exists
    const User = require('../models/User');
    const user = await User.findOne({ email: 'admin@admin.com' });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      const newUser = new User({ name: 'Admin', email: 'admin@admin.com', password: hashedPassword });
      await newUser.save();
      console.log('Default admin user created: admin@admin.com / admin123');
    }
  })
  .catch(err => console.error("MongoDB Connection Error:", err));

// Routes
app.use('/api/auth', require('../routes/auth'));
app.use('/api/clients', require('../routes/client'));
app.use('/api/tasks', require('../routes/task'));

// Root API test route
app.get('/api', (req, res) => {
  res.json({ 
    status: "active", 
    message: "Designsyncs API is running",
    version: "1.0.0"
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
