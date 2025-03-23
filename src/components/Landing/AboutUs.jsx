import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="py-20 bg-gray-900 text-white text-center">
      <motion.h2
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        About Us
      </motion.h2>
      <motion.p
        className="mt-4 text-lg max-w-3xl mx-auto text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        We are on a mission to connect job seekers with top companies worldwide. 
        Our platform ensures seamless hiring experiences and career growth.  
      </motion.p>
      <motion.p
        className="mt-4 text-lg max-w-3xl mx-auto text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        From fresh graduates to experienced professionals, we help everyone land their dream job.
      </motion.p>
    </div>
  );
};

export default AboutUs;
