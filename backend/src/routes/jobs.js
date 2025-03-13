// backend/src/routes/jobs.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Get all jobs with filters
router.get('/', jobController.getJobs);

// Get job by ID
router.get('/:id', jobController.getJobById);

// Trigger job scraping
router.post('/scrape', jobController.scrapeJobs);

// Get filter options
router.get('/filters/locations', jobController.getLocations);
router.get('/filters/experiences', jobController.getExperienceLevels);

module.exports = router;