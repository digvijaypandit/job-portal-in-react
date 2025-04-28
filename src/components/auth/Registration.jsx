import { useState, useRef } from "react"; 
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEmployer, setIsEmployer] = useState(false);
  const [error, setError] = useState(""); // For error messages
  const [loading, setLoading] = useState(false); // For submit button state

  const userType = isEmployer ? "Employer" : "Applicant";

  const fieldNames = [
    "firstName", "lastName", "email", "password", "contactNumber",
    "country", "state", "city", "street", "pinCode"
  ];

  const [formData, setFormData] = useState(
    Object.fromEntries(fieldNames.map((key) => [key, ""]))
  );

  const inputRefs = useRef({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when typing
  };

  const handleRegister = async () => {
    for (let field of fieldNames) {
      if (!formData[field]) {
        const fieldLabel = field.replace(/([A-Z])/g, " $1").trim();
        setError(`${fieldLabel} is required.`);
        alert(`${fieldLabel} is required.`);
        inputRefs.current[field]?.focus();
        return;
      }
    }

    try {
      setLoading(true);
      setError("");

      // Common data with only role as a string, no endpoint here
      const commonData = {
        ...formData,
        role: isEmployer ? "Employer" : "Employee", // Send the role as a string
      };

      const employeeExtras = {
        registerDate: new Date().toISOString(),
        employeeScore: 85,
      };

      const finalData = isEmployer ? commonData : { ...commonData, ...employeeExtras };

      // Dispatch the action to register user (no endpoint needed)
      await dispatch(registerUser({ formData: finalData })).unwrap();

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      const message = err || "Registration failed. Please try again.";
      setError(message);
      alert(`⚠️ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 px-4">
      <div className="bg-white rounded-lg shadow-xl flex w-full max-w-8xl h-[90%] overflow-hidden">
        {/* Right: Illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-4 bg-gray-100">
          <img
            src="https://img.freepik.com/free-vector/code-typing-concept-illustration_114360-4296.jpg"
            alt="Illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Left: Registration Form */}
        <div className="w-full md:w-2/3 p-6 flex flex-col justify-center">
          {/* Role Toggle */}
          <div className="flex flex-col items-center mb-6 w-full px-2">
            <div
              className="flex justify-between w-full max-w-sm px-1 py-1 bg-gray-200 rounded-full shadow-inner cursor-pointer transition-colors"
              onClick={() => setIsEmployer(!isEmployer)}
              role="switch"
              aria-checked={isEmployer}
              title="Click to switch between Applicant and Employer"
            >
              <div
                className={`w-1/2 text-center text-sm font-semibold py-2 rounded-full transition-all duration-300 ${
                  !isEmployer ? "bg-blue-500 text-white" : "text-gray-500"
                }`}
              >
                Applicant
              </div>
              <div
                className={`w-1/2 text-center text-sm font-semibold py-2 rounded-full transition-all duration-300 ${
                  isEmployer ? "bg-purple-600 text-white" : "text-gray-500"
                }`}
              >
                Employer
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-2 text-center">
              Select your role to see the right form.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Create {userType} Account
          </h2>
          <p className="text-gray-500 text-xs text-center mt-1">
            Fill in your details to get started.
          </p>

          {/* Error Display */}
          {error && (
            <p className="text-red-600 text-sm text-center mt-2 mb-2">{error}</p>
          )}

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {fieldNames.map((field) => (
              <input
                key={field}
                ref={(el) => (inputRefs.current[field] = el)}
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                value={formData[field]}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
            ))}
          </div>

          {/* Register Button */}
          <motion.button
            onClick={handleRegister}
            className="w-full p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg mt-4 shadow-md hover:opacity-90 transition text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            whileHover={!loading ? { scale: 1.03 } : {}}
            disabled={loading}
          >
            {loading ? "Registering..." : `Register as ${userType}`}
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
