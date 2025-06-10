import { motion } from "framer-motion";
import { FaPlus, FaClipboardList, FaUsers } from "react-icons/fa";
import Footer from "../components/comman/footer";
import Navbar from "../components/comman/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const EmployerHome = () => {
  const navigate = useNavigate();

  const quickActions = [
    { label: "Post a Job", icon: <FaPlus />, color: "bg-green-600", path: "/employer/post-job" },
    { label: "Manage Jobs", icon: <FaClipboardList />, color: "bg-blue-600", path: "/employer/manage-jobs" },
    { label: "View Applications", icon: <FaUsers />, color: "bg-purple-600", path: "/employer/applications" }
  ];

  const [employerData, setEmployerData] = useState({
    name: '',
    company: '',
    photo: '',
    totalApplications: 0,
    activeListings: 0,
    totalHires: 0,
    recentJobs: [],
  });
  const [profileError, setProfileError] = useState(false);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_BASE_URL;

  const fetchProfileData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      setProfileError(true);
      toast.error("Failed to load profile data");
      console.error(error);
    }
  };

  const fetchEmployerJobs = async () => {
    const token = localStorage.getItem('token');
    const employerId = localStorage.getItem('userId');
    try {
      const response = await axios.get(`${API_URL}/job/jobs/employer/${employerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const jobs = response.data.jobs || [];
      const activeListings = jobs.filter(job => job.status === "Open").length;
      const totalApplications = jobs.reduce((sum, job) => sum + (job.applications || 0), 0);

      return {
        recentJobs: jobs.slice(0, 5),
        activeListings,
        totalApplications
      };
    } catch (error) {
      toast.error("Failed to fetch jobs");
      console.error('Error fetching employer jobs:', error);
      return {
        recentJobs: [],
        activeListings: 0,
        totalApplications: 0
      };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const profile = await fetchProfileData();
      const jobData = await fetchEmployerJobs();
      if (profile) {
        setEmployerData({
          name: `${profile.userId?.firstName || ''} ${profile.userId?.lastName || ''}`.trim(),
          company: profile.Company,
          photo: profile.photo,
          totalHires: profile.totalHires || 0,
          ...jobData
        });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4">Profile Incomplete</h2>
          <p className="text-gray-700 mb-6">Please complete your profile to continue using the employer dashboard.</p>
          <button
            onClick={() => navigate('/employer/profile')}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Complete Profile
          </button>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <motion.div
          className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-10 border border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-50 to-white rounded-xl p-6 md:flex md:items-center md:justify-between mb-10">
            <div className="flex items-center gap-4">
              <img
                src={`${import.meta.env.VITE_BASE_IMAGE_URL}/${employerData.photo?.replace(/^\/+/, '')}`}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                  Welcome back, {employerData.name}
                </h2>
                <p className="text-sm text-gray-500">{employerData?.company}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-5 rounded-lg cursor-pointer shadow hover:shadow-md transition bg-white border"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => navigate(action.path)}
                >
                  <div className={`p-3 rounded-full text-white ${action.color}`}>
                    {action.icon}
                  </div>
                  <span className="text-gray-800 font-medium">{action.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Jobs */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Job Listings</h3>
            <div className="space-y-4">
              {employerData.recentJobs.length > 0 ? (
                employerData.recentJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div>
                      <h4 className="text-lg font-medium text-gray-800">{job.title}</h4>
                      <p className="text-sm text-gray-500">{job.location}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 text-sm">Apps: {job.applications}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {job.status}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500">No recent jobs to display.</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );

};

export default EmployerHome;
