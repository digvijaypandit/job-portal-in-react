import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

// Roadmap Steps (Update image paths)
const steps = [
  {
    title: "Build Your Resume",
    desc: "A well-crafted resume is your first impression to recruiters. Learn how to create an ATS-friendly resume, highlight your skills, and structure it to stand out in the job market.",
    image: "/images/resume.png",
  },
  {
    title: "Learn Key Skills",
    desc: "Upskilling is crucial! Master technical skills relevant to your industry, improve soft skills like communication & teamwork, and stay updated with the latest industry trends.",
    image: "/images/skills.png",
  },
  {
    title: "Apply for Jobs",
    desc: "Once you're ready, explore job listings that match your skills and interests. Learn how to craft compelling cover letters, tailor applications, and network effectively.",
    image: "/images/jobs.png",
  },
  {
    title: "Ace Interviews",
    desc: "Prepare strategically for interviews by practicing common questions, understanding company cultures, and using storytelling techniques to confidently present your experiences.",
    image: "/images/interview.png",
  },
];

// Roadmap Step Component
const RoadmapStep = ({ title, desc, image, index }) => {
  const ref = useRef(null);
  const controlsText = useAnimation();
  const controlsImage = useAnimation();
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  useEffect(() => {
    if (isInView) {
      controlsText.start({ opacity: 1, x: 0 });
      controlsImage.start({ opacity: 1, scale: 1 });
    }
  }, [isInView, controlsText, controlsImage]);

  return (
    <div ref={ref} className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background Image */}
      <motion.img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={controlsImage}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Animated Text Box */}
      <motion.div
        className={`absolute w-[90%] max-w-3xl p-6 md:p-10 text-white bg-black/50 rounded-lg ${
          index % 2 === 0 ? "left-10 text-left" : "right-10 text-right"
        }`}
        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
        animate={controlsText}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="mt-2 text-lg leading-relaxed">{desc}</p>
      </motion.div>
    </div>
  );
};

const Roadmap = () => {
  return (
    <div className="bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-center py-12">📍 Your Job Search Roadmap</h2>

      <div className="space-y-0">
        {steps.map((step, index) => (
          <RoadmapStep key={index} {...step} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
