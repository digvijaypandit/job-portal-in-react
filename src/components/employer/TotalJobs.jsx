import React from "react";
import Navbar from "../components/comman/Navbar";

const TotalJobs = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mt-16 mx-auto p-6">
        <h2 className="text-2xl font-semibold">Total Jobs</h2>
        <p className="text-gray-600 mt-2">Here is the detailed list of all job postings.</p>
        {/* Job List Here */}
      </div>
    </>
  );
};

export default TotalJobs;
