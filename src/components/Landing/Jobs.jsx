import { motion } from "framer-motion";

// Job Titles
const jobs = [
  { title: "Software Engineer" },
  { title: "Data Scientist" },
  { title: "Product Manager" },
  { title: "DevOps Engineer" },
  { title: "UX Designer" },
  { title: "AI Researcher" },
  { title: "Marketing Analyst" },
  { title: "Cloud Architect" },
  { title: "Security Specialist" },
  { title: "Business Analyst" },
  { title: "Mobile App Developer" },
  { title: "QA Engineer" },
  { title: "IT Support Specialist" },
  { title: "Machine Learning Engineer" },
  { title: "Full Stack Developer" },
];

const repeatedJobs = [...jobs, ...jobs];

const Jobs = () => {
  return (
    <div className="py-20 bg-white text-black text-center">
      {/* Title */}
      <motion.h2
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Find Your Dream Job
      </motion.h2>
      <p className="mt-2 text-gray-500">
        Explore top job opportunities at leading companies
      </p>

      {/* Scrolling Job Titles */}
      <div className="overflow-hidden mt-10 relative">
        <motion.div
          className="flex gap-10 w-max"
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }} // ⬅️ scrolls the entire width
          transition={{
            repeat: Infinity,
            duration: 30, // ⬅️ longer time = slower scroll
            ease: "linear",
          }}
        >
          {repeatedJobs.map((job, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-48 h-24 text-black text-lg font-medium"
            >
              {job.title}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Jobs;
