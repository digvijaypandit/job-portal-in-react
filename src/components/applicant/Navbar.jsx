import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/applicant/home" },
    { name: "Jobs", path: "/jobs" },
    { name: "Resources", path: "/resources" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full bg-white bg-opacity-30 backdrop-blur-md shadow-md z-50"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link to="/applicant/home" className="text-xl font-bold text-gray-900">
              JobPortal
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition duration-200 ${
                  location.pathname === link.path
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-900 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 text-gray-900 hover:text-blue-600 transition duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="sm:hidden bg-white bg-opacity-90 backdrop-blur-md shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition duration-200 ${
                  location.pathname === link.path
                    ? "text-blue-600 bg-gray-200"
                    : "text-gray-900 hover:text-blue-600 hover:bg-gray-100"
                }`}
                onClick={() => setMenuOpen(false)} // Close menu on link click
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
