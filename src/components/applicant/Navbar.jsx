import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import { FaSearch, FaBell, FaCommentDots, FaBars, FaTimes } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const location = useLocation();
  const isApplicant = location.pathname.startsWith("/applicant");
  const isEmployer = location.pathname.startsWith("/employer");

  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown-container")) {
      setIsOpen(false);
    }
  };

  useState(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          <Link to="/">JobPortal</Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/applicant/home" className="hover:text-blue-900 transition">Home</Link></li>
          <li><Link to="/jobs" className="hover:text-blue-500 transition">Jobs</Link></li>
          <li><Link to="/about" className="hover:text-blue-500 transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500 transition">Contact</Link></li>

          {isApplicant && (
            <>
              <li><Link to="/applicant/dashboard" className="hover:text-blue-500 transition">Dashboard</Link></li>
              <li><Link to="/applicant/saved-jobs" className="hover:text-blue-500 transition">Saved Jobs</Link></li>
              <li><Link to="/applicant/applied-jobs" className="hover:text-blue-500 transition">Applied Jobs</Link></li>
            </>
          )}

          {isEmployer && (
            <>
              <li><Link to="/employer/dashboard" className="hover:text-blue-500 transition">Dashboard</Link></li>
              <li><Link to="/employer/post-job" className="hover:text-blue-500 transition">Post Job</Link></li>
              <li><Link to="/employer/manage-jobs" className="hover:text-blue-500 transition">Manage Jobs</Link></li>
            </>
          )}
        </ul>

        {/* Right Section: Search, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-md w-48">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 bg-transparent focus:outline-none w-full"
            />
          </div>

          {/* Icons */}
          <Link to="/messages" className="text-gray-700 text-xl hover:text-blue-500">
            <FaCommentDots />
          </Link>
          <Link to="/notifications" className="text-gray-700 text-xl hover:text-blue-500">
            <FaBell />
          </Link>

          {/* Profile Dropdown */}
          <div className="relative cursor-pointer dropdown-container">
            {/* User Icon Button */}
            <button
              onClick={toggleDropdown}
              aria-label="User Menu"
              className="text-gray-700 text-xl cursor-pointer hover:text-blue-500 focus:outline-none"
            >
              <FaRegCircleUser className="mt-1" />
            </button>

            {/* Dropdown Menu (Visible When isOpen is True) */}
            {isOpen && (
              <div className="absolute right-0 bg-white shadow-lg rounded-lg mt-2 w-40 transition-all duration-200">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:text-blue-600 px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-150"
                >
                  <FaRegCircleUser />Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center hover:text-red-600 gap-2 px-4 cursor-pointer py-2 text-gray-700 hover:bg-gray-100 transition duration-150"
                >
                  <PiSignOut />Logout
                </button>
              </div>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-2xl text-gray-700">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-white shadow-lg transform ${menuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} className="text-2xl text-gray-700">
            <FaTimes />
          </button>
        </div>

        <ul className="px-6 space-y-4 text-gray-700 font-medium">
          <li><Link to="/" className="block hover:text-blue-500">Home</Link></li>
          <li><Link to="/jobs" className="block hover:text-blue-500">Jobs</Link></li>
          <li><Link to="/about" className="block hover:text-blue-500">About</Link></li>
          <li><Link to="/contact" className="block hover:text-blue-500">Contact</Link></li>

          {isApplicant && (
            <>
              <li><Link to="/applicant/dashboard" className="block hover:text-blue-500">Dashboard</Link></li>
              <li><Link to="/applicant/saved-jobs" className="block hover:text-blue-500">Saved Jobs</Link></li>
              <li><Link to="/applicant/applied-jobs" className="block hover:text-blue-500">Applied Jobs</Link></li>
            </>
          )}

          {isEmployer && (
            <>
              <li><Link to="/employer/dashboard" className="block hover:text-blue-500">Dashboard</Link></li>
              <li><Link to="/employer/post-job" className="block hover:text-blue-500">Post Job</Link></li>
              <li><Link to="/employer/manage-jobs" className="block hover:text-blue-500">Manage Jobs</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
