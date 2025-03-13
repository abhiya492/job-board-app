// backend/src/scrapers/jobScraper.js
const axios = require('axios');
const cheerio = require('cheerio');
const Job = require('../models/Job');

// Function to scrape LinkedIn jobs
const scrapeLinkedInJobs = async (keyword, pages = 1) => {
  console.log(`Starting to scrape LinkedIn jobs for: ${keyword}`);
  const jobs = [];
  
  try {
    for (let page = 1; page <= pages; page++) {
      // LinkedIn search URL (note: this might need adjustment as LinkedIn updates their site)
      const url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keyword)}&start=${(page-1)*25}`;
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      const $ = cheerio.load(response.data);
      
      // Find job listings
      $('.job-search-card').each((i, element) => {
        const title = $(element).find('.base-search-card__title').text().trim();
        const company = $(element).find('.base-search-card__subtitle').text().trim();
        const location = $(element).find('.job-search-card__location').text().trim();
        
        // Extract link
        const link = $(element).find('.base-card__full-link').attr('href') || '';
        
        // Experience is often not directly available on the search page
        const experience = "Not specified"; 
        
        // Only add valid jobs
        if (title && company) {
          jobs.push({
            title,
            company,
            location,
            experience,
            applicationLink: link,
            source: 'linkedin'
          });
        }
      });
      
      console.log(`Scraped page ${page} - Found ${jobs.length} jobs so far`);
    }
    
    return jobs;
  } catch (error) {
    console.error('Error scraping LinkedIn jobs:', error);
    return [];
  }
};

// Function to scrape Naukri.com jobs
const scrapeNaukriJobs = async (keyword, pages = 1) => {
  console.log(`Starting to scrape Naukri jobs for: ${keyword}`);
  const jobs = [];
  
  try {
    for (let page = 1; page <= pages; page++) {
      const url = `https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=${encodeURIComponent(keyword)}&pageNo=${page}`;
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'appid': '109',
          'systemid': '109'
        }
      });
      
      // Naukri uses an API so the response is JSON
      const jobListings = response.data.jobDetails || [];
      
      jobListings.forEach(job => {
        jobs.push({
          title: job.title || 'Not specified',
          company: job.companyName || 'Not specified',
          location: job.placeholders?.find(p => p.type === 'location')?.label || 'Not specified',
          experience: job.placeholders?.find(p => p.type === 'experience')?.label || 'Not specified',
          applicationLink: job.jdURL || '',
          description: job.jobDescription || '',
          source: 'naukri'
        });
      });
      
      console.log(`Scraped page ${page} - Found ${jobs.length} jobs so far`);
    }
    
    return jobs;
  } catch (error) {
    console.error('Error scraping Naukri jobs:', error);
    return [];
  }
};

// Function to save jobs to database
const saveJobsToDatabase = async (jobs) => {
  let savedCount = 0;
  let duplicateCount = 0;
  
  for (const job of jobs) {
    try {
      await Job.create(job);
      savedCount++;
    } catch (error) {
      // If error is a duplicate key error, increment duplicate count
      if (error.code === 11000) {
        duplicateCount++;
      } else {
        console.error('Error saving job:', error);
      }
    }
  }
  
  return { savedCount, duplicateCount };
};

// Main function to run the scrapers
const runJobScrapers = async (keyword, pages = 1) => {
  try {
    // Run both scrapers in parallel
    const [linkedInJobs, naukriJobs] = await Promise.all([
      scrapeLinkedInJobs(keyword, pages),
      scrapeNaukriJobs(keyword, pages)
    ]);
    
    const allJobs = [...linkedInJobs, ...naukriJobs];
    
    console.log(`Total jobs scraped: ${allJobs.length}`);
    
    // Save to database
    const result = await saveJobsToDatabase(allJobs);
    
    console.log(`Jobs saved: ${result.savedCount}, Duplicates: ${result.duplicateCount}`);
    
    return { total: allJobs.length, ...result };
  } catch (error) {
    console.error('Error running job scrapers:', error);
    throw error;
  }
};

module.exports = {
  scrapeLinkedInJobs,
  scrapeNaukriJobs,
  runJobScrapers
};