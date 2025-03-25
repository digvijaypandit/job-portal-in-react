import Sidebar from "../components/job/Sidebar";
import JobDetails from "../components/job/JobDetails";

const JobPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <JobDetails />
    </div>
  );
};

export default JobPage;
