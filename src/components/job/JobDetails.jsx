import { useParams } from "react-router-dom";
import jobs from "../job/data";

const JobDetails = () => {
  const { id } = useParams();
  const job = jobs.find((job) => job.id === parseInt(id));

  if (!job) return <p className="p-4">Job not found!</p>;

  return (
    <div className="w-2/3 p-6">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.company}</p>
      <p className="mt-2 text-gray-500">{job.description}</p>
      <div className="mt-4">
        <h3 className="font-semibold">Perks:</h3>
        <ul className="list-disc ml-5">
          {job.perks.map((perk, index) => (
            <li key={index} className="text-gray-700">{perk}</li>
          ))}
        </ul>
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Apply Now</button>
    </div>
  );
};

export default JobDetails;
