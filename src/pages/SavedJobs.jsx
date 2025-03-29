import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/Footer";
import { FaSearch, FaSort, FaTimes, FaBriefcase, FaMapMarkerAlt, FaTrash } from "react-icons/fa";

const API_URL = "https://your-api.com/saved-jobs"; // Replace with actual API endpoint

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch saved jobs from API
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const jobs = await response.json();
        setSavedJobs(jobs);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };
    fetchSavedJobs();
  }, []);

  // API call to remove a job
  const removeJob = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove job");

      // Update state after successful deletion
      setSavedJobs(savedJobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error removing job:", error);
    }
  };

  // Filter and sort jobs
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
