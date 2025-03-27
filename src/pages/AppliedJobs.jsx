import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/comman/Navbar';
import Footer from '../components/comman/footer';
import { FaSearch, FaFilter, FaSort, FaTimes } from 'react-icons/fa';

// Sample data with company logos
const appliedJobs = [
  { 
    id: 1, title: 'Frontend Developer', company: 'Tech Solutions Inc.', 
    appliedDate: '2025-03-15', status: 'Under Review', 
    logo: 'https://yt3.googleusercontent.com/FJI5Lzbf2dMd32xOqhoKpJArJooZhoX6v2qOcFO-wjSZUvs3H9xqq2gK4DQ47X0KnYgf7X2rpdU=s900-c-k-c0x00ffffff-no-rj', 
    description: 'You applied for the Frontend Developer role. The application is currently under review by the hiring team.' 
  },
  { 
    id: 2, title: 'UI/UX Designer', company: 'Creative Designs Ltd.', 
    appliedDate: '2025-03-18', status: 'Interview Scheduled', 
    logo: 'https://yt3.googleusercontent.com/FJI5Lzbf2dMd32xOqhoKpJArJooZhoX6v2qOcFO-wjSZUvs3H9xqq2gK4DQ47X0KnYgf7X2rpdU=s900-c-k-c0x00ffffff-no-rj', 
    description: 'Your interview is scheduled for 2025-03-25 at 2:00 PM.' 
  },
  { 
    id: 3, title: 'Backend Engineer', company: 'Data Systems Corp.', 
    appliedDate: '2025-03-20', status: 'Application Submitted', 
    logo: 'https://yt3.googleusercontent.com/FJI5Lzbf2dMd32xOqhoKpJArJooZhoX6v2qOcFO-wjSZUvs3H9xqq2gK4DQ47X0KnYgf7X2rpdU=s900-c-k-c0x00ffffff-no-rj', 
    description: 'Your application has been successfully submitted. Waiting for review.' 
  },
  { 
    id: 4, title: 'Full Stack Developer', company: 'Innovative Labs', 
    appliedDate: '2025-03-22', status: 'Offer Received', 
    logo: 'https://yt3.googleusercontent.com/FJI5Lzbf2dMd32xOqhoKpJArJooZhoX6v2qOcFO-wjSZUvs3H9xqq2gK4DQ47X0KnYgf7X2rpdU=s900-c-k-c0x00ffffff-no-rj', 
    description: 'Congratulations! You have received a job offer. Check your email for details.' 
  },
];

const statusColors = {
  'Under Review': 'bg-yellow-100 text-yellow-700 border-yellow-500',
  'Interview Scheduled': 'bg-blue-100 text-blue-700 border-blue-500',
  'Application Submitted': 'bg-gray-100 text-gray-700 border-gray-500',
  'Offer Received': 'bg-green-100 text-green-700 border-green-500',
};

const AppliedJobs = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedJob, setSelectedJob] = useState(null);

  // Filter and sort jobs
  const filteredJobs = appliedJobs
    .filter(job =>
      (job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter ? job.status === statusFilter : true)
    )
    .sort((a, b) => (sortOrder === 'newest' ? new Date(b.appliedDate) - new Date(a.appliedDate) : new Date(a.appliedDate) - new Date(b.appliedDate)));

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-8 mt-10">
        {/* Search & Filters */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          {/* Search Bar */}
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

          {/* Filter Dropdown */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-3 text-gray-500" />
            <select
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              {Object.keys(statusColors).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
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
              className={`p-6 rounded-lg shadow-lg border-l-4 transition-all cursor-pointer ${statusColors[job.status]}`}
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
              <span className={`inline-block px-3 py-1 mt-3 text-sm font-semibold rounded-full`}>
                {job.status}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Job Details Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <motion.div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
              <button className="absolute top-2 right-2 text-gray-600" onClick={() => setSelectedJob(null)}>
                <FaTimes className="text-2xl" />
              </button>
              <img src={selectedJob.logo} alt={`${selectedJob.company} Logo`} className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold">{selectedJob.title}</h2>
              <p className="text-gray-600">{selectedJob.company}</p>
              <p className="text-gray-500">Applied on: {selectedJob.appliedDate}</p>
              <p className="mt-4">{selectedJob.description}</p>
            </motion.div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AppliedJobs;
