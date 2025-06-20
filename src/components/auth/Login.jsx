import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.auth);
  const roles = user?.roles || [];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Refs for input focusing
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    // Validate fields
    if (!email) {
      emailRef.current?.focus();
      return;
    }
    if (!password) {
      passwordRef.current?.focus();
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      setLoginSuccess(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (loginSuccess && roles.length > 0) {
      if (roles.includes("Employer")) {
        navigate("/employer/home");
      } else if (roles.includes("Applicant")) {
        navigate("/applicant/home");
      }
    }
  }, [loginSuccess, roles, navigate]);

  // Common keydown handler
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 px-4 md:px-6">
      <div className="bg-white rounded-lg shadow-xl flex flex-col md:flex-row w-full max-w-7xl h-auto md:h-[90%] overflow-hidden">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome to Our Application
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Please login to use the platform.
          </p>

          {/* Email Input */}
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 mt-6 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500"
          />

          {/* Password Input */}
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 mt-4 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500"
          />

          {/* Remember Me */}
          <div className="flex items-center mt-4 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label>Remember Me</label>
          </div>

          {/* Sign In Button */}
          <motion.button
            onClick={handleLogin}
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full mt-6 shadow-md hover:opacity-90 transition"
            whileHover={{ scale: 1.05 }}
          >
            {loading ? "Signing in..." : "SIGN IN"}
          </motion.button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Navigation Buttons */}
          <div className="flex flex-col md:flex-row justify-center mt-6 space-y-4 md:space-y-0 md:space-x-4">
            <button
              onClick={() => navigate("/signup")}
              className="w-full md:w-auto px-6 py-2 border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              Create Account
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full md:w-auto px-6 py-2 border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              Go Back Home
            </button>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-6 bg-gray-100">
          <img
            src="/images/login.png"
            alt="Illustration"
            className="max-w-xs md:max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
