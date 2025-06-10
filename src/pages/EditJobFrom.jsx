import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/comman/footer";
import Navbar from "../components/comman/Navbar";

// Initial structure for safe fallback
const initialFormData = {
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

const EditJobForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);
    const API_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchJob = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`${API_URL}/job/jobs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const job = res?.data;

                // Helper to safely parse stringified arrays
                const safeParse = (value) => {
                    try {
                        const parsed = JSON.parse(value);
                        return Array.isArray(parsed) ? parsed : [value];
                    } catch {
                        return [value];
                    }
                };

                setFormData({
                    ...initialFormData,
                    ...job,
                    keyResponsibilities: safeParse(job.keyResponsibilities?.[0] ?? ""),
                    skills: safeParse(job.skills?.[0] ?? ""),
                    tags: safeParse(job.tags?.[0] ?? ""),
                    deadline: job.deadline ? new Date(job.deadline).toISOString().slice(0, 16) : "",
                });

            } catch (err) {
                toast.error("Failed to fetch job details");
                console.error("Error fetching job:", err);
            }
        };

        if (id) {
            fetchJob();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const updatedData = {
                ...formData,
                companyLogo: undefined, // Not updating logo
            };

            await axios.patch(`${API_URL}/job/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Job updated successfully");
            navigate("/employer/manage-jobs");
        } catch (err) {
            console.error(err);
            toast.error("Update failed");
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-semibold mb-4">Edit Job</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Job Title" name="jobName" value={formData.jobName} onChange={handleChange} />
                    <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
                    <Input label="Category" name="jobCategory" value={formData.jobCategory} onChange={handleChange} />
                    <Input label="Salary" name="salary" value={formData.salary} onChange={handleChange} />
                    <Input label="Location" name="location" value={formData.location} onChange={handleChange} />

                    <TextArea label="Job Description" name="jobDescription" value={formData.jobDescription} onChange={handleChange} />
                    <TextArea label="Work Details" name="workDetail" value={formData.workDetail} onChange={handleChange} />

                    <ArrayInput label="Responsibilities" arrayName="keyResponsibilities" data={formData} onChange={handleArrayChange} onAdd={addField} onRemove={removeField} />
                    <ArrayInput label="Skills" arrayName="skills" data={formData} onChange={handleArrayChange} onAdd={addField} onRemove={removeField} />
                    <ArrayInput label="Tags" arrayName="tags" data={formData} onChange={handleArrayChange} onAdd={addField} onRemove={removeField} />

                    <div>
                        <label className="block mb-1">Work Type</label>
                        <select
                            name="workType"
                            className="w-full p-2 border rounded"
                            value={formData.workType}
                            onChange={handleChange}
                        >
                            <option value="Office">Office</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1">Deadline</label>
                        <input
                            type="datetime-local"
                            name="deadline"
                            className="w-full p-2 border rounded"
                            value={formData.deadline}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Update Job
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

// Reusable Input component
const Input = ({ label, name, value, onChange }) => (
    <div>
        <label className="block mb-1">{label}</label>
        <input
            type="text"
            name={name}
            value={value || ""}
            onChange={onChange}
            className="w-full p-2 border rounded"
        />
    </div>
);

// Reusable TextArea component
const TextArea = ({ label, name, value, onChange }) => (
    <div>
        <label className="block mb-1">{label}</label>
        <textarea
            name={name}
            value={value || ""}
            onChange={onChange}
            className="w-full p-2 border rounded"
        />
    </div>
);

// Reusable Array Input handler
const ArrayInput = ({ label, arrayName, data, onChange, onAdd, onRemove }) => (
    <div>
        <label className="block mb-1">{label}</label>
        {data[arrayName].map((item, index) => (
            <div key={index} className="flex gap-2 mt-2">
                <input
                    type="text"
                    value={item || ""}
                    onChange={(e) => onChange(index, e.target.value, arrayName)}
                    className="w-full p-2 border rounded"
                />
                {index > 0 && (
                    <button type="button" onClick={() => onRemove(index, arrayName)} className="text-red-500">
                        ✕
                    </button>
                )}
            </div>
        ))}
        <button type="button" onClick={() => onAdd(arrayName)} className="mt-2 text-blue-500">
            + Add More
        </button>
    </div>
);

export default EditJobForm;
