import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/comman/Footer';
import Navbar from '../components/comman/Navbar';

const ViewApplications = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAppId, setOpenAppId] = useState(null);

  const [statusFilter, setStatusFilter] = useState('All');
  const [sortByTime, setSortByTime] = useState('Newest');
  const [sortBySkills, setSortBySkills] = useState(false);

  const token = localStorage.getItem('token');
  const employerId = localStorage.getItem('userId');

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get(`/job/jobs/employer/${employerId}`);
        setJobs(res.data.jobs);
        setFilteredJobs(res.data.jobs);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch jobs.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const query = jobSearchQuery.toLowerCase();
    setFilteredJobs(
      jobs.filter((job) => job.jobName.toLowerCase().includes(query))
    );
  }, [jobSearchQuery, jobs]);

  const fetchApplications = async (jobId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/application/jobs/${jobId}/applications`);
      setApplications(res.data);
      setSelectedJobId(jobId);
      setOpenAppId(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch applications.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axiosInstance.patch(`/application/applications/${applicationId}/status`, {
        status: newStatus,
      });
      toast.success(`Status updated to ${newStatus}`);
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    }
  };

  useEffect(() => {
    let filtered = [...applications];

    if (statusFilter !== 'All') {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    if (sortByTime === 'Newest') {
      filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortByTime === 'Oldest') {
      filtered.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    filtered.sort(
      (a, b) =>
        (b.matchedSkills?.length || 0) - (a.matchedSkills?.length || 0)
    );

    setFilteredApps(filtered);
  }, [applications, statusFilter, sortByTime, sortBySkills]);

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="flex flex-col md:flex-row h-screen p-4 gap-4">
        {/* Left Sidebar: Job List */}
        <div className="w-full md:w-1/4 border-r overflow-y-auto h-full">
          <h2 className="text-xl font-bold mb-4">Your Jobs</h2>
          <input
            type="text"
            value={jobSearchQuery}
            onChange={(e) => setJobSearchQuery(e.target.value)}
            placeholder="Search jobs by title..."
            className="w-full border border-gray-300 px-4 py-2 rounded-full text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm mb-4 transition-all"
          />
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : filteredJobs.length === 0 ? (
            <p className="text-gray-500">No jobs found.</p>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                onClick={() => fetchApplications(job._id)}
                className={`cursor-pointer p-3 border-b rounded hover:bg-gray-100 transition ${selectedJobId === job._id ? 'bg-blue-100' : ''
                  }`}
              >
                <h3 className="font-medium">{job.jobName}</h3>
                <p className="text-sm text-gray-600">{job.companyName}</p>
              </div>
            ))
          )}
        </div>

        {/* Right Panel: Applications + Filters */}
        <div className="w-full md:w-3/4 overflow-y-auto h-full px-4">
          <h2 className="text-2xl font-bold mb-4">Applications</h2>

          {selectedJobId && (
            <div className="flex flex-wrap gap-3 mb-4 bg-white p-3 rounded-xl shadow-sm">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="min-w-[150px] border border-gray-300 px-4 py-2 rounded-full bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                value={sortByTime}
                onChange={(e) => setSortByTime(e.target.value)}
                className="min-w-[150px] border border-gray-300 px-4 py-2 rounded-full bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="Newest">Newest First</option>
                <option value="Oldest">Oldest First</option>
              </select>

              <button
                onClick={() => setSortBySkills(!sortBySkills)}
                className={`min-w-[150px] border border-gray-300 px-4 py-2 rounded-full text-sm shadow-sm transition-all ${sortBySkills
                  ? 'bg-blue-100 text-blue-700 border-blue-400'
                  : 'bg-white text-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {sortBySkills ? 'Skills: High → Low' : 'Sort by Skills'}
              </button>
            </div>
          )}

          {loading ? (
            <p className="text-gray-500">Loading applications...</p>
          ) : selectedJobId ? (
            filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <div
                  key={app._id}
                  className="bg-white border rounded shadow-sm p-4 mb-3"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setOpenAppId(openAppId === app._id ? null : app._id)}
                  >
                    <div>
                      <p className="font-semibold">
                        {app.applicant.firstName} {app.applicant.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{app.applicant.email}</p>
                    </div>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                      {app.status}
                    </span>
                  </div>

                  {openAppId === app._id && (
                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      <p>Contact: {app.applicant.contactNumber}</p>
                      <p>
                        Location: {app.applicant.city}, {app.applicant.state},{' '}
                        {app.applicant.country}
                      </p>
                      <p>Applied: {new Date(app.createdAt).toLocaleString()}</p>
                      <p>
                        Skills Matched: <strong>{app.matchedSkills?.length || 0}</strong>
                      </p>
                      {app.matchedSkills?.length > 0 && (
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {app.matchedSkills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      )}
                      <a
                        href={`${import.meta.env.VITE_BASE_IMAGE_URL}${app.resume.replace(/\\/g, '/')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Resume
                      </a>
                      <div className="mt-2">
                        <label
                          htmlFor={`status-${app._id}`}
                          className="block text-sm font-medium mb-1"
                        >
                          Change Status:
                        </label>
                        <select
                          id={`status-${app._id}`}
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(app._id, e.target.value)
                          }
                          className="border border-gray-300 rounded px-3 py-1"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No applications found for this filter.</p>
            )
          ) : (
            <p className="text-gray-500">Select a job to view applications.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ViewApplications;
