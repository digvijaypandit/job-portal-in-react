import { motion } from "framer-motion";
import { FaPlus, FaClipboardList, FaUsers, FaBriefcase } from "react-icons/fa";
import Footer from "../components/comman/footer";
import Navbar from "../components/comman/Navbar";

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
  return (
    <>
    <Navbar />
    <div className="min-h-screen mt-10 bg-gradient-to-br from-blue-100 to-blue-300 flex justify-center items-center p-8">
      <motion.div
        className="w-full max-w-5xl bg-white/90 shadow-xl backdrop-blur-lg rounded-xl p-8 border border-gray-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-900">Welcome, {employerData.name}</h2>
          <p className="text-gray-600">{employerData.company}</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { label: "Total Jobs", value: employerData.totalJobs, icon: <FaBriefcase /> },
            { label: "Total Applications", value: employerData.totalApplications, icon: <FaUsers /> },
            { label: "Active Listings", value: employerData.activeListings, icon: <FaClipboardList /> },
            { label: "Total Hires", value: employerData.totalHires, icon: <FaUsers /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center border border-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl text-blue-600">{stat.icon}</div>
              <h3 className="text-2xl font-semibold mt-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
          <div className="flex gap-4 mt-3">
            {[
              { label: "Post a Job", icon: <FaPlus />, color: "bg-green-500" },
              { label: "Manage Jobs", icon: <FaClipboardList />, color: "bg-blue-500" },
              { label: "View Applications", icon: <FaUsers />, color: "bg-purple-500" }
            ].map((action, index) => (
              <motion.button
                key={index}
                className={`flex items-center gap-2 px-6 py-3 text-white font-medium rounded-lg shadow-md ${action.color} hover:opacity-90`}
                whileHover={{ scale: 1.05 }}
              >
                {action.icon} {action.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Job Listings */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Job Listings</h3>
          <div className="mt-3 space-y-3">
            {employerData.recentJobs.map((job) => (
              <motion.div
                key={job.id}
                className="p-4 bg-white rounded-lg shadow-lg flex justify-between items-center border border-gray-200"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <h4 className="font-medium text-gray-900">{job.title}</h4>
                  <p className="text-gray-600">{job.location}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-gray-600">Apps: {job.applications}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      job.status === "Open" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
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
