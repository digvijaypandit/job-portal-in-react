import { motion } from "framer-motion";
import { FaLinkedin, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../components/comman/footer";
import Navbar from "../components/comman/Navbar";

const employerData = {
    name: "John Doe",
    company: "Sphinxhire.AI Private Limited",
    companyLogo:
        "https://play-lh.googleusercontent.com/FA_rzaEeLlumm0qh68q3z5Pt-PGMVPf2Z28_pbega7SaXSiKjSzh-0MZceB3FpdvQIBq",
    role: "Hiring Manager",
    location: "Pune, India",
    email: "john.doe@sphinxhire.com",
    phone: "+91 9876543210",
    linkedin: "https://linkedin.com/in/johndoe",
    website: "https://sphinxhire.com",
    description: `We at Sphinxhire.AI are committed to revolutionizing the hiring process with AI-powered recruitment solutions. Our goal is to connect top talent with the best job opportunities.`,
    postedJobs: [
        { id: 1, title: "Frontend Developer", location: "Pune", status: "Open" },
        { id: 2, title: "Backend Developer", location: "Bangalore", status: "Closed" },
        { id: 3, title: "UI/UX Designer", location: "Remote", status: "Open" }
    ]
};

const EmployerProfile = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen mt-10 bg-gradient-to-br from-blue-100 to-blue-300 flex justify-center items-center p-8">
                <motion.div
                    className="w-full max-w-4xl bg-white/90 shadow-xl backdrop-blur-lg rounded-xl p-8 border border-gray-300"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header Section */}
                    <div className="flex items-center space-x-6 border-b pb-4">
                        <img
                            src={employerData.companyLogo}
                            alt="Company Logo"
                            className="w-20 h-20 rounded-full border shadow-lg"
                        />
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">{employerData.name}</h2>
                            <p className="text-gray-700">{employerData.role} at {employerData.company}</p>
                            <p className="text-gray-500 flex items-center gap-1">
                                <FaMapMarkerAlt className="text-blue-500" /> {employerData.location}
                            </p>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-2 gap-4 mt-6 text-gray-700">
                        <div className="flex items-center gap-2">
                            <FaEnvelope className="text-blue-500" />
                            <span>{employerData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaPhone className="text-blue-500" />
                            <span>{employerData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaLinkedin className="text-blue-500" />
                            <a href={employerData.linkedin} target="_blank" className="hover:underline">
                                LinkedIn Profile
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaGlobe className="text-blue-500" />
                            <a href={employerData.website} target="_blank" className="hover:underline">
                                Company Website
                            </a>
                        </div>
                    </div>

                    {/* Company Overview */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-900">Company Overview</h3>
                        <p className="text-gray-700 mt-2">{employerData.description}</p>
                    </div>

                    {/* Posted Jobs */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-900">Posted Jobs</h3>
                        <div className="mt-3 space-y-3">
                            {employerData.postedJobs.map((job) => (
                                <motion.div
                                    key={job.id}
                                    className="p-4 bg-white rounded-lg shadow-lg flex justify-between items-center border border-gray-200"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div>
                                        <h4 className="font-medium text-gray-900">{job.title}</h4>
                                        <p className="text-gray-600">{job.location}</p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${job.status === "Open" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
                                            }`}
                                    >
                                        {job.status}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Call-to-Action */}
                    <motion.button
                        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                    >
                        Post a New Job
                    </motion.button>
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default EmployerProfile;
