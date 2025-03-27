import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/Footer";
import { FaSearch, FaSort, FaTimes, FaBriefcase, FaMapMarkerAlt, FaTrash } from "react-icons/fa";

// Sample saved jobs
const defaultJobs = [
  {
    id: 11,
    title: "UI/UX Designer",
    company: "Adobe",
    location: "Remote",
    dateSaved: "2025-03-20",
    logo: "data:image/png;base64,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",
    description: "Exciting opportunity to design user-friendly interfaces for Adobe products.",
    color: "bg-purple-100 border-purple-500 text-purple-700",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "Microsoft",
    location: "Seattle",
    dateSaved: "2025-03-25",
    logo: "data:image/png;base64,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",
    description: "Work on cutting-edge AI and data analytics at Microsoft.",
    color: "bg-blue-100 border-blue-500 text-blue-700",
  },
  {
    id: 3,
    title: "Project Manager",
    company: "Meta",
    location: "Austin",
    dateSaved: "2025-03-27",
    logo: "data:image/png;base64,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",
    description: "Lead teams and deliver innovative projects at Meta.",
    color: "bg-green-100 border-green-500 text-green-700",
  },
  
];

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState(() => {
    const storedJobs = localStorage.getItem("savedJobs");
    return storedJobs ? JSON.parse(storedJobs) : defaultJobs;
  });

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  const removeJob = (id) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== id));
  };

  const filteredJobs = savedJobs
    .filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.dateSaved) - new Date(a.dateSaved)
        : new Date(a.dateSaved) - new Date(b.dateSaved)
    );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-8 mt-10">
        {/* Search & Sorting */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search saved jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <FaSort className="absolute left-3 top-3 text-gray-500" />
            <select
              className="pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ scale: 1.03 }}
                className={`p-6 rounded-lg shadow-lg border-l-4 transition-all cursor-pointer ${job.color} bg-opacity-75 backdrop-blur-lg`}
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-center space-x-4">
                  <img src={job.logo} alt={`${job.company} Logo`} className="w-12 h-12 object-contain rounded-md shadow-sm" />
                  <div>
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <p className="text-gray-600">{job.company}</p>
                    <span className="inline-block px-3 py-1 mt-2 text-sm font-semibold bg-gray-200 rounded-full">
                      <FaMapMarkerAlt className="inline mr-1" /> {job.location}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Apply Now
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeJob(job.id);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center"
                  >
                    <FaTrash className="mr-2" /> Remove
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Job Details Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <motion.div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
              <button className="absolute top-2 right-2 text-gray-600" onClick={() => setSelectedJob(null)}>
                <FaTimes className="text-2xl" />
              </button>
              <img src={selectedJob.logo} alt={`${selectedJob.company} Logo`} className="w-16 h-16 mx-auto mb-4 rounded-full shadow-md" />
              <h2 className="text-3xl font-bold">{selectedJob.title}</h2>
              <p className="text-gray-600">{selectedJob.company}</p>
              <p className="text-gray-500">Saved on: {selectedJob.dateSaved}</p>
              <p className="mt-4">{selectedJob.description}</p>
            </motion.div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

const EmptyState = () => (
  <div className="text-center mt-10">
    <p className="text-gray-500 text-lg">You have no saved jobs.</p>
  </div>
);

export default SavedJobs;
