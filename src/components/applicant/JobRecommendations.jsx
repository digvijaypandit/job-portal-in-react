import React, { useRef } from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";

const JobCard = ({ job, gradient }) => {
  return (
    <div
      className={`relative p-5 rounded-2xl shadow-lg min-w-[260px] h-60 text-gray-900 overflow-hidden flex flex-col justify-between ${gradient}`}
    >
      {/* In Office Badge */}
      <span className="absolute bottom-10 left-3 bg-white text-gray-800 px-2 py-1 text-xs font-medium rounded-md shadow">
        {job.location}
      </span>

      {/* Company Logo */}
      <div className="absolute top-3 right-3 bg-white p-2 rounded-lg shadow-md">
        <img src={job.logo} alt={job.company} className="w-10 h-10" />
      </div>

      {/* Job Details */}
      <h3 className="text-lg font-bold">{job.job_title}</h3>
      <p className="text-sm">{job.company}</p>

      {/* Applied & Time Left */}
      <div className="flex justify-between text-sm mt-3 text-gray-800">
        <p>{job.applied} Applied</p>
        <p>{job.time_left}</p>
      </div>
      </div>
  );
};

const JobRecommendations = ({ jobs = [] }) => {
  const containerRef = useRef(null);
  const gradients = [
    "bg-gradient-to-r from-green-400 to-green-600",
    "bg-gradient-to-r from-yellow-400 to-orange-500",
    "bg-gradient-to-r from-blue-400 to-blue-600",
    "bg-gradient-to-r from-red-400 to-pink-500",
    "bg-gradient-to-r from-purple-400 to-indigo-600",
    "bg-gradient-to-r from-cyan-400 to-teal-500",
  ];

  // Scroll Functions
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex items-center justify-center py-6">
      {/* Left Scroll Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-200 transition-all"
      >
        <IoIosArrowDropleft size={28} />
      </button>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto space-x-4 px-6 h-auto scrollbar-hide scroll-smooth flex-nowrap"
        style={{ scrollbarWidth: "none" }}
      >
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <JobCard key={index} job={job} gradient={gradients[index % gradients.length]} />
          ))
        ) : (
          <p className="text-gray-500">No job recommendations available.</p>
        )}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-200 transition-all"
      >
        <IoIosArrowDropright size={28} />
      </button>
    </div>
  );
};

export default JobRecommendations;
