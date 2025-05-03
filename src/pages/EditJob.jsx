import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/footer";
import { useNavigate } from "react-router-dom";

const EditJob = () => {
    const [job, setJob] = useState(jobData);

    const navigate = useNavigate()

    // Handle form input changes
    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    // Handle multiple selections (Skills, Responsibilities)
    const handleArrayChange = (e, key) => {
        const values = e.target.value.split("\n");
        setJob({ ...job, [key]: values });
    };

    // Handle form submission (You can send the updated data to an API)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Job Data:", job);
        alert("Job updated successfully!");
    };

    return (
        <>
            <Navbar />
            <div className="flex mt-15 justify-center items-center min-h-screen bg-gray-100 p-8">
                <motion.div
                    className="w-full max-w-5xl p-6 bg-white shadow-lg rounded-lg"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Edit Job Listing</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Job Title */}
                        <div>
                            <label className="block text-gray-700 font-medium">Job Title</label>
                            <input
                                type="text"
                                name="title"
                                value={job.title}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md shadow-sm"
                                required
                            />
                        </div>

                        {/* Company Name & Logo */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium">Company Name</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={job.company}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Company Logo URL</label>
                                <input
                                    type="text"
                                    name="companyLogo"
                                    value={job.companyLogo}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Location & Eligibility */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={job.location}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Eligibility</label>
                                <input
                                    type="text"
                                    name="eligibility"
                                    value={job.eligibility}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md shadow-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Job Description */}
                        <div>
                            <label className="block text-gray-700 font-medium">Job Description</label>
                            <textarea
                                name="description"
                                rows="4"
                                value={job.description}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md shadow-sm"
                                required
                            ></textarea>
                        </div>

                        {/* Responsibilities */}
                        <div>
                            <label className="block text-gray-700 font-medium">Key Responsibilities (One per line)</label>
                            <textarea
                                name="keyResponsibilities"
                                rows="4"
                                value={job.keyResponsibilities.join("\n")}
                                onChange={(e) => handleArrayChange(e, "keyResponsibilities")}
                                className="w-full p-3 border rounded-md shadow-sm"
                                required
                            ></textarea>
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-gray-700 font-medium">Required Skills (One per line)</label>
                            <textarea
                                name="skills"
                                rows="3"
                                value={job.skills.join("\n")}
                                onChange={(e) => handleArrayChange(e, "skills")}
                                className="w-full p-3 border rounded-md shadow-sm"
                                required
                            ></textarea>
                        </div>

                        {/* Salary & Job Type */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium">Salary</label>
                                <input
                                    type="text"
                                    name="salary"
                                    value={job.additionalInfo[0].details}
                                    onChange={(e) =>
                                        setJob({
                                            ...job,
                                            additionalInfo: job.additionalInfo.map((info, idx) =>
                                                idx === 0 ? { ...info, details: e.target.value } : info
                                            ),
                                        })
                                    }
                                    className="w-full p-3 border rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Job Type</label>
                                <input
                                    type="text"
                                    name="jobType"
                                    value={job.additionalInfo[2].details}
                                    onChange={(e) =>
                                        setJob({
                                            ...job,
                                            additionalInfo: job.additionalInfo.map((info, idx) =>
                                                idx === 2 ? { ...info, details: e.target.value } : info
                                            ),
                                        })
                                    }
                                    className="w-full p-3 border rounded-md shadow-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Contact Email & Phone */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium">Contact Email</label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={job.contact.email}
                                    onChange={(e) =>
                                        setJob({ ...job, contact: { ...job.contact, email: e.target.value } })
                                    }
                                    className="w-full p-3 border rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Contact Phone</label>
                                <input
                                    type="tel"
                                    name="contactPhone"
                                    value={job.contact.phone}
                                    onChange={(e) =>
                                        setJob({ ...job, contact: { ...job.contact, phone: e.target.value } })
                                    }
                                    className="w-full p-3 border rounded-md shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="px-6 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                                onClick={() => navigate("/employer/manage-jobs")}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default EditJob;
