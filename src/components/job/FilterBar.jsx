
const FilterBar = ({ searchQuery, onSearchChange, setFilters }) => {
  const handleFilterChange = (e, filterType) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: e.target.value,
    }));
  };

  return (
    <div className="w-full space-y-4">
      {/* Main Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 shadow-lg rounded-xl">
        {/* Search Box */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search jobs by title or keyword..."
            className="w-full border border-gray-300 px-4 py-2 rounded-full text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
        </div>

        {/* Dropdown Filters */}
        {[{
          value: "", // Add dynamic value from filters
          onChange: (e) => handleFilterChange(e, "location"),
          options: ["New York", "San Francisco", "Los Angeles", "Chicago", "Remote"],
          label: "Location"
        }, {
          value: "",
          onChange: (e) => handleFilterChange(e, "workType"),
          options: ["Office", "Remote", "Hybrid"],
          label: "Work Type"
        }, {
          value: "",
          onChange: (e) => handleFilterChange(e, "category"),
          options: ["Software Development", "Marketing", "Design", "Product Management", "Sales"],
          label: "Category"
        }, {
          value: "",
          onChange: (e) => handleFilterChange(e, "salary"),
          options: ["Low to High", "High to Low"],
          label: "Salary"
        }, {
          value: "",
          onChange: (e) => handleFilterChange(e, "postDate"),
          options: ["24 Hours", "Past Week", "Past Month"],
          label: "Post Date"
        }].map(({ value, onChange, options, label }, idx) => (
          <div key={idx} className="relative min-w-[150px]">
            <select
              value={value}
              onChange={onChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-full text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">{label}</option>
              {options.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
