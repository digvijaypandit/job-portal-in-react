import React from "react";
import Navbar from "../components/comman/Navbar";

const Interviews = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mt-16 mx-auto p-6">
        <h2 className="text-2xl font-semibold">Interviews Scheduled</h2>
        <p className="text-gray-600 mt-2">View all upcoming interview schedules.</p>
        {/* Interview List Here */}
      </div>
    </>
  );
};

export default Interviews;
