import React from 'react';
import { Link } from 'react-router-dom';

const JobList = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700">No jobs found</h3>
        <p className="text-gray-500">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Link
          to={`/jobs/${job._id}`}
          key={job._id}
          className="block"
        >
          <div className="card hover:border-primary-500 border-2 border-transparent cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
            <div className="flex flex-wrap gap-2 text-gray-600 mb-3">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                {job.company}
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {job.location}
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {job.experience}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(job.createdAt).toLocaleDateString()}
              </span>
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm capitalize">
                {job.source}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default JobList;