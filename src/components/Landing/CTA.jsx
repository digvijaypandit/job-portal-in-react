import { motion } from "framer-motion";

const CTA = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-purple-800 to-blue-600 text-white text-center relative overflow-hidden">
      {/* Floating Glow Effect */}
      <div className="absolute inset-0 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

      {/* Animated Heading */}
      <motion.h2
        className="text-4xl font-bold tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        🚀 Ready to Start Your Job Hunt?
      </motion.h2>

      {/* Animated Subtitle */}
      <motion.p
        className="mt-4 text-lg text-gray-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        Sign up today and take the first step toward your dream job!
      </motion.p>

      {/* Animated Button */}
      <motion.button
        className="mt-6 px-8 py-3 bg-white text-blue-600 font-bold rounded-full shadow-lg text-lg transition-all duration-300"
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.5)",
        }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Get Started 🚀
      </motion.button>
    </div>
  );
};

export default CTA;
