import React from 'react';
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarWeek,
  FaClock
} from 'react-icons/fa';

const AdditionalInfo = ({ job }) => {
  const infoData = [
    { icon: <FaMoneyBillWave />, title: 'Salary', content: job.salary },
    { icon: <FaCalendarWeek />, title: 'Working Days', content: job.workingDays || '5 Days'},
    { icon: <FaClock />, title: 'Job Type/Timing', content: job.workDetail },
    { icon: <FaMapMarkerAlt />, title: 'Job Location(s)', content: job.location || 'Gurgaon' },
    { icon: <FaBriefcase />, title: 'Experience', content: job.Experience },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4 mb-6">
        Additional Info
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        {infoData.map((item, index) => (
          <InfoBlock key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

const InfoBlock = ({ icon, title, content }) => (
  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="text-blue-600 text-lg mt-1">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      <p className="text-sm text-gray-500">{content}</p>
    </div>
  </div>
);

export default AdditionalInfo;
