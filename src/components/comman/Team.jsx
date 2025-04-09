import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn } from "react-icons/fa";
import { PiGithubLogoFill } from "react-icons/pi";

const members = [
  {
    name: "Jishan Shaikh",
    role: "Backend Developer",
    img: "/images/Jishan.jpg",
    bio: "Builds scalable backend systems with Node.js, Express, and MongoDB.",
    github: "https://github.com/jishanshaikh",
    linkedin: "https://linkedin.com/in/jishanshaikh",
  },
  {
    name: "Digvijay Pandit",
    role: "Full-Stack Developer",
    img: "/images/Digvijay.jpg",
    bio: "Full-stack wizard with expertise in React, Node.js, and cloud services.",
    github: "https://github.com/digvijaypandit",
    linkedin: "https://linkedin.com/in/digvijaypandit",
  },
  {
    name: "Gaurav Pawar",
    role: "Frontend Developer",
    img: "/images/Gaurav.jpg",
    bio: "Crafts pixel-perfect interfaces with React, TailwindCSS, and animation magic.",
    github: "https://github.com/gauravpawar",
    linkedin: "https://linkedin.com/in/gauravpawar",
  }
];

const TeamCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto switch developer every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % members.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-6xl w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col-reverse lg:flex-row items-center bg-white shadow-xl rounded-xl p-8 lg:p-12 gap-8"
          >
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                I’m {members[activeIndex].name},<br />
                a {members[activeIndex].role}
              </h1>
              <p className="text-gray-600 mb-6">
                {members[activeIndex].bio}
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-6 mt-4">
                <a
                  href={members[activeIndex].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn  />
                </a>
                <a
                  href={members[activeIndex].github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PiGithubLogoFill />
                </a>
              </div>
            </div>

            {/* Image */}
            <motion.div
              className="lg:w-1/2"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={members[activeIndex].img}
                alt={members[activeIndex].name}
                className="rounded-lg w-full max-w-sm mx-auto object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeamCarousel;
