// frontend/src/pages/AdminPage.js
import React, { useState } from 'react';
import { scrapeJobs } from '../services/api';

const AdminPage = () => {
  const [keyword, setKeyword] = useState('');
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!keyword.trim()) {
      setMessage('Please enter a keyword');
      setMessageType('error');
      return;
    }

    try {
      setIsLoading(true);
      setMessage('Job scraping started. This may take a few minutes...');
      setMessageType('info');
      
      await scrapeJobs(keyword, pages);
      
      setMessage(`Job scraping initiated successfully for keyword: ${keyword}`);
      setMessageType('success');
    } catch (error) {
      setMessage('Failed to initiate job scraping. Please try again.');
      setMessageType('error');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Scrape Jobs</h2>
          
          {message && (
            <div 
              className={`mb-4 px-4 py-3 rounded ${
                messageType === 'error' 
                  ? 'bg-red-100 text-red-700' 
                  : messageType === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
                Keyword
              </label>
              <input
                type="text"
                id="keyword"
                className="w-full input"
                placeholder="e.g. Product Manager, Software Engineer"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter the job title or keyword to search for
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Pages to Scrape
              </label>
              <input
                type="number"
                id="pages"
                className="w-full input"
                min="1"
                max="5"
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value))}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Higher values will take longer but fetch more jobs (max 5)
              </p>
            </div>
            
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Start Scraping'}
            </button>
          </form>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Auto-Refresh Configuration</h2>
          
          <div className="mb-4">
            <p className="text-gray-600">
              Jobs are automatically refreshed every 24 hours for the following keywords:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Software Engineer</li>
              <li>Product Manager</li>
              <li>Data Scientist</li>
            </ul>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>Last auto-refresh: {new Date().toLocaleString()}</p>
            <p>Next scheduled refresh: {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;