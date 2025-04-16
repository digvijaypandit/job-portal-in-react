import React, { useRef } from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { BsHourglassSplit } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";
import { IoPeople } from "react-icons/io5";

const JobCard = ({ job, gradient }) => {
  return (
    <div
      className={`relative p-4 border-1 rounded-2xl min-w-[260px] h-60 bg-white text-gray-900 flex flex-col justify-between overflow-hidden group transition duration-300`}
    >
      <div className={`absolute top-0 left-0 w-full h-20 rounded-t-2xl z-0 ${gradient}`} />
      <div className="absolute top-3 right-3 bg-white p-1 rounded-lg z-10 transition-transform duration-300 group-hover:scale-110">
        <img src={job.logo} alt={job.company} className="w-10 h-10 object-contain" />
      </div>
      <div className="absolute top-3 left-3">
        <h3 className="text-md font-semibold transition-colors duration-300">
          {job.job_title}
        </h3>
      </div>
      <span className="absolute top-16 left-3 border-1 rounded-2xl bg-white text-gray-800 px-2 py-1 text-xs font-medium z-10">
        {job.location}
      </span>
      <div className="z-10 mt-20 px-1">
        <p className="text-sm text-gray-600">{job.company}</p>
      </div>
      <div className="flex items-center justify-between mt-auto px-1 text-sm text-gray-800 z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <IoPeople  />
            <span>{job.applied} Applied</span>
          </div>
          <div className="flex items-center gap-1">
            <BsHourglassSplit />
            <span>{job.time_left} left</span>
          </div>
        </div>
        <div className="text-gray-500 transition-transform duration-300 p-1 rounded-full group-hover:rotate-12 group-hover:bg-blue-600 group-hover:text-white">
          <FiArrowUpRight size={20}/>
        </div>
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

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -280, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 280, behavior: "smooth" });
  };

  return (
    <div>
      <h3 className="text-2xl font-medium">Recommendations</h3>
      <p className="text-gray-600">Latest jobs for you</p>

      <div className="relative flex items-center justify-center py-6">
        {/* Left Scroll */}
        <button
          onClick={scrollLeft}
          className="absolute -left-6 cursor-pointer z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-200 transition-all"
        >
          <IoIosArrowDropleft size={28} />
        </button>

        {/* Cards */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto space-x-4 px-6 h-auto scrollbar-hide scroll-smooth flex-nowrap"
          style={{ scrollbarWidth: "none" }}
        >
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <JobCard
                key={index}
                job={job}
                gradient={gradients[index % gradients.length]}
              />
            ))
          ) : (
            <p className="text-gray-500">No job recommendations available.</p>
          )}
        </div>

        {/* Right Scroll */}
        <button
          onClick={scrollRight}
          className="absolute -right-5 cursor-pointer z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-200 transition-all"
        >
          <IoIosArrowDropright size={28} />
        </button>
      </div>
    </div>
  );
};

export default JobRecommendations;
