import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Full-Screen Background Image */}
      <motion.img
        src="/images/lost-caveman.gif" // Replace with your image path
        alt="Lost Caveman"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0.5, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Centered Text and Button Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30">
        {/* Animated 404 Text */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          className="text-lg md:text-2xl mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Looks like you're lost!
        </motion.p>

        <p className="text-sm md:text-base text-gray-200">
          The page you are looking for does not exist.
        </p>

        {/* Button to Go Home */}
        <motion.button
          className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </motion.button>
      </div>
    </div>
  );
};

export default NotFound;
