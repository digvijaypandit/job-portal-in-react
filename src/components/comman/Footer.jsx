import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const { user } = useSelector((state) => state.auth);
  const roles = user?.roles || [];
  const isApplicant = roles.includes("Applicant");
  const isEmployer = roles.includes("Employer");

  const getLinks = () => {
    if (isApplicant) {
      return [
        { label: "Home", path: "/applicant/home" },
        { label: "Jobs", path: "/applicant/jobs" },
        { label: "Dashboard", path: "/applicant/dashboard" },
        { label: "Saved Jobs", path: "/applicant/saved-jobs" },
        { label: "Applied Jobs", path: "/applicant/applied-jobs" },
      ];
    }
    if (isEmployer) {
      return [
        { label: "Home", path: "/employer/home" },
        { label: "Dashboard", path: "/employer/dashboard" },
        { label: "Post Job", path: "/employer/post-job" },
        { label: "Manage Jobs", path: "/employer/manage-jobs" },
      ];
    }
    return [
      { label: "Home", path: "/" },
      { label: "Jobs", path: "/jobs" },
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact" },
    ];
  };

  return (
    <footer className="bg-gray-900 text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
        
        {/* Company Info */}
        <div className="col-span-2">
          <h2 className="text-3xl font-bold">Job Portal</h2>
          <p className="text-gray-400 mt-3 leading-relaxed">
            Find your dream job with the most trusted job marketplace.
            Connect with top companies and kickstart your career today!
          </p>
          <p className="mt-4 text-gray-400">📧 support@jobportal.com</p>
          <p className="text-gray-400">📞 +1 (123) 456-7890</p>
        </div>

        {/* Dynamic Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2">
            {getLinks().map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            {["FAQs", "Career Tips", "Interview Guide", "Salary Calculator"].map((item, index) => (
              <li key={index}>
                <Link
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            {["Help Center", "Privacy Policy", "Terms of Service", "Report a Problem"].map((item, index) => (
              <li key={index}>
                <Link
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="col-span-2 sm:col-span-1">
          <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
          <p className="text-gray-400 mb-4">Get the latest job updates and career tips straight to your inbox.</p>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full text-gray-900 rounded-md focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-8"></div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between text-center text-gray-400 text-sm space-y-4 md:space-y-0">
        <p>© {new Date().getFullYear()} Job Portal. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white"><FaFacebookF /></a>
          <a href="#" className="hover:text-white"><FaTwitter /></a>
          <a href="#" className="hover:text-white"><FaInstagram /></a>
          <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
