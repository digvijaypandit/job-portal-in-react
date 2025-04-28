import React, { useState, useEffect } from 'react';
import Navbar from '../components/comman/Navbar'
import axios from 'axios';

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image); // Assuming the image is a file object

    try {
        const response = await axios.post('http://localhost:5000/api/profile/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.filePath; // This will return the file path
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Image upload failed');
    }
};

const fetchProfileData = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const updateProfileData = async (updatedData) => {
    const token = localStorage.getItem('token');
    const response = await axios.patch('http://localhost:5000/api/profile', updatedData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const createProfile = async (newProfileData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post('http://localhost:5000/api/profile', newProfileData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating profile:', error);
        throw new Error('Profile creation failed');
    }
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
        socialLinks: { LinkedIn: '', GitHub: '' },
        photo: '',
    });

    useEffect(() => {
        const getProfile = async () => {
            try {
                const data = await fetchProfileData();
                setProfile(data);
                setFormData({
                    about: data.about,
                    skills: data.skills,
                    education: data.education,
                    certificates: data.certificates,
                    projects: data.projects,
                    socialLinks: data.socialLinks,
                    photo: data.photo,
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'skills' || name === 'education' || name === 'certificates' || name === 'projects') {
            setFormData({
                ...formData,
                [name]: value.split(',').map((item) => item.trim()),
            });
        } else if (name === 'socialLinks') {
            setFormData({
                ...formData,
                socialLinks: {
                    ...formData.socialLinks,
                    [e.target.dataset.platform]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleImageChange = async (e) => {
        const image = e.target.files[0]; // Get the uploaded file
        if (image) {
            try {
                const imagePath = await uploadImage(image); // Upload the image
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    photo: imagePath, // Update the photo field with the file path
                }));
            } catch (error) {
                console.error("Image upload failed:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.photo) {
                alert("Please upload a profile image.");
                return;
            }

            const updatedProfile = profile ? await updateProfileData(formData) : await createProfile(formData);
            setProfile(updatedProfile);
            setEditMode(false);
        } catch (error) {
            console.error('Error creating/updating profile:', error);
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!profile) {
        return <div className="text-center">No profile data found</div>;
    }

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 mt-8">
                {/* Profile Header */}
                <div className="flex items-center space-x-6 mb-8">
                    <img
                        src={profile.photo}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-blue-600 shadow-lg"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{profile.userId.firstName} {profile.userId.lastName}</h1>
                        <p className="text-sm text-gray-600">{profile.userId.email}</p>
                        <p className="text-sm text-gray-600">{profile.userId.contactNumber}</p>
                    </div>
                </div>

                {/* Edit Profile Button */}
                <div className="mt-4 text-right">
                    <button
                        onClick={() => setEditMode((prev) => !prev)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        {editMode ? 'Cancel Edit' : 'Edit Profile'}
                    </button>
                </div>

                {/* Edit Form */}
                {editMode ? (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <div className="space-y-4">
                            <label className="block text-lg font-semibold text-gray-800">About Me</label>
                            <textarea
                                name="about"
                                value={formData.about}
                                onChange={handleInputChange}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                rows="4"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-lg font-semibold text-gray-800">Skills</label>
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills.join(', ')}
                                onChange={handleInputChange}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                placeholder="Comma separated skills"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-lg font-semibold text-gray-800">Education</label>
                            <input
                                type="text"
                                name="education"
                                value={formData.education.join(', ')}
                                onChange={handleInputChange}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                placeholder="Comma separated degrees"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-lg font-semibold text-gray-800">Certificates</label>
                            <input
                                type="text"
                                name="certificates"
                                value={formData.certificates.join(', ')}
                                onChange={handleInputChange}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                placeholder="Comma separated certificates"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-lg font-semibold text-gray-800">Projects</label>
                            <input
                                type="text"
                                name="projects"
                                value={formData.projects.join(', ')}
                                onChange={handleInputChange}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                placeholder="Comma separated projects"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-lg font-semibold text-gray-800">LinkedIn</label>
                            <input
                                type="url"
                                name="socialLinks"
                                data-platform="LinkedIn"
                                value={formData.socialLinks.LinkedIn}
                                onChange={handleInputChange}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                placeholder="LinkedIn Profile URL"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-lg font-semibold text-gray-800">GitHub</label>
                            <input
                                type="url"
                                name="socialLinks"
                                data-platform="GitHub"
                                value={formData.socialLinks.GitHub}
                                onChange={handleInputChange}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                placeholder="GitHub Profile URL"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-lg font-semibold text-gray-800">Profile Image</label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-8">
                        {/* Display Profile Info */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">About Me</h2>
                            <p className="text-lg text-gray-700">{profile.about}</p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
                            <ul className="flex flex-wrap gap-4 mt-2">
                                {profile.skills.map((skill, index) => (
                                    <li key={index} className="bg-blue-100 text-blue-700 py-2 px-4 rounded-full text-sm">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
                            <ul className="list-disc pl-5 mt-2">
                                {profile.education.map((degree, index) => (
                                    <li key={index} className="text-lg text-gray-700">{degree}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Certificates</h2>
                            <ul className="list-disc pl-5 mt-2">
                                {profile.certificates.map((certificate, index) => (
                                    <li key={index} className="text-lg text-gray-700">{certificate}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
                            <ul className="list-disc pl-5 mt-2">
                                {profile.projects.map((project, index) => (
                                    <li key={index} className="text-lg text-gray-700">{project}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Social Links</h2>
                            <div className="space-x-6">
                                <a href={profile.socialLinks.LinkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
                                <a href={profile.socialLinks.GitHub} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">GitHub</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Profile;
