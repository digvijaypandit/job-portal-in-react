import React, { useState, useEffect } from 'react';
import Navbar from '../components/comman/Navbar';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import axios from 'axios';

const fetchProfileData = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        about: '',
        skills: [],
        education: [],
        certificates: [],
        projects: [],
        socialLinks: { LinkedIn: '', GitHub: '', Portfolio: '' },
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const data = await fetchProfileData();
                setProfile(data);
                setFormData({
                    about: data.about || '',
                    skills: data.skills || [],
                    education: data.education || [],
                    certificates: data.certificates || [],
                    projects: data.projects || [],
                    socialLinks: data.socialLinks || { LinkedIn: '', GitHub: '', Portfolio: '' },
                });
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

    const handleInputChange = (e) => {
        const { name, value, dataset } = e.target;
        if (['skills', 'education', 'certificates', 'projects'].includes(name)) {
            setFormData({ ...formData, [name]: value.split(',').map(item => item.trim()) });
        } else if (name === 'socialLinks') {
            setFormData({
                ...formData,
                socialLinks: { ...formData.socialLinks, [dataset.platform]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) setPhotoFile(e.target.files[0]);
    };

    const handleResumeChange = (e) => {
        if (e.target.files[0]) setResumeFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const form = new FormData();

            form.append('about', formData.about);
            form.append('skills', JSON.stringify(formData.skills));
            form.append('education', JSON.stringify(formData.education));
            form.append('certificates', JSON.stringify(formData.certificates));
            form.append('projects', JSON.stringify(formData.projects));
            form.append('socialLinks', JSON.stringify(formData.socialLinks));

            if (photoFile) form.append('photo', photoFile);
            if (resumeFile) form.append('resume', resumeFile);

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
        } catch (error) {
            console.error('Error submitting profile:', error);
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    if (!profile && !editMode) {
        return (
            <>
                <Navbar />
                <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
                    <p className="text-xl text-center mb-4">No profile found.</p>
                    <div className="text-center">
                        <button
                            onClick={() => setEditMode(true)}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Create Profile
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-br from-blue-50 to-yellow-50 min-h-screen">
                <div className="max-w-5xl mx-auto py-10 px-6">
                    <div className="bg-white shadow-xl rounded-xl p-8">
                        {/* Profile Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center space-x-6">
                                <img
                                    src={`http://localhost:5000/${profile.photo?.replace(/^\/+/, '')}`}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md object-cover"
                                />
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {profile.userId.firstName} {profile.userId.lastName}
                                    </h2>
                                    <p className="text-gray-500">{profile.userId.email}</p>
                                    <p className="text-gray-500">{profile.userId.contactNumber}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setEditMode(prev => !prev)}
                                className="mt-4 md:mt-0 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                {editMode ? 'Cancel Edit' : 'Edit Profile'}
                            </button>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Editable Form or Profile Display */}
                        {editMode ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Grid layout for better spacing */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-1 font-semibold text-gray-700">About Me</label>
                                        <textarea
                                            name="about"
                                            value={formData.about}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-semibold text-gray-700">Skills (comma separated)</label>
                                        <input
                                            type="text"
                                            name="skills"
                                            value={formData.skills.join(', ')}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-semibold text-gray-700">Education</label>
                                        <input
                                            type="text"
                                            name="education"
                                            value={formData.education.join(', ')}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-semibold text-gray-700">Certificates</label>
                                        <input
                                            type="text"
                                            name="certificates"
                                            value={formData.certificates.join(', ')}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-semibold text-gray-700">Projects</label>
                                        <input
                                            type="text"
                                            name="projects"
                                            value={formData.projects.join(', ')}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="grid md:grid-cols-3 gap-6">
                                    {['LinkedIn', 'GitHub', 'Portfolio'].map((platform) => (
                                        <div key={platform}>
                                            <label className="block mb-1 font-semibold text-gray-700">{platform}</label>
                                            <input
                                                type="url"
                                                name="socialLinks"
                                                data-platform={platform}
                                                value={formData.socialLinks[platform]}
                                                onChange={handleInputChange}
                                                placeholder={`${platform} URL`}
                                                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* File Uploads */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-1 font-semibold text-gray-700">Profile Photo</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="w-full border border-gray-300 rounded p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-semibold text-gray-700">Resume (PDF/DOC)</label>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleResumeChange}
                                            className="w-full border border-gray-300 rounded p-2"
                                        />
                                    </div>
                                </div>

                                <div className="text-right">
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
                                    >
                                        {profile ? 'Save Changes' : 'Create Profile'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-6 text-gray-700">
                                {/* Display profile data in styled sections */}
                                {[
                                    ['About Me', profile.about],
                                    ['Skills', profile.skills],
                                    ['Education', profile.education],
                                    ['Certificates', profile.certificates],
                                    ['Projects', profile.projects],
                                ].map(([title, content]) => (
                                    <div key={title}>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
                                        {Array.isArray(content) ? (
                                            <ul className="list-disc ml-5 space-y-1">
                                                {content.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>{content}</p>
                                        )}
                                    </div>
                                ))}

                                {/* Social Links */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Social Links</h3>
                                    <div className="flex gap-4 flex-wrap text-blue-600">
                                        {Object.entries(profile.socialLinks).map(([key, url]) =>
                                            url ? (
                                                <a
                                                    key={key}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline"
                                                >
                                                    {key}
                                                </a>
                                            ) : null
                                        )}
                                    </div>
                                </div>

                                {/* Resume Link */}
                                {profile.resume && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1">Resume</h3>
                                        <a
                                            href={`http://localhost:5000${profile.resume}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Download Resume
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
