import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdOutlineMouse } from "react-icons/md";

const FilterBar = () => {
  const [filterCount, setFilterCount] = useState(6); 
  const [userTypeCount, setUserTypeCount] = useState(1);
  const [domainCount, setDomainCount] = useState(1);

  return (
    <div className="flex items-center gap-3 bg-white p-3 shadow-sm rounded-lg z-50">
      {/* Jobs Button */}
      <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-2 rounded-full font-medium">
        Jobs
      </button>

      {/* Sort by Salary */}
      <button className="border border-gray-300 px-4 py-2 rounded-full flex items-center gap-2 text-gray-600">
        Salary (High to Low)
      </button>

      {/* Filters Button */}
      <button className="border border-gray-300 px-4 py-2 rounded-full flex items-center gap-2 text-gray-600 relative">
        <FaFilter />
        Filters
        {filterCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {filterCount}
          </span>
        )}
      </button>

      {/* Dropdown Filters */}
      {["Location", "Work Type", "Category"].map((filter, index) => (
        <button
          key={index}
          className="border border-gray-300 px-4 py-2 rounded-full flex items-center gap-2 text-gray-600"
        >
          {filter} <IoChevronDownOutline />
        </button>
      ))}

      {/* Filters with Count */}
      {[
        { label: "User Type", count: userTypeCount },
        { label: "Domain", count: domainCount },
      ].map((item, index) => (
        <button
          key={index}
          className="border border-gray-300 px-4 py-2 rounded-full flex items-center gap-2 text-gray-600 relative"
        >
          {item.label} <IoChevronDownOutline />
          {item.count > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {item.count}
            </span>
          )}
        </button>
      ))}

      {/* Quick Apply Button */}
      <button className="flex items-center gap-2 border border-green-500 text-green-500 px-4 py-2 rounded-full font-medium">
        <MdOutlineMouse />
        Quick Apply
      </button>
    </div>
  );
};

export default FilterBar;
