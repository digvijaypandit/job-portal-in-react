import { motion } from "framer-motion";

const JobCard = ({ title, company, location }) => {
  return (
    <motion.div
      className="bg-white p-5 rounded-lg shadow-lg"
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{company}</p>
      <p className="text-sm text-gray-400">{location}</p>
    </motion.div>
  );
};

export default JobCard;
