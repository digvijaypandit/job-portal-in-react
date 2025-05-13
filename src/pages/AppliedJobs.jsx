import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/comman/Navbar';
import Footer from '../components/comman/footer';
import { FaSearch, FaFilter, FaSort, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const statusColors = {
  'Under Review': 'bg-yellow-100 text-yellow-700 border-yellow-500',
  'Interview Scheduled': 'bg-blue-100 text-blue-700 border-blue-500',
  'Application Submitted': 'bg-gray-100 text-gray-700 border-gray-500',
  'Offer Received': 'bg-green-100 text-green-700 border-green-500',
  'Accepted': 'bg-green-100 text-green-700 border-green-500',
  'Rejected': 'bg-red-100 text-red-700 border-red-500',
};

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedJob, setSelectedJob] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/application/user/applied', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formattedJobs = res.data
          .filter(item => item.job)
          .map((item) => ({
            id: item.job._id,
            title: item.job.jobName,
            company: item.job.companyName,
            logo: `http://localhost:5000${item.job.companyLogo}`,
            appliedDate: item.applicationDate.split('T')[0],
            status: item.status,
            description: `You applied for the ${item.job.jobName} role at ${item.job.companyName}. Status: ${item.status}.`,
          }));

        setJobs(formattedJobs);
      } catch (error) {
        console.error('Failed to fetch jobs', error);
        toast.error('Failed to fetch jobs');
      }
    };

    fetchJobs();
  }, [token]);

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/api/application/jobs/${jobId}/apply`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs(jobs.filter(job => job.id !== jobId));
      toast.success('Application withdrawn successfully.');
    } catch (error) {
      console.error('Failed to withdraw application', error);
      toast.error('Error withdrawing application.');
    }
  };

  const filteredJobs = jobs
    .filter(job => {
      return (
        (job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase())) &&
        (statusFilter ? job.status === statusFilter : true)
      );
    })
    .sort((a, b) =>
      sortOrder === 'newest'
        ? new Date(b.appliedDate) - new Date(a.appliedDate)
        : new Date(a.appliedDate) - new Date(b.appliedDate)
    );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-8 mt-10">
        {/* Search & Filters */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <FaFilter className="absolute left-3 top-3 text-gray-500" />
            <select
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              {[...new Set(jobs.map((j) => j.status))].map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
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
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ scale: 1.03 }}
              className={`p-6 rounded-lg shadow-lg border-l-4 transition-all cursor-pointer ${statusColors[job.status] || 'bg-gray-100 text-gray-700 border-gray-500'}`}
              onClick={() => setSelectedJob(job)}
            >
              <div className="flex items-center space-x-4">
                <img src={job.logo} alt={`${job.company} Logo`} className="w-12 h-12 object-contain" />
                <div>
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-gray-500 text-sm">Applied on: {job.appliedDate}</p>
                </div>
              </div>
              <span className="inline-block px-3 py-1 mt-3 text-sm font-semibold rounded-full">
                {job.status}
              </span>

              {job.status && job.status.toLowerCase() === 'under review' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteJob(job.id);
                  }}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Withdraw Application
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4" onClick={() => setSelectedJob(null)}>
            <motion.div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative" onClick={(e) => e.stopPropagation()}>
              <button className="absolute top-2 right-2 text-gray-600 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setSelectedJob(null)}>
                <FaTimes className="text-2xl cursor-pointer" />
              </button>
              <img src={selectedJob.logo} alt={`${selectedJob.company} Logo`} className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold">{selectedJob.title}</h2>
              <p className="text-gray-600">{selectedJob.company}</p>
              <p className="text-gray-500">Applied on: {selectedJob.appliedDate}</p>
              <p className="mt-4">{selectedJob.description}</p>
              {selectedJob.status?.trim().toLowerCase() === 'pending' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteJob(selectedJob.id);
                  }}
                  className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Withdraw Application
                </button>
              )}
            </motion.div>
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AppliedJobs;
