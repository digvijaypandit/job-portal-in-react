import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      console.log("Login Success:", result);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error); // Show actual error
    }
  };
  

  return (
    <div className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden px-4">
      {/* Animated Background - Moves from Left to Right */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-900 via-black to-blue-900"
        animate={{ backgroundPositionX: ["-100%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      {/* Responsive Glassmorphic Container */}
      <motion.div
        className="relative flex flex-wrap md:flex-nowrap w-full max-w-7xl bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-10 shadow-2xl border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Left: Login Form */}
        <motion.div
          className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Sign In</h2>
          <p className="text-gray-300 mb-6">Enter your credentials below.</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full p-3 mb-4 bg-white/20 text-white rounded-lg outline-none border border-transparent focus:border-purple-400"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-white/20 text-white rounded-lg outline-none border border-transparent focus:border-purple-400"
          />
          <motion.button
            className="w-full p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-lg mt-4 shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(128, 0, 128, 0.7)" }}
            transition={{ duration: 0.3 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
          {error && <p className="text-red-400 mt-2">{error}</p>}
          <p className="text-sm text-gray-400 mt-3 cursor-pointer hover:text-white transition">
            Forgot password?
          </p>
        </motion.div>

        {/* Center: Animated Image (Visible only on lg screens) */}
        <motion.div
          className="hidden lg:flex items-center justify-center w-full max-w-[400px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <img
            src="/images/Login_animation.gif"
            alt="Login Animation"
            className="w-full h-auto select-none object-cover"
          />
        </motion.div>

        {/* Right: Welcome Message */}
        <motion.div
          className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center text-center md:text-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">Welcome Back!</h2>
          <p className="text-gray-300 mt-4">New here? Choose your role and register now:</p>
          <div className="mt-6">
            <motion.button
              onClick={() => navigate("/register-applicant")}
              className="w-full p-3 border border-purple-400 text-white rounded-lg mb-3 hover:bg-purple-600 transition"
            >
              Register as Applicant
            </motion.button>
            <motion.button
              onClick={() => navigate("/register-employer")}
              className="w-full p-3 border border-blue-400 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Register as Employer
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
