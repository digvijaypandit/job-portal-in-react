import React from "react";
import { FaBriefcase, FaBookmark, FaBell, FaChartBar, FaUpload, FaUserEdit, FaCalendarAlt, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/Footer";

const ApplicantDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-10">
        {/* Stats Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {[
            { icon: <FaBriefcase />, label: "Applications", count: "5", color: "bg-blue-500" },
            { icon: <FaBookmark />, label: "Saved Jobs", count: "10", color: "bg-yellow-500" },
            { icon: <FaBell />, label: "Notifications", count: "3", color: "bg-red-500" },
            { icon: <FaChartBar />, label: "Interviews", count: "2", color: "bg-green-500" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-xl shadow-lg text-white flex items-center ${stat.color}`}
            >
              <div className="text-4xl">{stat.icon}</div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{stat.label}</h3>
                <p className="text-2xl font-bold">{stat.count}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resume Strength Indicator */}
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaFileAlt className="mr-2 text-blue-500" /> Resume Strength
          </h2>
          <p className="text-gray-600">Your resume is **75% optimized**. Improve it by adding keywords and formatting.</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
            <motion.div
              className="h-3 rounded-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaCalendarAlt className="mr-2 text-green-500" /> Upcoming Interviews
          </h2>
          <ul className="space-y-4">
            {[
              { job: "Frontend Developer", company: "Google", date: "March 30, 2025", time: "10:00 AM" },
              { job: "Marketing Manager", company: "Amazon", date: "April 2, 2025", time: "2:00 PM" },
            ].map((interview, index) => (
              <li key={index} className="flex justify-between p-4 bg-gray-100 rounded-lg shadow-md">
                <div>
                  <p className="font-semibold">{interview.job} - {interview.company}</p>
                  <p className="text-gray-500">{interview.date} at {interview.time}</p>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Saved Jobs Section */}
        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-4">Saved Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "UI/UX Designer", company: "Adobe", location: "Remote", color: "bg-purple-100" },
              { title: "Data Scientist", company: "Microsoft", location: "Seattle", color: "bg-blue-100" },
              { title: "Project Manager", company: "Meta", location: "Austin", color: "bg-red-100" },
            ].map((job, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-lg shadow-md ${job.color} border border-gray-300`}
              >
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500">{job.location}</p>
                <div className="flex justify-between mt-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                    Unsave
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Job Recommendations */}
        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-4">Recommended Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Software Engineer", company: "Google", location: "Remote", color: "bg-blue-100" },
              { title: "Marketing Analyst", company: "Amazon", location: "New York", color: "bg-yellow-100" },
              { title: "Financial Advisor", company: "Tesla", location: "San Francisco", color: "bg-green-100" },
            ].map((job, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-lg shadow-md ${job.color} border border-gray-300`}
              >
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500">{job.location}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApplicantDashboard;
