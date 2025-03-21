import { motion } from "framer-motion";
import { FaBriefcase, FaUserCheck, FaComments } from "react-icons/fa";

const features = [
  { icon: <FaBriefcase size={50} />, title: "Job Listings", desc: "Find high-paying job offers tailored to your skills and expertise." },
  { icon: <FaUserCheck size={50} />, title: "Mock Interviews", desc: "Gain real interview experience with expert feedback & guidance." },
  { icon: <FaComments size={50} />, title: "Community", desc: "Network with recruiters, mentors, and like-minded professionals." },
];

const Features = () => {
  return (
    <div className="py-16 text-center bg-gray-900 text-white">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        🚀 How We Help You
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-8 bg-gray-800 rounded-xl w-72 shadow-lg flex flex-col items-center border border-gray-700 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.2)" }}
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ yoyo: Infinity, duration: 0.3 }}
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-2xl font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-400 mt-2">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
