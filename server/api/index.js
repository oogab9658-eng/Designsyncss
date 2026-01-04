const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
