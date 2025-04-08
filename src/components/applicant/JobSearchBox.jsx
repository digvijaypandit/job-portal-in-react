import React, { useState } from 'react';

const JobSearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // You can replace this with actual search logic or navigation
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section className="flex mt-10">
      <div className="relative w-full max-w-3xl">
        <label htmlFor="job-search" className="sr-only">
          Search for jobs
        </label>
        <input
          id="job-search"
          type="text"
          aria-label="Search for jobs"
          placeholder="Search for jobs by title, company, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full p-4 pr-28 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
        <button
          onClick={handleSearch}
          className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md"
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default JobSearchBox;
