import React from 'react';

const JobSearchBox = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="relative w-[80%]">
        <input
          type="text"
          placeholder="Search for jobs..."
          className="w-full p-4 pr-14 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md">
          Search
        </button>
      </div>
    </div>
  );
};

export default JobSearchBox;
