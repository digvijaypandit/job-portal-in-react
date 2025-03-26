import { useState } from "react";
import JobCard from "./JobCard";

const jobData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Sphinxhire.Ai Private Limited",
    logo: "https://yt3.googleusercontent.com/FJI5Lzbf2dMd32xOqhoKpJArJooZhoX6v2qOcFO-wjSZUvs3H9xqq2gK4DQ47X0KnYgf7X2rpdU=s900-c-k-c0x00ffffff-no-rj",
    applied: 100,
    deadline: "9 months left",
    categories: ["All", "Engineering", "Software", "Backend", "Software", "Backend"],
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "TechNova Solutions",
    logo: "https://play-lh.googleusercontent.com/FA_rzaEeLlumm0qh68q3z5Pt-PGMVPf2Z28_pbega7SaXSiKjSzh-0MZceB3FpdvQIBq",
    applied: 78,
    deadline: "15 days left",
    categories: ["Software"],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Minds",
    logo: "data:image/png;base64,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",
    applied: 45,
    deadline: "1 month left",
    categories: ["Design", "UX/UI"],
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Insight Analytics",
    logo: "https://static.vecteezy.com/system/resources/previews/027/127/473/non_2x/microsoft-logo-microsoft-icon-transparent-free-png.png",
    applied: 120,
    deadline: "2 months left",
    categories: ["Data Science", "Analytics"],
  },
];

const Sidebar = () => {
  const [selectedJobId, setSelectedJobId] = useState(null);

  return (
    <div className="m-2 mb-35 flex flex-col items-center space-x-4">
      <div className="overflow-y-auto space-y-2 [&::-webkit-scrollbar]:hidden">
        {jobData.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            selectedJobId={selectedJobId}
            setSelectedJobId={setSelectedJobId}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
