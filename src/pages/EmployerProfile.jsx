import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';
import {
    FaLinkedin, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt
} from "react-icons/fa";
import Footer from "../components/comman/footer";
import Navbar from "../components/comman/Navbar";

const EmployerProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        companyWebsite: '',
        companyOverview: '',
        roleInCompany: '',
        Company: '',
        CompanyLocation: '',
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [jobs, setJobs] = useState([]);

    const fetchProfileData = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/profile', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    };

    const fetchEmployerJobs = async () => {
        const token = localStorage.getItem('token');
        const employerId = localStorage.getItem('userId');
        try {
            const response = await axios.get(`http://localhost:5000/api/job/jobs/employer/${employerId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setJobs(response.data.jobs || []);
        } catch (error) {
            console.error('Error fetching employer jobs:', error);
        }
    };

    useEffect(() => {
        const getProfile = async () => {
            try {
                const data = await fetchProfileData();
                setProfile(data);
                setFormData({
                    companyWebsite: data.companyWebsite || '',
                    companyOverview: data.companyOverview || '',
                    roleInCompany: data.roleInCompany || '',
                    Company: data.Company || '',
                    CompanyLocation: data.CompanyLocation || '',
                });
                fetchEmployerJobs();
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setEditMode(true);
                } else {
                    console.error('Error fetching profile data:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, []);

    const normalizeUrl = (url) => {
        if (!url) return '#';
        return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setPhotoFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const form = new FormData();
            form.append('companyWebsite', formData.companyWebsite);
            form.append('companyOverview', formData.companyOverview);
            form.append('roleInCompany', formData.roleInCompany);
            form.append('Company', formData.Company);
            form.append('CompanyLocation', formData.CompanyLocation);
            if (photoFile) {
                form.append('photo', photoFile);
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            const method = profile ? axios.patch : axios.post;
            const url = 'http://localhost:5000/api/profile';
            const response = await method(url, form, config);

            setProfile(response.data);
            setEditMode(false);
            setSuccessMessage('Profile updated successfully!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error submitting profile:', error);
            setErrorMessage('Failed to update profile.');
            setSuccessMessage('');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-slate-100">
                <p className="text-lg text-gray-700">Loading profile...</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-slate-300 py-10 px-4 md:px-10">
                <motion.div
                    className="w-full max-w-6xl bg-white/80 shadow-2xl backdrop-blur-md rounded-2xl p-10 border border-slate-200 mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex justify-between items-center mb-10 border-b pb-4">
                        <h2 className="text-3xl font-semibold text-slate-900">Recruiter Profile</h2>
                        <button
                            onClick={() => setEditMode(prev => !prev)}
                            className="px-5 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-all shadow"
                        >
                            {editMode ? 'Cancel' : 'Edit'}
                        </button>
                    </div>

                    {successMessage && <p className="text-green-600">{successMessage}</p>}
                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}

                    {editMode ? (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {['companyWebsite', 'roleInCompany', 'Company', 'CompanyLocation'].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                                    <input
                                        type="text"
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-slate-300 p-2 shadow-sm focus:ring-2 focus:ring-slate-600 focus:outline-none"
                                    />
                                </div>
                            ))}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Company Overview</label>
                                <textarea
                                    name="companyOverview"
                                    rows="4"
                                    value={formData.companyOverview}
                                    onChange={handleInputChange}
                                    className="w-full border border-slate-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-slate-600"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Company Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full border border-slate-300 rounded-md p-2"
                                />
                                {photoFile && <p className="text-sm text-slate-600 mt-1">Selected: {photoFile.name}</p>}
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-slate-900 text-white px-6 py-2 rounded-md shadow hover:bg-slate-800"
                                >
                                    {profile ? 'Save Changes' : 'Create Profile'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
                                {profile?.photo && (
                                    <img
                                        src={`http://localhost:5000${profile.photo}`}
                                        alt="Company Logo"
                                        className="w-24 h-24 rounded-full border shadow-md object-cover"
                                    />
                                )}
                                <div className="text-center sm:text-left">
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        {profile?.userId?.firstName} {profile?.userId?.lastName}
                                    </h2>
                                    <p className="text-slate-600">
                                        {profile?.roleInCompany} at {profile?.Company}
                                    </p>
                                    <p className="text-slate-500 flex items-center gap-1 mt-1">
                                        <FaMapMarkerAlt className="text-emerald-600" />
                                        {profile?.CompanyLocation}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-slate-700">
                                <div className="flex items-center gap-2">
                                    <FaEnvelope className="text-indigo-600" />
                                    <span>{profile?.userId?.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaPhone className="text-indigo-600" />
                                    <span>{profile?.userId?.contactNumber}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaGlobe className="text-indigo-600" />
                                    <a
                                        href={normalizeUrl(profile?.companyWebsite)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline text-indigo-700"
                                    >
                                        Visit Website
                                    </a>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-xl font-semibold text-slate-900">Company Overview</h3>
                                <p className="text-slate-700 mt-2">{profile?.companyOverview}</p>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-xl font-semibold text-slate-900">Posted Jobs</h3>
                                {jobs.length === 0 ? (
                                    <p className="text-slate-500 mt-2 italic">No jobs posted yet.</p>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                                        {jobs.map((job) => (
                                            <div
                                                key={job._id}
                                                className="p-5 border border-slate-200 rounded-lg bg-white shadow-md hover:shadow-lg transition"
                                            >
                                                <div className="flex items-center gap-4 mb-3">
                                                    {job.companyLogo && (
                                                        <img
                                                            src={`http://localhost:5000${job.companyLogo}`}
                                                            alt={job.jobName}
                                                            className="w-10 h-10 object-contain"
                                                        />
                                                    )}
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-slate-800">{job.jobName}</h4>
                                                        <p className="text-sm text-slate-600">{job.location} • {job.workType}</p>
                                                    </div>
                                                </div>
                                                <p className="text-slate-700 text-sm">{job.jobDescription}</p>
                                                <p className="text-sm text-slate-500 mt-2">Salary: {job.salary}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <motion.button
                                className="mt-10 w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg shadow-md"
                                whileHover={{ scale: 1.02 }}
                            >
                                Post a New Job
                            </motion.button>
                        </>
                    )}
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default EmployerProfile;
