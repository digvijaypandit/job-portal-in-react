import React from "react";
import { Briefcase, Users, FileText, BarChart, Settings } from "lucide-react";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/footer";

// Reusable Stat Card Component
const StatCard = ({ icon, title, count }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition-all">
    <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 text-xl font-bold">{count}</p>
    </div>
  </div>
);

// Reusable Job Card Component
const JobCard = ({ title, applicants }) => (
  <div className="flex justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-all">
    <h4 className="text-gray-900 font-medium">{title}</h4>
    <p className="text-gray-600">{applicants} Applicants</p>
  </div>
);

const EmployerDashboard = () => {
  // Dashboard Stats
  const stats = [
    { title: "Total Jobs", count: 12, icon: <Briefcase size={24} /> },
    { title: "Applicants", count: 58, icon: <Users size={24} /> },
    { title: "Interviews Scheduled", count: 8, icon: <FileText size={24} /> },
    { title: "Analytics", count: "View", icon: <BarChart size={24} /> }
  ];

  // Recent Applicants
  const applicants = ["John Doe", "Jane Smith", "Michael Lee"];

  // Recent Job Posts
  const jobs = [
    { title: "Frontend Developer", applicants: 20 },
    { title: "Backend Developer", applicants: 15 },
    { title: "UI/UX Designer", applicants: 10 }
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mt-16 mx-auto p-6 space-y-6 min-h-screen text-gray-900">
        {/* Dashboard Header */}
        <div className="shadow-lg rounded-2xl bg-white border border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Employer Dashboard</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 shadow-md transition-all">
            Post a Job
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Applicants */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText size={20} /> Recent Applicants
          </h3>
          <p className="text-gray-600 mt-2">Review the latest candidates who applied.</p>
          <div className="mt-4 space-y-3">
            {applicants.map((applicant, index) => (
              <div key={index} className="flex justify-between p-3 border-b">
                <span>{applicant}</span>
                <button className="text-blue-500 hover:underline">View Profile</button>
              </div>
            ))}
          </div>
        </div>

        {/* Job Listings Section */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Recent Job Posts</h3>
            <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
              <Settings size={18} />
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {jobs.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EmployerDashboard;


