import React from "react";
import Navbar from "../components/comman/Navbar";

const Applicants = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mt-16 mx-auto p-6">
        <h2 className="text-2xl font-semibold">Applicants</h2>
        <p className="text-gray-600 mt-2">List of all candidates who applied for jobs.</p>
        {/* Applicants List Here */}
      </div>
    </>
  );
};

export default Applicants;
