import { useEffect } from "react";
import Sidebar from "../components/job/Sidebar";
import Navbar from "../components/comman/Navbar";
import JobListing from "../components/job/JobListing";
import FilterBar from "../components/job/FilterBar";

const JobPage = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <Navbar />
      <div className="mt-16">
        <FilterBar />
      </div>
      <div className="flex h-full">
        <Sidebar />
        <JobListing />
      </div>
    </div>
  );
};

export default JobPage;
