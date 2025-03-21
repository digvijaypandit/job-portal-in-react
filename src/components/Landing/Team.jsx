import { useState } from "react";
import { motion } from "framer-motion";

const members = [
  { name: "John Doe", role: "Frontend Developer", img: "" },
  { name: "John Doe", role: "Frontend Developer", img: "" },
  { name: "John Doe", role: "Frontend Developer", img: "" },
];

const Team = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleClick = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  return (
    <div className="py-16 text-center bg-gray-900 text-white relative">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Meet the Developers
      </motion.h2>

      <div className="relative flex justify-center items-center h-96 w-full">
        {members.map((member, index) => {
          let position = "left";
          if (index === activeIndex) position = "center";
          else if ((index + 1) % members.length === activeIndex) position = "right";

          return (
            <motion.div
              key={index}
              className={`absolute cursor-pointer transition-all duration-700 ${
                position === "center" ? "z-10" : "z-0 opacity-70"
              }`}
              style={{
                left: position === "center" ? "50%" : position === "left" ? "25%" : "75%",
                transform: position === "center" ? "translateX(-50%) scale(1.3)" : "translateX(-50%) scale(0.9)",
                filter: position === "center" ? "none" : "blur(1px)",
              }}
              onClick={() => handleClick(index)}
            >
              <motion.img
                src={member.img}
                alt={member.name}
                className="rounded-full w-40 h-40 border-4 border-gray-500"
                whileHover={{ scale: position === "center" ? 1.4 : 1 }}
              />
              <motion.h3
                className="text-2xl font-semibold mt-4"
                animate={{ opacity: position === "center" ? 1 : 0.8 }}
              >
                {member.name}
              </motion.h3>
              <motion.p
                className="text-gray-400"
                animate={{ opacity: position === "center" ? 1 : 0.8 }}
              >
                {member.role}
              </motion.p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;
