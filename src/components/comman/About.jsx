import React from "react";
import { motion } from "framer-motion";
import Team from "./Team";
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
  const cards = [
    {
      title: "Our Mission",
      desc: "To empower individuals by creating a seamless bridge between ambition and opportunity. We aim to transform the hiring process into a dynamic, transparent, and efficient experience for both candidates and employers.",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Our Vision",
      desc: "To become the world's most trusted and user-centric job portal—where careers are launched, talent is nurtured, and companies grow with confidence.",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Our Core Values",
      desc: "We are driven by innovation, fueled by integrity, and committed to delivering excellence in every interaction. Our platform is built with people at the center—because every career journey matters.",
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="bg-white text-gray-900 transition-colors duration-500">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="text-center py-24 px-6 bg-gradient-to-br from-blue-50 to-purple-50"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-700 to-purple-600">
          Who We Are
        </h1>
        <p className="mt-6 text-xl max-w-3xl mx-auto text-gray-700 leading-relaxed">
          At <span className="font-bold text-blue-600">JobPortal</span>, we’re redefining how people find jobs and how employers find the right talent. Our platform blends advanced technology with human insight to power smarter career moves.
        </p>
      </motion.section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-8 max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {cards.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white cursor-pointer rounded-xl p-8 shadow-xl border-t-4"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div
              className={`h-1 w-20 mb-4 rounded-full bg-gradient-to-r ${item.color}`}
            ></div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* What Sets Us Apart Section */}
      <motion.section
        className="bg-gray-50 py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">What Sets Us Apart</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We’re not just another job portal. We’re a mission-driven team passionate about simplifying careers. With personalized recommendations, verified employers, and real-time communication tools, we provide a platform that works for everyone—from entry-level candidates to executive professionals.
          </p>
        </div>
      </motion.section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10 text-gray-800">Meet Our Team</h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
            Behind our platform is a passionate team of technologists, designers, and career coaches committed to your growth. Get to know the minds that make JobBridge possible.
          </p>
          <Team />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
