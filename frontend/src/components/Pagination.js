import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];
    
    // Always include first page
    pages.push(1);
    
    // Calculate range of pages to show around current page
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis if needed
    if (start > 2) {
      pages.push('...');
    }
    
    // Add pages in range
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if needed
    if (end < totalPages - 1) {
      pages.push('...');
    }
    
    // Always include last page if not already included
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-l border ${
            currentPage === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Previous
        </button>
        
        {getPageNumbers().map((page, index) => (
          <button
            key={`page-${index}`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`px-3 py-1 border-t border-b ${
              page === currentPage
                ? 'bg-primary-600 text-white'
                : page === '...'
                ? 'bg-gray-50 text-gray-600 cursor-default'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-r border ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;