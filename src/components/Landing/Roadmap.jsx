import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

// Roadmap Steps (Update image paths)
const steps = [
  {
    title: "Build Your Resume",
    desc: "A well-crafted resume is your first impression to recruiters. Learn how to create an ATS-friendly resume, highlight your skills, and structure it to stand out in the job market.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd3KDCW3kgmqfjmpCMGt3rFKwVxEXbKJ4DcQ&s",
  },
  {
    title: "Learn Key Skills",
    desc: "Upskilling is crucial! Master technical skills relevant to your industry, improve soft skills like communication & teamwork, and stay updated with the latest industry trends.",
    image: "data:image/jpeg;base64,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",
  },
  {
    title: "Apply for Jobs",
    desc: "Once you're ready, explore job listings that match your skills and interests. Learn how to craft compelling cover letters, tailor applications, and network effectively.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjcXai68XqnjHzIpXwvNyl6PtB1Hwz-HVI5Q&s",
  },
  {
    title: "Ace Interviews",
    desc: "Prepare strategically for interviews by practicing common questions, understanding company cultures, and using storytelling techniques to confidently present your experiences.",
    image: "data:image/jpeg;base64,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",
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
    <div className="">
      <h2 className="text-4xl font-bold text-center py-12">Your Job Search Roadmap</h2>

      <div className="space-y-0">
        {steps.map((step, index) => (
          <RoadmapStep key={index} {...step} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
