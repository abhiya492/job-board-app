// backend/src/controllers/jobController.js
const Job = require('../models/Job');
const { runJobScrapers } = require('../scrapers/jobScraper');

// Get all jobs with filtering options
exports.getJobs = async (req, res) => {
  try {
    const { 
      title, 
      company, 
      location, 
      experience, 
      page = 1, 
      limit = 10,
      source
    } = req.query;
    
    // Build query object based on filters
    const query = {};
    
    if (title) query.title = { $regex: title, $options: 'i' };
    if (company) query.company = { $regex: company, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (experience) query.experience = { $regex: experience, $options: 'i' };
    if (source) query.source = source;
    
    // Execute query with pagination
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    // Get total documents count
    const count = await Job.countDocuments(query);
    
    res.status(200).json({
      jobs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalJobs: count
    });
  } catch (error) {
    console.error('Error getting jobs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(200).json(job);
  } catch (error) {
    console.error('Error getting job by ID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Trigger job scraping
exports.scrapeJobs = async (req, res) => {
  try {
    const { keyword, pages = 1 } = req.body;
    
    if (!keyword) {
      return res.status(400).json({ message: 'Keyword is required' });
    }
    
    // Start scraping (non-blocking)
    res.status(202).json({ 
      message: 'Job scraping started', 
      keyword,
      pages
    });
    
    // Continue with scraping after sending response
    try {
      const result = await runJobScrapers(keyword, parseInt(pages));
      console.log('Scraping completed:', result);
    } catch (error) {
      console.error('Error during scraping:', error);
    }
    
  } catch (error) {
    console.error('Error triggering job scraping:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get available locations for filtering
exports.getLocations = async (req, res) => {
  try {
    const locations = await Job.distinct('location');
    res.status(200).json(locations);
  } catch (error) {
    console.error('Error getting locations:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get available experience levels for filtering
exports.getExperienceLevels = async (req, res) => {
  try {
    const experiences = await Job.distinct('experience');
    res.status(200).json(experiences);
  } catch (error) {
    console.error('Error getting experience levels:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};