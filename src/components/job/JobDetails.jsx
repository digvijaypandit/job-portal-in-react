import React from "react";
import { MdOpenInNew } from "react-icons/md";
import { IoTodayOutline, IoLocationOutline } from "react-icons/io5";

const JobHeader = ({ data }) => {
  return (
    <div className="bg-[#F4F0FF] p-6 rounded-lg shadow-md relative flex items-start gap-4">
      {/* Left Border Accent */}
      <div className="w-2 bg-purple-600 rounded-l-lg"></div>

      {/* Logo Section */}
      <div>
        <img
          src={data.companyLogo}
          alt="Company Logo"
          className="w-16 h-16 rounded-lg border border-gray-200 shadow-sm"
        />
      </div>

      {/* Job Details */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-gray-800">{data.title}</h2>
        <p className="text-gray-500 text-lg">{data.company}</p>

        {/* Meta Information */}
        <div className="text-gray-600 mt-2 space-y-1">
          <p className="flex items-center gap-2">
            <IoLocationOutline className="text-xl" />
            {data.location}
          </p>
          <p className="flex items-center gap-2">
            <IoTodayOutline className="text-xl" />
            <span className="font-medium">Updated On:</span> {data.updatedOn}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
