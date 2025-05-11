import { useState } from "react";
import axios from "axios";
import { Plus, Trash } from "lucide-react";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobPostForm = () => {
    const initialState = {
        jobName: "",
        companyName: "",
        jobDescription: "",
        jobCategory: "",
        companyLogo: null,
        keyResponsibilities: [""],
        skills: [""],
        deadline: "",
        salary: "",
        workDetail: "",
        location: "",
        tags: [""],
        workType: "Office",
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            companyLogo: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You must be logged in to post a job.");
            return;
        }

        const form = new FormData();
        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                form.append(key, JSON.stringify(formData[key]));
            } else if (key === "companyLogo") {
                form.append("companyLogo", formData.companyLogo);
            } else {
                form.append(key, formData[key]);
            }
        }

        try {
            const res = await axios.post("http://localhost:5000/api/job/create", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Job posted successfully!");
            setFormData(initialState);
        } catch (err) {
            console.error("Submission error:", err);
            const errorMsg =
                err.response?.data?.message ||
                err.message ||
                "Something went wrong while posting the job.";
            toast.error(`${errorMsg}`);
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer position="top-right" autoClose={1500} hideProgressBar newestOnTop />
            <div className="min-h-screen mt-15 flex items-center justify-center bg-gray-100 p-6">
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Post a Job</h2>
                    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        {/* Job Name & Company Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Job Title" name="jobName" value={formData.jobName} onChange={handleChange} />
                            <InputField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
                        </div>

                        {/* Category, Logo, Salary */}
                        <div className="grid grid-cols-3 gap-4">
                            <InputField label="Job Category" name="jobCategory" value={formData.jobCategory} onChange={handleChange} />
                            <div>
                                <label className="block font-medium">Company Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full p-3 border rounded"
                                    required
                                />
                            </div>
                            <InputField label="Salary" name="salary" value={formData.salary} onChange={handleChange} />
                        </div>

                        {/* Work Type, Job Type, Deadline */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block font-medium">Work Type</label>
                                <select
                                    name="workType"
                                    className="w-full p-3 border rounded"
                                    value={formData.workType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Office">Office</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                            <InputField label="Job location" name="location" value={formData.jobType} onChange={handleChange} placeholder="e.g. Pune-India" />
                            <div>
                                <label className="block font-medium">Deadline</label>
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

                        {/* Description & Work Detail */}
                        <TextArea label="Job Description" name="jobDescription" value={formData.jobDescription} onChange={handleChange} />
                        <TextArea label="Work Details" name="workDetail" value={formData.workDetail} onChange={handleChange} />

                        {/* Arrays */}
                        <ArrayInput label="Key Responsibilities" arrayName="keyResponsibilities" data={formData} onChange={handleArrayChange} onAdd={addField} onRemove={removeField} />
                        <ArrayInput label="Skills Required" arrayName="skills" data={formData} onChange={handleArrayChange} onAdd={addField} onRemove={removeField} />
                        <ArrayInput label="Tags" arrayName="tags" data={formData} onChange={handleArrayChange} onAdd={addField} onRemove={removeField} />

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

// Reusable input field
const InputField = ({ label, name, value, onChange, placeholder }) => (
    <div>
        <label className="block font-medium">{label}</label>
        <input
            type="text"
            name={name}
            className="w-full p-3 border rounded"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
        />
    </div>
);

// Reusable textarea
const TextArea = ({ label, name, value, onChange }) => (
    <div>
        <label className="block font-medium">{label}</label>
        <textarea
            name={name}
            className="w-full p-3 border rounded h-24"
            value={value}
            onChange={onChange}
            required
        />
    </div>
);

const ArrayInput = ({ label, arrayName, data, onChange, onAdd, onRemove }) => (
    <div>
        <label className="block font-medium items-center justify-between">
            {label}
            <button type="button" onClick={() => onAdd(arrayName)} className="text-green-500 ml-2">
                <Plus className="w-5 h-5 inline" />
            </button>
        </label>
        {data[arrayName].map((item, index) => (
            <div key={index} className="flex items-center gap-2 mt-2">
                <input
                    type="text"
                    className="w-full p-3 border rounded"
                    value={item}
                    onChange={(e) => onChange(index, e.target.value, arrayName)}
                />
                {index > 0 && (
                    <button type="button" onClick={() => onRemove(index, arrayName)} className="text-red-500">
                        <Trash className="w-5 h-5" />
                    </button>
                )}
            </div>
        ))}
    </div>
);

export default JobPostForm;
