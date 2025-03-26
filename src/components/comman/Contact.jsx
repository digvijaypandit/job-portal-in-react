import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../footer";

const Contact = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!formData.message) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      alert("Message sent successfully! 🚀");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div 
      className={`transition-colors duration-500 ${
        isLoggedIn ? "bg-white text-gray-900" : "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
      } min-h-screen`}
    >

      {/* Navbar or Auth Buttons */}
      {isLoggedIn ? (
        <Navbar /> // Show Navbar when logged in
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
          Contact Us
        </h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          Got questions? We'd love to hear from you! Reach out using the form below.
        </p>
      </motion.section>

      {/* Contact Form Section */}
      <section className="py-16 px-5 max-w-4xl mx-auto">
        <motion.form 
          className={`bg-white/10 ${isLoggedIn ? "bg-gray-100 text-gray-900" : "text-white"} 
            backdrop-blur-lg p-8 rounded-xl shadow-lg`}
          onSubmit={handleSubmit}
          whileHover={{ scale: 1.02 }}
        >
          <div className="mb-5">
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-5">
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-5">
            <label className="block font-semibold">Message</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </motion.form>
      </section>

      {/* Google Maps Embed */}
      <section className="py-10 px-5 text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">
          Our Location
        </h2>
        <div className="mt-5 rounded-lg overflow-hidden">
          <iframe 
            className="w-full h-96 rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3759.1685986533175!2d74.4454501!3d19.577276299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcf718c19438bf%3A0x5e594af737b22649!2sPravara%20Rural%20Engineering%20College!5e0!3m2!1sen!2sin!4v1743007731601!5m2!1sen!2sin" 
            allowFullScreen="" 
            loading="lazy"
          />
        </div>
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
          <h2 className="text-3xl font-semibold text-white">Stay Connected</h2>
          <p className="mt-2">
            Get in touch with us to explore career opportunities.
          </p>
          <button className="mt-5 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
            Contact Us
          </button>
        </motion.section>
      )}
    </div>
  );
};

export default Contact;
