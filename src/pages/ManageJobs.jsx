import { useState } from "react";
import { motion } from "framer-motion";
import jobData from "../components/job/jobData";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/footer";

const ManageJobs = () => {
    const [jobs, setJobs] = useState([jobData]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate()
    // Handle Job Deletion
    const deleteJob = (id) => {
        const updatedJobs = jobs.filter((job) => job.id !== id);
        setJobs(updatedJobs);
    };

    // Handle Search
    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <div className="flex flex-col mt-15 items-center min-h-screen bg-gray-100 p-8">
                <motion.div
                    className="w-full max-w-6xl p-6 bg-white shadow-lg rounded-lg"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Manage Jobs</h2>

                    {/* Search Bar */}
                    <div className="flex justify-between mb-6">
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="w-full p-3 border rounded-md shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Jobs Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="p-4 text-left">Job Title</th>
                                    <th className="p-4 text-left">Company</th>
                                    <th className="p-4 text-left">Location</th>
                                    <th className="p-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredJobs.length > 0 ? (
                                    filteredJobs.map((job) => (
                                        <motion.tr
                                            key={job.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="p-4">{job.title}</td>
                                            <td className="p-4 flex items-center gap-2">
                                                <img src={job.companyLogo} alt="logo" className="w-8 h-8 rounded-full" />
                                                {job.company}
                                            </td>
                                            <td className="p-4">{job.location}</td>
                                            <td className="p-4 flex gap-2">
                                                <button
                                                    onClick={() => navigate("/employer/edit-job")}
                                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteJob(job.id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center p-6 text-gray-500">
                                            No jobs found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default ManageJobs;
