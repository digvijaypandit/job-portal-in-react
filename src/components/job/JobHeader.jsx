import React from "react";
import { MdOpenInNew } from "react-icons/md";
import { IoTodayOutline,IoGlobeOutline,IoLocationOutline } from "react-icons/io5";

const JobHeader = ({ data }) => {
  return (
    <div className="bg-white shadow-sm cursor-pointer rounded-lg p-5 flex items-center gap-4 group relative hover:shadow-md transition">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <img
            src={data.companyLogo}
            alt="Company Logo"
            className="w-16 h-16 rounded-lg"
          />
          <div className="px-2">
            <h2 className="text-2xl font-semibold group-hover:text-blue-600">{data.title}</h2>
            <p className="text-gray-500 hover:text-blue-600">{data.company}</p>
          </div>
        </div>
        <div className="text-gray-600 p-2">
          <p className="flex items-center gap-2"><IoLocationOutline />{data.location}</p>
          <p className="flex items-center gap-2"><IoTodayOutline />Updated On: {data.updatedOn}</p>
          <p className="flex items-center gap-2"><IoGlobeOutline />Official website: {data.updatedOn}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center text-gray-500">
        <span className="relative -top-20 -right-30 opacity-0 group-hover:opacity-100 transition-opacity">
          <MdOpenInNew className="size-5" />
        </span>
        <button className="mt-30 px-4 py-2 bg-blue-600 text-white rounded">Apply Now</button>
      </div>
    </div>
  );
};

export default JobHeader;
