import jobData from "../job/jobData";
import JobHeader from "./JobHeader";
import AdditionalInfo from "./AdditionalInfo";
import ContactSection from "./ContactSection";
import JobDescription from "./JobDescription";

const JobListing = () => {
  return (
    <div className="mt-2 min-h-screen overflow-y-auto max-h-100
      [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:bg-gray-500 dark:[&::-webkit-scrollbar-track]:bg-neutral-100
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      <JobHeader data={jobData} />
      <div className="mt-4 space-y-4">
        <JobDescription data={jobData} />
        <AdditionalInfo data={jobData} />
        <ContactSection data={jobData} />
      </div>
    </div>
  );
};

export default JobListing;
