import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // User type state
  const [isEmployer, setIsEmployer] = useState(false);
  const userType = isEmployer ? "Employer" : "Applicant";

  // Form state
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

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle registration
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
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 px-4">
      {/* Card */}
      <div className="bg-white rounded-lg shadow-xl flex w-full max-w-8xl h-[90%] overflow-hidden">
        {/* Right: Illustration (Hidden on Small Screens) */}
        <div className="hidden md:flex w-1/2 tems-center justify-center p-4 bg-gray-100">
          <img
            src="https://img.freepik.com/free-vector/code-typing-concept-illustration_114360-4296.jpg"
            alt="Illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Left: Registration Form */}
        <div className="w-full md:w-2/3 p-6 flex flex-col justify-center">
          {/* Toggle Switch (Smaller) */}
          <div className="flex items-center justify-center mb-4">
            <div
              className={`relative flex w-40 h-10 rounded-full transition bg-gray-300 shadow cursor-pointer 
                ${isEmployer ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gray-300"}`}
              onClick={() => setIsEmployer(!isEmployer)}
            >
              <span
                className={`absolute left-1 top-1 w-18 h-8 flex items-center justify-center font-semibold 
                  rounded-full transition-all duration-300 ease-in-out shadow ${
                    isEmployer ? "translate-x-[105%] bg-white text-black" : "bg-blue-500 text-white"
                  }`}
              >
                {isEmployer ? "Employer" : "Applicant"}
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center">Create {userType} Account</h2>
          <p className="text-gray-500 text-xs text-center mt-1">Fill in your details to get started.</p>

          {/* Input Fields (Smaller) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {["firstName", "lastName", "email", "password", "contactNumber", "country", "state", "city", "street", "pinCode"].map((field) => (
              <input
                key={field}
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1").trim()} // Format field names
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
            ))}
          </div>

          {/* Register Button */}
          <motion.button
            onClick={handleRegister}
            className="w-full p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg mt-4 shadow-md hover:opacity-90 transition text-sm"
            whileHover={{ scale: 1.03 }}
          >
            Register as {userType}
          </motion.button>

          {/* Navigation Buttons */}
          <div className="flex flex-col md:flex-row justify-between mt-4 space-y-3 md:space-y-0 md:space-x-3">
            <button
              onClick={() => navigate("/login")}
              className="w-full md:w-auto px-4 py-1 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition text-sm text-black"
            >
              Already have an account? Sign In
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full md:w-auto px-4 py-1 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition text-sm text-black"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
