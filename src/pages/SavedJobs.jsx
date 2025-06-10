import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/footer";
import { FaSearch, FaSort, FaTimes, FaTrash, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL =`${import.meta.env.VITE_BASE_URL}/savedJob`;

const SavedJobs = () => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedJob, setSelectedJob] = useState(null);
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_BASE_URL
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedJobs(response.data);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };
    fetchSavedJobs();
  }, [token]);

  const removeJob = async (jobId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/savedJob/remove",
        { jobId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSavedJobs(savedJobs.filter((job) => job.job._id !== jobId));
    } catch (error) {
      console.error("Error removing job:", error);
    }
  };


  const filteredJobs = savedJobs
    .filter((item) =>
      item.job?.jobName?.toLowerCase().includes(search.toLowerCase()) ||
      item.job?.companyName?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
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
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <FaSort className="absolute left-3 top-3 text-gray-500" />
            <select
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            filteredJobs.map((item) => {
              const job = item.job;
              return (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.03 }}
                  className="p-6 rounded-lg shadow-lg border-l-4 border-blue-500 bg-blue-50 transition-all cursor-pointer"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`http://localhost:5000/${job.companyLogo?.replace(/^\/+/, '')}`}
                      alt={`Logo of ${job.companyName}`}
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{job.jobName}</h2>
                      <p className="text-gray-600">{job.companyName}</p>
                      <p className="text-gray-500 text-sm">
                        Saved on: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                      {job.location && (
                        <p className="text-sm text-gray-500 mt-1">
                          <FaMapMarkerAlt className="inline mr-1" /> {job.location}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/applicant/jobs?jobId=${job._id}`);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeJob(job._id);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center cursor-pointer"
                    >
                      <FaTrash className="mr-2" /> Remove
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500 mt-10">
              You have no saved jobs.
            </div>
          )}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 cursor-pointer text-gray-600"
                  onClick={() => setSelectedJob(null)}
                >
                  <FaTimes className="text-2xl" />
                </button>
                <img
                  src={`http://localhost:5000${selectedJob.companyLogo}`}
                  alt={`Logo of ${selectedJob.companyName}`}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h2 className="text-3xl font-bold text-center">{selectedJob.jobName}</h2>
                <p className="text-gray-600 text-center">{selectedJob.companyName}</p>
                <p className="text-gray-500 text-center mb-2">{selectedJob.location}</p>
                <p className="mt-4">{selectedJob.jobDescription}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default SavedJobs;
