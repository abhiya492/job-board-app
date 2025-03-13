// frontend/src/pages/HomePage.js
import React, { useState, useEffect, useCallback } from 'react';
import { getJobs, getLocations, getExperienceLevels } from '../services/api';
import JobList from '../components/JobList';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    experience: '',
    limit: 10
  });

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [locationsData, experienceData] = await Promise.all([
          getLocations(),
          getExperienceLevels()
        ]);
        
        setLocations(locationsData);
        setExperiences(experienceData);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };
    
    fetchFilterOptions();
  }, []);

  // Fetch jobs based on filters and pagination
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getJobs({
        ...filters,
        page: currentPage
      });
      
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
      setTotalJobs(data.totalJobs);
      setError(null);
    } catch (error) {
      setError('Failed to fetch jobs. Please try again later.');
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Handle search and filter changes
  const handleSearchChange = (searchTerm) => {
    setFilters(prev => ({ ...prev, title: searchTerm }));
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Your Dream Job</h1>
        <p className="text-gray-600">Browse through thousands of job opportunities</p>
      </div>
      
      <div className="mb-6">
        <SearchBar onSearch={handleSearchChange} initialValue={filters.title} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <FilterPanel 
            locations={locations}
            experiences={experiences}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
        
        <div className="md:col-span-3">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {loading ? (
            <LoadingSpinner />
          ) : jobs.length > 0 ? (
            <>
              <div className="mb-4 text-gray-600">
                Found {totalJobs} jobs matching your criteria
              </div>
              <JobList jobs={jobs} />
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;