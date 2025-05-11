import React from 'react';

const FilterBar = ({ searchQuery, onSearchChange, setFilters, locations = [], workTypes = [], tags = [] }) => {
  const handleFilterChange = (e, filterType) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: e.target.value,
    }));
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center relative -top-4 gap-3 bg-white p-2 rounded-xl">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search jobs by title or keyword..."
            className="w-full border border-gray-300 px-4 py-2 rounded-full text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
        </div>

        {/* Location Filter */}
        <div className="relative min-w-[150px]">
          <select
            onChange={(e) => handleFilterChange(e, 'location')}
            className="w-full border border-gray-300 px-4 py-2 rounded-full bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">Location</option>
            {locations.map((loc, i) => (
              <option key={i} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Work Type Filter */}
        <div className="relative min-w-[150px]">
          <select
            onChange={(e) => handleFilterChange(e, 'workType')}
            className="w-full border border-gray-300 px-4 py-2 rounded-full bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">Work Type</option>
            {workTypes.map((type, i) => (
              <option key={i} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Tags Filter */}
        <div className="relative min-w-[150px]">
          <select
            onChange={(e) => handleFilterChange(e, 'tag')}
            className="w-full border border-gray-300 px-4 py-2 rounded-full bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">Tags</option>
            {tags.map((tag, i) => (
              <option key={i} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {/* Salary Sort */}
        <div className="relative min-w-[150px]">
          <select
            onChange={(e) => handleFilterChange(e, 'salary')}
            className="w-full border border-gray-300 px-4 py-2 rounded-full bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">Sort by Salary</option>
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
          </select>
        </div>

        {/* Post Date Filter */}
        <div className="relative min-w-[150px]">
          <select
            onChange={(e) => handleFilterChange(e, 'postDate')}
            className="w-full border border-gray-300 px-4 py-2 rounded-full bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">Posted Within</option>
            <option value="24 Hours">Last 24 Hours</option>
            <option value="Past Week">Past Week</option>
            <option value="Past Month">Past Month</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
