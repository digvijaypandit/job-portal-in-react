import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../store/searchSlice';

const JobSearchBox = () => {
  const [localQuery, setLocalQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (localQuery.trim()) {
      dispatch(setSearchQuery(localQuery));
      navigate('/applicant/jobs');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section className="flex mt-10">
      <div className="relative w-full max-w-3xl">
        <label htmlFor="job-search" className="sr-only">Search for jobs</label>
        <input
          id="job-search"
          type="text"
          placeholder="Search for jobs by title, company, or keyword..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
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
