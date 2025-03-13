// frontend/src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getJobs = async (filters = {}) => {
  try {
    const response = await api.get('/jobs', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const getJobById = async (jobId) => {
  try {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job with id ${jobId}:`, error);
    throw error;
  }
};

export const getLocations = async () => {
  try {
    const response = await api.get('/jobs/filters/locations');
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

export const getExperienceLevels = async () => {
  try {
    const response = await api.get('/jobs/filters/experiences');
    return response.data;
  } catch (error) {
    console.error('Error fetching experience levels:', error);
    throw error;
  }
};

export const scrapeJobs = async (keyword, pages = 1) => {
  try {
    const response = await api.post('/jobs/scrape', { keyword, pages });
    return response.data;
  } catch (error) {
    console.error('Error triggering job scraping:', error);
    throw error;
  }
};

export default api;