import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Load the 3D model
const GlobeModel = () => {
  const { scene } = useGLTF("/models/3D_Map.glb");
  return <primitive object={scene} scale={2} />;
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen select-none flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Login & Signup Buttons (Top Right) */}
      <div className="absolute z-10 top-6 right-6 flex gap-4">
        <motion.button
          onClick={() => navigate("/login")}
          className="px-5 py-2 border border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-600 hover:text-white transition duration-300"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Login
        </motion.button>
        <motion.button
          onClick={() => navigate("/login")}
          className="px-5 py-2 bg-gradient-to-r from-purple-400 to-blue-500 text-white font-semibold rounded-full hover:opacity-90 transition duration-300"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Sign Up
        </motion.button>
      </div>

      {/* 3D Globe */}
      <Canvas>
        <OrbitControls autoRotate autoRotateSpeed={0.3} enableZoom={false} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <GlobeModel />
      </Canvas>

      {/* Hero Content */}
      <motion.div
        className="absolute text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Title with Typewriter Effect */}
        <h1 className="text-5xl font-bold cursor-context-menu select-none">
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent select-text">
            <Typewriter
              words={[
                "Explore Global Job Opportunities",
                "Your Dream Job Awaits!",
                "Start Your Journey Today!",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </span>
        </h1>

        <motion.p
          className="mt-4 text-lg text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          Find your dream job anywhere in the world!
        </motion.p>

        <motion.button
          onClick={() => navigate("/login")}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-500 text-white font-bold rounded-full shadow-lg"
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(128, 0, 128, 0.7)" }}
          transition={{ duration: 0.3 }}
        >
          Get Started 🚀
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;
