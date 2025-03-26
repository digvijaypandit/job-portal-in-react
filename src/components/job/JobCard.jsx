import React from "react";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

const JobCard = ({ job, selectedJobId, setSelectedJobId }) => {
  const isActive = selectedJobId === job.id;

  return (
    <div
      className={`relative bg-white p-4 max-w-md w-sm rounded-lg cursor-pointer shadow-md border border-gray-200 
      flex items-center gap-4 transition-all duration-300 ${isActive ? "shadow-lg" : ""
        }`}
      onClick={() => setSelectedJobId(job.id)}
    >
      {/* Left Indicator Bar (Appears on Click) */}
      <div
        className={`absolute left-0 top-0 h-full w-[5px] rounded-l-2xl bg-blue-600 hover:bg-blue-500 transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0"
          }`}
      ></div>
      {/* Left - Company Logo */}
      <div className="w-20 h-16 relative left-0 -top-10">
        <img
          src={job.logo}
          alt={`${job.company} Logo`}
          className="w-full h-full z-50 object-cover rounded-md"
        />
      </div>

      {/* Right - Job Info */}
      <div className="flex flex-col w-full">
        {/* Job Badge */}
        <span className="bg-gray-200 text-xs px-2 py-1 rounded w-fit">Job</span>

        {/* Job Title & Company Name */}
        <a href="#" className="text-blue-600 font-semibold text-xl hover:underline">
          {job.title}
        </a>
        <p className="text-gray-600 text-sm">{job.company}</p>

        {/* Application & Deadline */}
        <div className="flex items-center gap-4 text-gray-700 text-sm mt-1">
          <span className="flex items-center gap-1"><MdOutlinePeopleAlt />{job.applied} Applied</span>
          <span className="flex items-center gap-1"><IoMdTime />{job.deadline}</span>
        </div>

        {/* Category Tags */}
        <div className="flex items-center gap-2 mt-2">
          {job.categories.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full border border-gray-300 text-sm text-gray-600"
            >
              {category}
            </span>
          ))}

          {job.categories.length > 2 && (
            <span className="border-gray-300 text-sm text-gray-600">
              +{job.categories.length - 2}
            </span>
          )}

        </div>
      </div>
    </div>
  );
};

export default JobCard;
