const JobDescription = ({ data }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-5">
      <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-2">
        Job Description
      </h3>
      <p className="text-gray-700 mt-2">{data.jobDescription}</p>

      <h4 className="font-semibold mt-3">Key Responsibilities:</h4>
      <ul className="list-disc pl-5 text-gray-600">
        {data.keyResponsibilities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobDescription;
