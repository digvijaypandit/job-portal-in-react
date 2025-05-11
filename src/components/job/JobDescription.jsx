import React from 'react';

const JobDescription = ({ job }) => {
  const responsibilities = Array.isArray(job.keyResponsibilities) && job.keyResponsibilities.length > 0
    ? JSON.parse(job.keyResponsibilities[0])
    : [];

  const skills = Array.isArray(job.skills) && job.skills.length > 0
    ? JSON.parse(job.skills[0])
    : [];

  return (
    <div className="p-6 bg-white rounded-2xl shadow space-y-6 leading-relaxed text-gray-800">
      {/* Header */}
      <h2 className="text-xl font-semibold border-l-4 border-blue-600 pl-3">
        Job Description
      </h2>

      {/* Intro */}
      <div className="space-y-2">
        <p>{job.jobDescription}</p>
      </div>

      {/* Responsibilities */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900">Key Responsibilities:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {responsibilities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900">Skills & Qualifications:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Details */}
      <div className="space-y-1 text-gray-700">
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Type:</strong> {job.workType}</p>
        <p><strong>CTC:</strong>  As per market standards</p>
      </div>

      {/* CTA */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-blue-600 font-semibold">
          Want to grow with a rocketship? <span className="text-black font-medium">Apply now</span> – let’s rank, scale, and build CirclePe together!
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
