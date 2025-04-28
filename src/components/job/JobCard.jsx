import React from "react";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

const JobCard = ({ job, selectedJobId, setSelectedJobId }) => {
  const isActive = selectedJobId === job.id;

  const categories = Array.isArray(job.categories) ? job.categories : [];
  const jobLogo = job.companyLogo || "default_logo_url.png"; // <-- fallback logo

  return (
    <div
      className={`relative bg-white p-4 max-w-md rounded-lg cursor-pointer shadow-md border border-gray-200 
      flex items-center gap-4 transition-all duration-200 ${isActive ? "shadow-lg border-blue-500" : ""}`}
      onClick={() => setSelectedJobId(job.id)}
    >
      {/* Left Indicator Bar (Appears on Click) */}
      <div
        className={`absolute left-0 top-0 h-full w-[5px] rounded-l-2xl bg-blue-600 transition-all duration-200 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Left - Company Logo */}
      <div className="w-16 h-16 relative">
        <img
          src={jobLogo}
          alt={`${job.companyName || "Company"} Logo`}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Right - Job Info */}
      <div className="flex flex-col w-full">
        {/* Job Badge */}
        <span className="bg-gray-200 text-xs px-2 py-1 rounded w-fit mb-2">
          Job
        </span>

        {/* Job Title & Company Name */}
        <p className="text-blue-600 font-semibold text-lg hover:underline cursor-pointer">
          {job.jobName || "Untitled Job"}
        </p>
        <p className="text-gray-600 text-sm">
          {job.companyName || "Unknown Company"}
        </p>

        {/* Application & Deadline */}
        <div className="flex items-center gap-4 text-gray-700 text-sm mt-1">
          <span className="flex items-center gap-1">
            <MdOutlinePeopleAlt />
            {job.applied ?? 0} Applied
          </span>
          <span className="flex items-center gap-1">
            <IoMdTime />
            {job.deadline || "No deadline"}
          </span>
        </div>

        {/* Category Tags */}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {categories.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full border border-gray-300 text-sm text-gray-600"
            >
              {category}
            </span>
          ))}
          {categories.length > 2 && (
            <span className="px-3 py-1 rounded-full border border-gray-300 text-sm text-gray-600">
              +{categories.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
  