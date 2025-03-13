// backend/src/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./routes/jobs');
const { setupCronJob } = require('./utils/cronJob');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobboard')
  .then(() => {
    console.log('MongoDB connected');
    
    // Setup cron job after successful DB connection
    if (process.env.NODE_ENV === 'production') {
      setupCronJob();
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/jobs', jobRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});