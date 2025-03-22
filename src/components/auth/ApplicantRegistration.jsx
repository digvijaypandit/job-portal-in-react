import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Determine user type from URL
  const isEmployer = location.pathname.includes("employer");
  const userType = isEmployer ? "Employer" : "Employee";

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactNumber: "",
    country: "",
    state: "",
    city: "",
    street: "",
    pinCode: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Registration
  const handleRegister = async () => {
    try {
      const endpoint = isEmployer ? "/employers/register" : "/employees/register";
      await dispatch(registerUser({ endpoint, formData })).unwrap();
      navigate("/login"); // Redirect on success
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden px-4">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-black to-purple-900"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      {/* Glassmorphic Container */}
      <motion.div
        className="relative flex flex-wrap md:flex-nowrap w-full max-w-7xl bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-10 shadow-2xl border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Left: Registration Info */}
        <motion.div
          className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="text-4xl font-extrabold text-white">Create Your {userType} Account</h2>
          <p className="text-gray-300 mt-4 text-lg">
            Start your journey today! Fill in your details below.
          </p>
          <p className="text-gray-400 mt-6">
            Already registered?{" "}
            <span className="text-purple-400 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
              Sign In
            </span>
          </p>
        </motion.div>

        {/* Right: Registration Form */}
        <motion.div
          className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-center md:text-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Sign Up</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["firstName", "lastName", "email", "password", "contactNumber", "country", "state", "city", "street", "pinCode"].map((field, index) => (
              <input
                key={field}
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1").trim()} // Format field names
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 bg-white/20 text-white rounded-lg outline-none border border-transparent focus:border-purple-400"
              />
            ))}
          </div>

          {/* Register Button */}
          <motion.button
            className="w-full p-3 mt-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-lg shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(128, 0, 128, 0.7)" }}
            transition={{ duration: 0.3 }}
            onClick={handleRegister}
          >
            Register as {userType}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegistrationPage;
