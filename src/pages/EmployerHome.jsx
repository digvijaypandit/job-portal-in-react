import { motion } from "framer-motion";
import { FaPlus, FaClipboardList, FaUsers } from "react-icons/fa";
import Footer from "../components/comman/footer";
import Navbar from "../components/comman/Navbar";
import { useNavigate } from "react-router-dom";

const employerData = {
  name: "John Doe",
  company: "Sphinxhire.AI Private Limited",
  totalJobs: 12,
  totalApplications: 98,
  activeListings: 5,
  totalHires: 24,
  recentJobs: [
    { id: 1, title: "Frontend Developer", location: "Pune", applications: 35, status: "Open" },
    { id: 2, title: "Backend Developer", location: "Bangalore", applications: 22, status: "Closed" },
    { id: 3, title: "UI/UX Designer", location: "Remote", applications: 41, status: "Open" }
  ]
};

const EmployerHome = () => {
  const navigate = useNavigate();

  const quickActions = [
    { label: "Post a Job", icon: <FaPlus />, color: "bg-green-600", path: "/employer/post-job" },
    { label: "Manage Jobs", icon: <FaClipboardList />, color: "bg-blue-600", path: "/employer/manage-jobs" },
    { label: "View Applications", icon: <FaUsers />, color: "bg-purple-600", path: "/employer/applications" }
  ];

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
                src=""
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                  Welcome back, {employerData.name}
                </h2>
                <p className="text-sm text-gray-500">{employerData.company}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 md:mt-0">
              {[
                { label: "Jobs Posted", value: employerData.totalJobs },
                { label: "Active Listings", value: employerData.activeListings },
                { label: "Applications", value: employerData.totalApplications },
                { label: "Hires", value: employerData.totalHires },
              ].map((item, i) => (
                <div key={i} className="bg-white shadow-sm border rounded-lg px-4 py-3 text-center">
                  <p className="text-lg font-semibold text-gray-800">{item.value}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
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
              {employerData.recentJobs.map((job) => (
                <motion.div
                  key={job.id}
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
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default EmployerHome;
