import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/footer";

const JobPostForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        eligibility: "",
        description: "",
        keyResponsibilities: [""],
        skills: [""],
        additionalInfo: [{ title: "", details: "" }],
        deadline: "",
        contact: { email: "", phone: "" },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Handling nested objects like "contact.email" and "contact.phone"
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    

    const handleArrayChange = (index, value, arrayName) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) => (i === index ? value : item)),
        }));
    };

    const addField = (arrayName) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: [...prev[arrayName], ""],
        }));
    };

    const removeField = (index, arrayName) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen mt-15 flex items-center justify-center bg-gray-100 p-6">
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Post a Job</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Job Title & Company Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g. Frontend Developer"
                                    className="w-full p-3 border rounded"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Company Name</label>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="e.g. Sphinxhire.AI Private Limited"
                                    className="w-full p-3 border rounded"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Location & Deadline */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="e.g. Pune, Remote"
                                    className="w-full p-3 border rounded"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Application Deadline</label>
                                <input
                                    type="datetime-local"
                                    name="deadline"
                                    className="w-full p-3 border rounded"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block font-medium">Job Description</label>
                            <textarea
                                name="description"
                                placeholder="Write a short job description..."
                                className="w-full p-3 border rounded h-24"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        {/* Key Responsibilities */}
                        <div>
                            <label className="block font-medium flex items-center justify-between">
                                Key Responsibilities
                                <button type="button" onClick={() => addField("keyResponsibilities")} className="text-green-500">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </label>
                            {formData.keyResponsibilities.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="e.g. Develop and maintain UI"
                                        className="w-full p-3 border rounded"
                                        value={item}
                                        onChange={(e) => handleArrayChange(index, e.target.value, "keyResponsibilities")}
                                    />
                                    {index > 0 && (
                                        <button type="button" onClick={() => removeField(index, "keyResponsibilities")} className="text-red-500">
                                            <Trash className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Skills Required */}
                        <div>
                            <label className="block font-medium flex items-center justify-between">
                                Skills Required
                                <button type="button" onClick={() => addField("skills")} className="text-green-500">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </label>
                            {formData.skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="e.g. React.js, JavaScript"
                                        className="w-full p-3 border rounded"
                                        value={skill}
                                        onChange={(e) => handleArrayChange(index, e.target.value, "skills")}
                                    />
                                    {index > 0 && (
                                        <button type="button" onClick={() => removeField(index, "skills")} className="text-red-500">
                                            <Trash className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Contact Email</label>
                                <input
                                    type="email"
                                    name="contact.email"
                                    placeholder="e.g. hr@company.com"
                                    className="w-full p-3 border rounded"
                                    value={formData.contact.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Contact Phone</label>
                                <input
                                    type="text"
                                    name="contact.phone"
                                    placeholder="e.g. +91 9876543210"
                                    className="w-full p-3 border rounded"
                                    value={formData.contact.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded mt-4 hover:bg-blue-600">
                            Post Job
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default JobPostForm;
