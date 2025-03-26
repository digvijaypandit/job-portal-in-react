import Sidebar from "../components/job/Sidebar";
import Navbar from "../components/comman/Navbar";
import JobListing from "../components/job/JobListing";

const JobPage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-20 flex h-screen">
        <Sidebar />
        <JobListing />
      </div>
    </>
  );
};

export default JobPage;
