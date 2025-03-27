import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-white py-10 px-6 md:px-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left: Logo & Description */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Job Portal</h2>
          <p className="text-gray-400 mt-2">Find your dream job with us!</p>
        </div>

        {/* Center: Navigation Links */}
        <div className="mt-6 md:mt-0 flex flex-wrap justify-center md:justify-start gap-6">
          {["Home", "Jobs", "About", "Contact"].map((item, index) => (
            <motion.a
              key={index}
              href={item}
              className="text-gray-300 hover:text-white transition"
              whileHover={{ scale: 1.1 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Right: Social Media Icons */}
        <div className="mt-6 md:mt-0 flex space-x-4">
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
            <motion.a
              key={index}
              href="/"
              className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full text-white hover:bg-blue-500 transition"
              whileHover={{ scale: 1.2 }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Job Portal. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
