import React from 'react';

const FilterPanel = ({ locations, experiences, filters, onFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            id="location"
            className="w-full input"
            value={filters.location || ''}
            onChange={(e) => onFilterChange('location', e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
            Experience
          </label>
          <select
            id="experience"
            className="w-full input"
            value={filters.experience || ''}
            onChange={(e) => onFilterChange('experience', e.target.value)}
          >
            <option value="">All Experience Levels</option>
            {experiences.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
            Source
          </label>
          <select
            id="source"
            className="w-full input"
            value={filters.source || ''}
            onChange={(e) => onFilterChange('source', e.target.value)}
          >
            <option value="">All Sources</option>
            <option value="linkedin">LinkedIn</option>
            <option value="naukri">Naukri</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-1">
            Jobs per page
          </label>
          <select
            id="limit"
            className="w-full input"
            value={filters.limit || 10}
            onChange={(e) => onFilterChange('limit', e.target.value)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        
        <button
          className="w-full btn btn-secondary mt-4"
          onClick={() => {
            onFilterChange('title', '');
            onFilterChange('location', '');
            onFilterChange('experience', '');
            onFilterChange('source', '');
            onFilterChange('limit', 10);
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
