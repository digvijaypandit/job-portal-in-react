import JobCard from "./JobCard";

const Sidebar = ({ jobs, selectedJobId, setSelectedJobId }) => {
  console.log(selectedJobId)
  return (
    <>
      <div className="m-2 mb-35 flex flex-col items-center space-x-4">
        <div className="overflow-y-auto space-y-2 [&::-webkit-scrollbar]:hidden">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              selectedJobId={selectedJobId}
              setSelectedJobId={setSelectedJobId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
