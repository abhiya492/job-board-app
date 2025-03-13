// backend/src/utils/cronJob.js
const cron = require('node-cron');
const { runJobScrapers } = require('../scrapers/jobScraper');

// Define default keywords to scrape
const DEFAULT_KEYWORDS = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist'
];

// Setup the cron job to run every 24 hours
const setupCronJob = () => {
  // Schedule job - runs at midnight every day (server time)
  cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled job scraping...');
    console.log('Time:', new Date().toISOString());
    
    try {
      // Scrape jobs for each default keyword
      for (const keyword of DEFAULT_KEYWORDS) {
        console.log(`Scraping jobs for keyword: ${keyword}`);
        
        try {
          const result = await runJobScrapers(keyword, 2);
          console.log(`Completed scraping for ${keyword}:`, result);
        } catch (error) {
          console.error(`Error scraping for keyword ${keyword}:`, error);
        }
        
        // Add a small delay between scraping to avoid overwhelming the sites
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
      
      console.log('Scheduled job scraping completed');
    } catch (error) {
      console.error('Error during scheduled job scraping:', error);
    }
  });
  
  console.log('Cron job for job scraping has been scheduled');
};

module.exports = {
  setupCronJob,
  DEFAULT_KEYWORDS
};