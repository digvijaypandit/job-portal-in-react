import jobData from "../job/jobData";
import JobHeader from "./JobHeader";
import JobDetails from "./JobDetails";
import AdditionalInfo from "./AdditionalInfo";
import ContactSection from "./ContactSection";
import JobDescription from "./JobDescription";

const JobListing = () => {
  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <JobHeader data={jobData} />
      <div className="mt-4 space-y-4">
        <JobDetails data={jobData} />
        <JobDescription data={jobData} />
        <AdditionalInfo data={jobData} />
        <ContactSection data={jobData} />
      </div>
    </div>
  );
};

export default JobListing;
