import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import { FaSearch, FaBell, FaCommentDots, FaBars, FaTimes } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];
  const isApplicant = storedRoles.includes("ROLE_EMPLOYEE");
  const isEmployer = storedRoles.includes("ROLE_EMPLOYER");

  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown-container")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          {user ? (
            <>
              {isApplicant && <Link to="/applicant/home">JobPortal</Link>}
              {isEmployer && <Link to="/employer/home">JobPortal</Link>}
            </>
          ) : (
            <Link to="/">JobPortal</Link>
          )}
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-6 text-gray-700 font-medium">
          {user ? (
            <>
              {isApplicant && (
                <>
                  <li><Link to="/applicant/home" className="block hover:text-blue-500">Home</Link></li>
                  <li><Link to="/applicant/jobs" className="block hover:text-blue-500">Jobs</Link></li>
                  <li><Link to="/about" className="block hover:text-blue-500">About</Link></li>
                  <li><Link to="/applicant/dashboard" className="block hover:text-blue-500">Dashboard</Link></li>
                  <li><Link to="/applicant/saved-jobs" className="block hover:text-blue-500">Saved Jobs</Link></li>
                  <li><Link to="/applicant/applied-jobs" className="block hover:text-blue-500">Applied Jobs</Link></li>
                </>
              )}
              {isEmployer && (
                <>
                  <li><Link to="/employer/home" className="block hover:text-blue-500">Home</Link></li>
                  <li><Link to="/about" className="block hover:text-blue-500">About</Link></li>
                  <li><Link to="/employer/dashboard" className="block hover:text-blue-500">Dashboard</Link></li>
                  <li><Link to="/employer/post-job" className="block hover:text-blue-500">Post Job</Link></li>
                  <li><Link to="/employer/manage-jobs" className="block hover:text-blue-500">Manage Jobs</Link></li>
                </>
              )}
            </>
          ) : (
            <>
              <li><Link to="/" className="block hover:text-blue-500">Home</Link></li>
              <li><Link to="/jobs" className="block hover:text-blue-500">Jobs</Link></li>
              <li><Link to="/about" className="block hover:text-blue-500">About</Link></li>
              <li><Link to="/contact" className="block hover:text-blue-500">Contact</Link></li>
              <li><Link to="/login" className="block hover:text-blue-500">Login</Link></li>
              <li><Link to="/signup" className="block hover:text-blue-500">Sign Up</Link></li>
            </>
          )}
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-md w-48">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 bg-transparent focus:outline-none w-full"
            />
          </div>

          {user ? (
            <>
              <Link to="/messages" className="text-gray-700 text-xl hover:text-blue-500">
                <FaCommentDots />
              </Link>
              <Link to="/notifications" className="text-gray-700 text-xl hover:text-blue-500">
                <FaBell />
              </Link>
              {/* Profile Dropdown */}
              <div className="relative cursor-pointer dropdown-container">
                <button
                  onClick={toggleDropdown}
                  aria-label="User Menu"
                  className="text-gray-700 text-xl hover:text-blue-500 focus:outline-none"
                >
                  <FaRegCircleUser className="mt-1" />
                </button>
                {isOpen && (
                  <div className="absolute right-0 bg-white shadow-lg rounded-lg mt-2 w-40">
                    <Link
                      to={isApplicant ? "/applicant/profile" : "/employer/profile"}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
                    >
                      <FaRegCircleUser /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition"
                    >
                      <PiSignOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 text-lg hover:text-blue-500">Login</Link>
              <Link to="/signup" className="text-gray-700 text-lg hover:text-blue-500">Sign Up</Link>
            </>
          )}

          {/* Mobile Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-2xl text-gray-700">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-white shadow-lg transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} className="text-2xl text-gray-700">
            <FaTimes />
          </button>
        </div>

        <ul className="px-6 space-y-4 text-gray-700 font-medium">
          {user ? (
            <>
              {isApplicant && (
                <>
                  <li><Link to="/applicant/home" className="block hover:text-blue-500">Home</Link></li>
                  <li><Link to="/applicant/jobs" className="block hover:text-blue-500">Jobs</Link></li>
                  <li><Link to="/about" className="block hover:text-blue-500">About</Link></li>
                  <li><Link to="/applicant/dashboard" className="block hover:text-blue-500">Dashboard</Link></li>
                  <li><Link to="/applicant/saved-jobs" className="block hover:text-blue-500">Saved Jobs</Link></li>
                  <li><Link to="/applicant/applied-jobs" className="block hover:text-blue-500">Applied Jobs</Link></li>
                </>
              )}
              {isEmployer && (
                <>
                  <li><Link to="/employer/home" className="block hover:text-blue-500">Home</Link></li>
                  <li><Link to="/about" className="block hover:text-blue-500">About</Link></li>
                  <li><Link to="/employer/dashboard" className="block hover:text-blue-500">Dashboard</Link></li>
                  <li><Link to="/employer/post-job" className="block hover:text-blue-500">Post Job</Link></li>
                  <li><Link to="/employer/manage-jobs" className="block hover:text-blue-500">Manage Jobs</Link></li>
                </>
              )}
              <button onClick={handleLogout} className="block w-full text-left hover:text-red-600">Logout</button>
            </>
          ) : (
            <>
              <li><Link to="/" className="block hover:text-blue-500">Home</Link></li>
              <li><Link to="/jobs" className="block hover:text-blue-500">Jobs</Link></li>
              <li><Link to="/about" className="block hover:text-blue-500">About</Link></li>
              <li><Link to="/contact" className="block hover:text-blue-500">Contact</Link></li>
              <li><Link to="/login" className="block hover:text-blue-500">Login</Link></li>
              <li><Link to="/signup" className="block hover:text-blue-500">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
