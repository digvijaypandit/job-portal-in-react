import { useState, useEffect } from "react";
import Sidebar from "../components/job/Sidebar";
import Navbar from "../components/comman/Navbar";
import FilterBar from "../components/job/FilterBar";
import axios from "axios"; 
import JobListing from "../components/job/JobListing";

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [filters, setFilters] = useState({
    location: "",
    workType: "",
    category: "",
    salary: "",
    postDate: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Fetch jobs from API based on the search query
  const fetchJobs = async (query) => {
    try {
      const response = await axios.get("http://localhost:5000/api/job", {
        params: { jobName: query }, // You can send category or jobName
      });
      console.log(response.data.jobs)
      setJobs(response.data.jobs);
      setFilteredJobs(response.data.jobs); // Initially, display all jobs
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchJobs(e.target.value); // Fetch jobs on each input change
  };

  // Filter jobs based on selected filters
  const applyFilters = () => {
    let result = [...jobs];

    // Apply filters
    if (filters.location) {
      result = result.filter((job) => job.location === filters.location);
    }
    if (filters.workType) {
      result = result.filter((job) => job.workType === filters.workType);
    }
    if (filters.category) {
      result = result.filter((job) =>
        job.tags.includes(filters.category)
      );
    }
    if (filters.salary) {
      // Apply salary filter logic if needed
    }
    if (filters.postDate) {
      // Apply post date filter logic if needed
    }

    setFilteredJobs(result);
  };

  // Trigger filter application when filters chang
  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <Navbar />
      <div className="mt-16">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          setFilters={setFilters}
        />
      </div>
      <div className="flex h-full">
        <Sidebar
          jobs={filteredJobs}
          selectedJobId={selectedJobId}
          setSelectedJobId={setSelectedJobId}
        />
        <JobListing selectedJobId={"680efeeb5d480995f1195916"} />
      </div>
    </div>
  );
};

export default JobPage;
