import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/footer";
import JobCategories from "../components/Landing/JobCategories"
import { FaSearch, FaFilter, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Typewriter } from 'react-simple-typewriter'

const Job = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  const scrollRef = useRef(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    setJobs([
      { id: 1, title: "Frontend Developer", company: "Google", location: "New York", category: "IT & Software", gradient: "from-blue-500 to-indigo-500" },
      { id: 2, title: "Digital Marketer", company: "Amazon", location: "San Francisco", category: "Marketing & Sales", gradient: "from-purple-500 to-pink-500" },
      { id: 3, title: "Financial Analyst", company: "Tesla", location: "London", category: "Finance & Accounting", gradient: "from-green-500 to-teal-500" },
      { id: 4, title: "Nurse", company: "Mayo Clinic", location: "Berlin", category: "Healthcare", gradient: "from-orange-500 to-red-500" },
      { id: 5, title: "Mechanical Engineer", company: "Boeing", location: "Seattle", category: "Engineering", gradient: "from-yellow-500 to-orange-500" },
    ]);
  }, []);

  useEffect(() => {
    setFilteredJobs(
      jobs.filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, jobs]);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-6 py-16 ml-8 mt-10">
        {/* Left Side - Heading, Description, and Search */}
        <motion.div
          className="w-full max-w-[800px] lg:w-[55%] relative 2xl:left-150"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
            <Typewriter
              words={['Discover Your Dream Job']}
              typeSpeed={30}
            />
          </h1>
          <p className="text-md sm:text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            Find opportunities that align with your skills, values, and career goals.
          </p>

          {/* Search Bar + Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-grow items-center border rounded-lg px-3 py-2 shadow-sm bg-gray-100 hover:shadow-md transition-all">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search jobs or companies..."
                className="bg-transparent outline-none w-full text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-5 py-2 flex items-center justify-center bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all text-sm">
              <FaFilter className="mr-2" /> Filters
            </button>
          </div>
        </motion.div>

        {/* Right Side - Image or Illustration */}
        <div className="w-full lg:w-[45%]">
          <img
            loading="lazy"
            src="https://d8it4huxumps7.cloudfront.net/uploads/images/67c821501ca0d_jobs_header_img.png?d=1000x600"
            alt="Job search illustration"
            className="w-full max-w-[500px] mx-auto lg:mx-0"
          />
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-6xl mx-auto px-6 py-10 relative">
        <h2 className="text-3xl font-bold mb-6">Latest Job Openings</h2>
        <div className="relative">
          <button className="absolute -left-10 top-[45%] hover:bg-gray-300 cursor-pointer transform -translate-y-1/2 p-3 bg-white shadow-lg rounded-full" onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })}>
            <FaChevronLeft className="text-gray-600" />
          </button>
          <div ref={scrollRef} className="flex overflow-x-auto space-x-6 pb-4 scroll-smooth snap-x no-scrollbar [&::-webkit-scrollbar]:w-2">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`p-6 rounded-xl shadow-lg bg-gradient-to-br ${job.gradient} text-white w-80 min-w-[320px] snap-center`}
              >
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-white/80">{job.company}</p>
                <p className="text-white/70">{job.location}</p>
                <button className="mt-4 px-4 py-2 cursor-pointer bg-white text-blue-700 rounded-lg hover:bg-gray-200 transition">Apply Now</button>
              </div>
            ))}
          </div>
          <button className="absolute -right-10 top-[45%] hover:bg-gray-300 transform -translate-y-1/2 p-3 bg-white shadow-lg rounded-full" onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })}>
            <FaChevronRight className="text-gray-600" />
          </button>
        </div>
        <JobCategories />
      </div>
      <Footer />
    </div>
  );
};

export default Job;
