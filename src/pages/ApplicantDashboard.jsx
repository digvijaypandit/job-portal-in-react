import Sidebar from "../components/applicant/Sidebar";
import JobCard from "../components/applicant/JobCard";
import ApplicationStatus from "../components/applicant/ApplicationStatus";
import NotificationPanel from "../components/applicant/NotificationPanel";

const ApplicantDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 p-10 w-full bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

        {/* Job Recommendations */}
        <h2 className="text-2xl font-semibold mb-4">Recommended Jobs</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <JobCard title="Software Engineer" company="Google" location="California, USA" />
          <JobCard title="Data Scientist" company="Amazon" location="New York, USA" />
          <JobCard title="Frontend Developer" company="Microsoft" location="Seattle, USA" />
          <JobCard title="Product Manager" company="Tesla" location="Austin, USA" />
        </div>

        {/* Application Status & Notifications */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ApplicationStatus />
          <NotificationPanel />
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
