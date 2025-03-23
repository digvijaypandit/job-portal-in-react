import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="py-20 bg-gray-900 text-white text-center">
      <motion.h2
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        📩 Contact Us
      </motion.h2>
      <p className="mt-2 text-gray-300">Have any questions? Reach out to us!</p>

      <motion.form
        onSubmit={handleSubmit}
        className="mt-10 max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white outline-none"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white outline-none"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white outline-none"
          required
        />
        <motion.button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full shadow-lg"
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(128, 0, 128, 0.7)" }}
          transition={{ duration: 0.3 }}
        >
          Send Message 🚀
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Contact;
