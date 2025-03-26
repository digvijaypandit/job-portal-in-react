import React,{useState, useEffect} from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Team from './Team'
import Navbar from "./Navbar";
import Footer from "../footer";

const About = () => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
      useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);
    
  return (
    <div 
      className={`transition-colors duration-500 ${
        isLoggedIn ? "bg-white text-gray-900" : "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
      } min-h-screen`}
    >

      {/* Navbar or Auth Buttons */}
      {isLoggedIn ? (
        <Navbar />
      ) : (
        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-bold text-white cursor-pointer hover:scale-110 transition hover:text-blue-400" onClick={() => navigate("/")}>Job Portal</h2>
          <div>
            <button onClick={() => navigate("/login")} className="px-5 py-2 mr-4 border border-white rounded-lg hover:bg-white hover:text-black transition">
              Login
            </button>
            <button onClick={() => navigate("/login")} className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <motion.section 
        className="text-center py-20 px-5"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          About Our Job Portal
        </h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          Connecting top talent with leading employers through an intuitive and powerful platform.
        </p>
      </motion.section>

      {/* Mission, Vision, Values */}
      <section className="py-16 px-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {[
          { title: "Our Mission", desc: "To bridge the gap between job seekers and employers with innovation.", color: "blue-400" },
          { title: "Our Vision", desc: "To be the most trusted job portal for career growth.", color: "purple-400" },
          { title: "Our Values", desc: "Integrity, innovation, and excellence drive us forward.", color: "green-400" },
        ].map((item, index) => (
          <motion.div 
            key={index}
            className={`bg-white/10 ${isLoggedIn ? "bg-gray-100 text-gray-900" : "text-white"} 
              backdrop-blur-lg p-6 rounded-xl shadow-lg text-center border border-${item.color}`}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className={`text-2xl font-semibold text-${item.color}`}>{item.title}</h3>
            <p className="mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Team Section */}
      <section>
        <Team />
      </section>

      {/* Conditional CTA or Footer */}
      {isLoggedIn ? (
        <Footer />
      ) : (
        <motion.section 
          className="py-20 bg-gray-900 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-semibold text-white">Join Us Today!</h2>
          <p className="mt-2">
            Create your profile and start your journey towards a brighter career.
          </p>
          <button onClick={() => navigate("/login")} className="mt-5 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
            Get Started
          </button>
        </motion.section>
      )}

    </div>
  );
};

export default About;
