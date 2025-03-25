import React from "react";

const JobCard = () => {
    return (
        <div className="bg-white p-4 w-[400px] rounded-lg cursor-pointer shadow-md flex gap-4 items-center border border-gray-200">
            {/* Left - Company Logo */}
            <div className="w-20 h-20  rounded-md">
                <img
                    src="/images/Digvijay.jpg"
                    alt={`resource.name`}
                    className="object-cover "
                />
            </div>

            {/* Right - Job Info */}
            <div className="flex flex-col w-full">
                {/* Job Badge */}
                <span className="bg-gray-200 text-xs px-2 py-1 rounded w-fit">Job</span>

                {/* Job Title & Company Name */}
                <a href="#" className="text-gray-900 font-semibold text-lg hover:underline">
                    Customer Service Representative
                </a>
                <p className="text-gray-600 text-sm">blinkzey</p>

                {/* Application & Deadline */}
                <div className="flex items-center gap-4 text-gray-700 text-sm mt-1">
                    <span className="flex items-center gap-1">48 Applied</span>
                    <span className="flex items-center gap-1">9 days left</span>
                </div>

                {/* Category Tags */}
                <div className="flex items-center gap-2 mt-3">
                    <span className="px-3 py-1 rounded-full border border-[#b0b0b0] text-sm text-[#6a7282]">Engineering Students</span>
                    <span className="px-3 py-1 rounded-full border border-[#b0b0b0] text-sm text-[#6a7282]">MBA Students</span>
                    <span className="text-gray-500 text-sm">+2</span>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
