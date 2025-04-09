import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../comman/Navbar';

function Home() {
  return (
    <div className="min-h-screen bg-white text-black relative select-none">
      {/* Navbar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Navbar />
      </motion.div>

      {/* Hero Section */}
      <div className="absolute top-10 left-0 z-10 mt-10 pl-10 container mx-auto px-4 py-6 flex justify-between items-center">

        {/* Left Side Content */}
        <motion.div
          className="max-w-2xl"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-8xl font-bold mb-6">
            Find your dream{" "}
            <span className="bg-gradient-to-br from-[#0091ff] via-[#4952fc] to-[#9b15e8] bg-clip-text text-transparent">
              job
            </span>
          </h1>
          <p className="text-gray-600 mb-8">
            Discover thousands of job opportunities from top companies.<br />Your career starts here.
          </p>

          {/* Search Form */}
          <motion.div
            className="flex w-xl mb-12 bg-gray-200 backdrop-blur-md backdrop-saturate-150 p-2 shadow-lg rounded-full items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="bg-transparent ml-6">
              <label className="text-sm text-gray-600 mb-2">Job title</label>
              <input
                type="text"
                placeholder="Dev Ops"
                className="w-full bg-transparent focus:outline-none text-black"
              />
            </div>
            <div className="bg-transparent">
              <label className="text-sm text-gray-600 mb-2">Location</label>
              <input
                type="text"
                placeholder="Pune"
                className="w-full bg-transparent focus:outline-none text-black"
              />
            </div>
            <button className="bg-white bg-opacity-30 hover:bg-opacity-40 hover:border-gray-400 border border-gray-300 text-gray-700 cursor-pointer p-4 rounded-full transition-all duration-200 shadow-lg backdrop-blur-md hover:scale-95 active:scale-90 focus:ring focus:ring-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </motion.div>

          {/* Stats
          <div className="flex gap-16">
            <div>
              <h3 className="text-4xl font-bold text-primary">35000</h3>
              <p className="text-gray-600">Live Jobs</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary">8550+</h3>
              <p className="text-gray-600">Daily Job Post</p>
            </div>
          </div> */}
        </motion.div>

        {/* Right Side (3D Character & Animated Circles) */}
        <motion.div
          className="relative left-0 w-1/2 h-[500px] flex justify-center items-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative flex justify-center items-center min-h-screen">
            {/* Outer Circle */}
            <motion.div
              className="absolute w-[450px] h-[450px] rounded-full border-[3px] border-blue-700 opacity-40"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg bg-gradient-to-br from-blue-700 to-purple-800 rounded-full blur-3xl"></div>
            </motion.div>

            {/* Middle Circle */}
            <motion.div
              className="absolute w-[378px] h-[378px] rounded-full border-[3px] border-blue-700 opacity-50"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            {/* Inner Circle */}
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full border-[3px] border-blue-700 opacity-60"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            {/* 3D Character */}
            <motion.img
              src="/images/3d-character.png"
              alt="3D Character"
              className="relative w-[350px] drop-shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating Glass Cards */}
            <motion.div
              className="absolute top-30 -left-34 w-[180px] flex items-center gap-2 bg-opacity-10 backdrop-blur-md border border-gray-500/30 p-4 rounded-xl shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2U2akySBgSHUK-foX-9SGFmLk6zEuGYNNqw&s"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-blue-400"
              />
              <div>
                <p className="text-black font-semibold">Ratings</p>
                <div className="flex text-yellow-400">{"★".repeat(4)}{"☆".repeat(1)}</div>
              </div>
            </motion.div>

            {/* More Cards with Similar Animations */}
            <motion.div
              className="absolute top-20 w-[180px] left-50 flex items-center gap-4 bg-opacity-10 backdrop-blur-md border border-gray-500/30 p-4 rounded-xl shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-10 h-10 bg-purple-500 flex items-center justify-center rounded-lg text-black">💼</div>
              <div>
                <p className="text-lg font-semibold">56.8K</p>
                <p className="text-sm">Job vacancy</p>
              </div>
            </motion.div>
            {/* Card 3 - Job Got */}
            <motion.div className="absolute top-80 -left-24 w-[180px] flex flex-col bg-opacity-10 backdrop-blur-md border border-gray-500/30 p-4 rounded-xl shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-lg font-semibold text-black">90K+</span>
                <img
                  src="/images/morejobs.png"
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;  