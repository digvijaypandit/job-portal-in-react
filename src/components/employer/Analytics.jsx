import React from "react";
import Navbar from "../components/comman/Navbar";

const Analytics = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mt-16 mx-auto p-6">
        <h2 className="text-2xl font-semibold">Analytics</h2>
        <p className="text-gray-600 mt-2">Visual insights and data on job performance.</p>
        {/* Analytics Charts Here */}
      </div>
    </>
  );
};

export default Analytics;
