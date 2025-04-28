import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

function Unauthorized() {
    const navigate = useNavigate();
    return (
        <div className="relative h-screen w-screen overflow-hidden">
            {/* Full-Screen Background Image */}
            <motion.img
                // src="https://onextdigital.com/wp-content/uploads/2024/04/ERROR-401.jpg"
                src="/images/unauthorized.gif"
                alt="Lost Caveman"
                className="absolute left-[25%] w-[50%] object-cover"
                initial={{ opacity: 0.5, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            />

            {/* Centered Text and Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/20">
                {/* Message */}
                <motion.p
                    className="text-lg md:text-2xl mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Unauthorized Access!
                </motion.p>

                <p className="text-sm md:text-base text-gray-50">
                You do not have permission to access this page.
                </p>

                {/* Button to Go Home */}
                <motion.button
                    className="absolute top-[70%] mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </motion.button>
            </div>
        </div>
    );
}

export default Unauthorized;
