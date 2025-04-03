import React from 'react';
import { Canvas } from '@react-three/fiber';
import Sphere from './Sphere';
import Navbar from '../comman/Navbar'
import { Typewriter } from 'react-simple-typewriter'

function Home() {
  return (
    <div className="min-h-screen bg-white text-black relative select-none">
      <div className="w-1/2 h-[500px] flex justify-center items-center">
        <Canvas className="w-full h-full">
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Sphere />
        </Canvas>
      </div>

      {/* navbar */}
      <Navbar />

      {/* Content for Hero Section */}
      <div className="absolute top-10 left-0 z-10 mt-10 pl-10 container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="max-w-2xl">
          <h1 className="text-8xl font-bold mb-6">
            Find your dream <span className="bg-gradient-to-br from-[#0091ff] via-[#4952fc] to-[#9b15e8] bg-clip-text text-transparent">job</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Discover thousands of job opportunities from top companies.<br />Your career starts here.
          </p>

          {/* Search Form */}
          <div className="flex w-xl mb-12 bg-gray-200 backdrop-blur-md backdrop-saturate-150 p-2 shadow-lg rounded-full items-center justify-center">
            <div className="bg-transparent ml-6">
              <label className="text-sm text-gray-600 mb-2">Job title</label>
              <input
                type="text"
                placeholder="UI/UX Designer"
                className="w-full bg-transparent focus:outline-none text-black"
              />
            </div>
            <div className="bg-transparent">
              <label className="text-sm text-gray-600 mb-2">Location</label>
              <input
                type="text"
                placeholder="New York"
                className="w-full bg-transparent focus:outline-none text-black"
              />
            </div>
            <button className="bg-white bg-opacity-30 hover:bg-opacity-40 hover:border-gray-400 border border-gray-300 text-gray-700 cursor-pointer p-4 rounded-full transition-all duration-200 shadow-lg backdrop-blur-md hover:scale-95 active:scale-90 focus:ring focus:ring-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-16">
            <div>
              <h3 className="text-4xl font-bold text-primary">35000</h3>
              <p className="text-gray-600">Live Jobs</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary">8550+</h3>
              <p className="text-gray-600">Daily Job Post</p>
            </div>
          </div>
        </div>

        {/* Right Side Stats */}
        <div className="relative left-0 w-1/2 h-[500px] flex justify-center items-center">
            <div className="relative flex justify-center items-center min-h-screen">
              {/* Outer Circle */}
              <div className="absolute w-[400px] h-[400px] rounded-full border-[3px] border-blue-500 opacity-40"></div>

              {/* Middle Circle */}
              <div className="absolute w-[300px] h-[300px] rounded-full border-[3px] border-purple-500 opacity-50"></div>

              {/* Inner Circle */}
              <div className="absolute w-[200px] h-[200px] rounded-full border-[3px] border-pink-500 opacity-60"></div>

              {/* Character Image (Placeholder) */}
              <img
                src="/images/3d-character.png"
                alt="3D Character"
                className="relative w-[250px] drop-shadow-xl"
              />  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
