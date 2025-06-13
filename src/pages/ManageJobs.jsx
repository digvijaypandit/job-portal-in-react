import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/Footer";
import JobPostForm from "./PostJobPage";

const ManageJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [jobToEdit, setJobToEdit] = useState(null);
    const navigate = useNavigate();
    const employerId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const API_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${API_URL}/job/jobs/employer/${employerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setJobs(response.data.jobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        if (employerId && token) {
            fetchJobs();
        }
    }, [employerId, token]);

    const deleteJob = async (id) => {
        try {
            await axios.delete(`${API_URL}/job/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setJobs(jobs.filter((job) => job._id !== id));
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };

    const filteredJobs = jobs.filter((job) =>
        job.jobName.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit = (job) => {
        setIsEditing(true);
        setJobToEdit(job);
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col mt-15 items-center min-h-screen bg-gray-100 p-8">
                {!isEditing ? (
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
                                                key={job._id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="border-b hover:bg-gray-50"
                                            >
                                                <td className="p-4">{job.jobName}</td>
                                                <td className="p-4 flex items-center gap-2">
                                                    <img src={`${import.meta.env.VITE_BASE_IMAGE_URL}${job.companyLogo}`} alt="logo" className="w-8 h-8 rounded-full" />
                                                    {job.companyName}
                                                </td>
                                                <td className="p-4">{job.location}</td>
                                                <td className="p-4 flex gap-2">
                                                    <Link to={`/employer/manage-jobs/edit/${job._id}`}>
                                                        <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteJob(job._id)}
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
                ) : (
                    <JobPostForm job={jobToEdit} setIsEditing={setIsEditing} />
                )}
            </div>
            <Footer />
        </>
    );
};

export default ManageJobs;
