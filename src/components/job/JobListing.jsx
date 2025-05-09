import { useEffect, useState } from "react";
import axios from "axios";
import JobHeader from "./JobHeader";
import AdditionalInfo from "./AdditionalInfo";
import ContactSection from "./ContactSection";
import JobDescription from "./JobDescription";
import Skills from "./skills";

const JobListing = ({ selectedJobId }) => {
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedJobId) return;

    const fetchJob = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // get token from localStorage
        const response = await axios.get(`http://localhost:5000/api/job/jobs/${selectedJobId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // add Authorization header
          },
        });
        console.log(response.data.job)
        setJobData(response.data.job); // set job data
        setError(null);
      } catch (err) {
        setError("Failed to load job details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [selectedJobId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!jobData) return <div>No job data available.</div>;

  return (
    <div className="mt-2 min-h-screen overflow-y-auto max-h-100
      [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-500 dark:[&::-webkit-scrollbar-track]:bg-neutral-100
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      <JobHeader data={jobData} />
      <div className="mt-4 space-y-4">
        <JobDescription data={jobData} />
        <Skills data={jobData} />
        {/* <AdditionalInfo data={jobData} /> */}
        {/* <ContactSection data={jobData} /> */}
      </div>
    </div>
  );
};

export default JobListing;
