import React from "react";

const JobDetails = ({ data }) => {
  if (!data) return <p className="p-4">Job not found!</p>;

  return (
    <div className=" p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="text-gray-600">{data.company}</p>
      <p className="mt-2 text-gray-500">{data.description}</p>
      
      <div className="mt-4">
        <h3 className="font-semibold">Perks:</h3>
        <ul className="list-disc ml-5">
          {data.skills.map((skill, index) => (
            <li key={index} className="text-gray-700">{skill}</li>
          ))}
        </ul>
      </div>
      
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Apply Now</button>
    </div>
  );
};

export default JobDetails;
