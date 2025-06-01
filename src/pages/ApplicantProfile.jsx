import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/comman/Navbar';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import axios from 'axios';
import Cropper from 'react-easy-crop';
import Modal from 'react-modal';

// Utility: get cropped image blob base64
const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // needed for cross-origin
        image.src = url;
    });

function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
}

async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // set canvas to safe area size
    canvas.width = safeArea;
    canvas.height = safeArea;

    // translate and rotate
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw image
    ctx.drawImage(image, 0, 0);

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // set canvas size to final desired crop size
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // place cropped image
    ctx.putImageData(
        data,
        Math.round(0 - safeArea / 2 + image.width / 2 - pixelCrop.x),
        Math.round(0 - safeArea / 2 + image.height / 2 - pixelCrop.y)
    );

    // Return base64 image
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, 'image/jpeg');
    });
}

const fetchProfileData = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

Modal.setAppElement('#root');

const DOMAIN_SKILLS = {
    // Web & Software Development
    "Web Development": ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Angular", "Next.js", "Django"],
    "Backend Development": ["Node.js", "Express", "Django", "Spring Boot", "PHP", "Rust", "Go", "Ruby on Rails"],
    "Mobile Development": ["React Native", "Flutter", "Swift", "Kotlin", "iOS Development", "Android Development"],
    "DevOps & Cloud": ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Terraform", "Linux", "Jenkins"],
    "Database Management": ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Oracle", "Cassandra"],
    "Data Science & AI": ["Python", "R", "Pandas", "NumPy", "TensorFlow", "PyTorch", "Scikit-learn", "Data Visualization"],
    "Cybersecurity": ["Ethical Hacking", "Network Security", "Penetration Testing", "Firewalls", "SIEM", "Cryptography"],
    "Game Development": ["Unity", "Unreal Engine", "C#", "Game Design", "Blender", "3D Modeling", "Godot"],

    // Business, Marketing, and Finance
    "Marketing": ["SEO", "Content Marketing", "Google Ads", "Social Media Marketing", "Analytics", "Copywriting"],
    "Finance": ["Bookkeeping", "Financial Analysis", "Tax Preparation", "Budgeting", "QuickBooks", "Payroll", "Auditing"],
    "Sales & CRM": ["Salesforce", "Lead Generation", "Cold Calling", "CRM Tools", "Negotiation", "Upselling"],
    "Project Management": ["Agile", "Scrum", "Kanban", "JIRA", "Confluence", "Risk Management", "Trello"],
    "Business Analysis": ["Requirement Gathering", "Process Mapping", "Gap Analysis", "SWOT", "Data Analysis"],

    // Healthcare & Science
    "Pharmacy": ["Pharmacology", "Clinical Research", "Prescription Processing", "Patient Care", "Dosage Calculations"],
    "Healthcare": ["Medical Terminology", "Nursing", "EMR Systems", "Patient Assessment", "Healthcare Management"],
    "Biotech & Research": ["Microscopy", "PCR", "Gene Sequencing", "Lab Safety", "Research Analysis", "Bioinformatics"],

    // Education & Learning
    "Education & Training": ["Curriculum Design", "Lesson Planning", "Classroom Management", "Online Teaching", "Special Education"],
    "Language Teaching": ["ESL", "TOEFL", "Grammar Instruction", "Phonetics", "Language Assessment"],

    // Design & Media
    "Graphic Design": ["Adobe Photoshop", "Illustrator", "InDesign", "Canva", "Brand Design", "Typography"],
    "UI/UX Design": ["Figma", "Sketch", "Wireframing", "Prototyping", "User Research", "Interaction Design"],
    "Video & Animation": ["Adobe Premiere", "After Effects", "Final Cut Pro", "Motion Graphics", "3D Animation"],

    // Writing & Content
    "Writing & Content": ["Technical Writing", "Creative Writing", "Blogging", "Proofreading", "Editing", "Content Strategy"],
    "Journalism": ["Investigative Writing", "Interviewing", "AP Style", "Reporting", "Fact-checking"],

    // Trades & Industrial
    "Construction": ["Blueprint Reading", "Carpentry", "Masonry", "OSHA Safety", "Welding", "HVAC"],
    "Manufacturing": ["CNC Machining", "Lean Manufacturing", "Quality Control", "Assembly", "Forklift Operation"],

    // Miscellaneous
    "Legal": ["Legal Research", "Contract Law", "Case Management", "Litigation", "Paralegal Skills"],
    "Human Resources": ["Recruitment", "Onboarding", "Employee Relations", "HRIS", "Compliance", "Payroll"],
    "Customer Support": ["Customer Service", "Call Handling", "Ticketing Systems", "Conflict Resolution", "CRM Software"]
};

const Section = ({ title, children }) => (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 space-y-2 ">

        <h3 className="text-xl font-semibold"><span className='bg-blue-500 rounded-r-2xl relative -left-4'>&nbsp;</span>{title}</h3>
        {children}
    </div>
);


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

    // Cropper states
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedPhotoURL, setCroppedPhotoURL] = useState(null); // for preview

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
                if (data.photo) {
                    setCroppedPhotoURL(`http://localhost:5000/${data.photo.replace(/^\/+/, '')}`);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setEditMode(true); // Show form automatically if profile doesn't exist
                } else {
                    console.error('Error fetching profile data:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, []);

    // Handle form data changes
    const handleInputChange = (e) => {
        const { name, value, dataset } = e.target;
        if (name === 'socialLinks') {
            setFormData({
                ...formData,
                socialLinks: { ...formData.socialLinks, [dataset.platform]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Skills input handlers (with pills and suggestions)
    const [skillInput, setSkillInput] = useState('');
    const [skillSuggestions, setSkillSuggestions] = useState([]);

    const SKILL_TO_DOMAIN = {};
    Object.entries(DOMAIN_SKILLS).forEach(([domain, skills]) => {
        skills.forEach(skill => {
            if (!SKILL_TO_DOMAIN[skill]) SKILL_TO_DOMAIN[skill] = [];
            SKILL_TO_DOMAIN[skill].push(domain);
        });
    });

    const onSkillInputChange = (e) => {
        const val = e.target.value;
        setSkillInput(val);

        if (!val.trim()) {
            setSkillSuggestions([]);
            return;
        }

        // Direct match to a skill? Find domains it's related to
        const matchedDomains = SKILL_TO_DOMAIN[val] || [];

        // Suggest more skills from those domains
        const suggestions = new Set();
        matchedDomains.forEach(domain => {
            DOMAIN_SKILLS[domain].forEach(skill => {
                if (!formData.skills.includes(skill) && skill.toLowerCase().includes(val.toLowerCase())) {
                    suggestions.add(skill);
                }
            });
        });

        // If no domain match, fall back to fuzzy match across all domains
        if (suggestions.size === 0) {
            Object.values(DOMAIN_SKILLS).flat().forEach(skill => {
                if (
                    skill.toLowerCase().includes(val.toLowerCase()) &&
                    !formData.skills.includes(skill)
                ) {
                    suggestions.add(skill);
                }
            });
        }

        setSkillSuggestions(Array.from(suggestions).slice(0, 5));
    };


    const addSkill = (skill) => {
        if (skill && !formData.skills.includes(skill)) {
            setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
            setSkillInput('');
            setSkillSuggestions([]);
        }
    };

    const removeSkill = (skill) => {
        setFormData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
    };

    const onSkillKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (skillInput.trim()) addSkill(skillInput.trim());
        }
    };

    // Dynamic list inputs handlers (education, projects, certificates)
    const updateListItem = (field, index, value) => {
        const list = [...formData[field]];
        list[index] = value;
        setFormData((prev) => ({ ...prev, [field]: list }));
    };

    const addListItem = (field) => {
        setFormData((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const removeListItem = (field, index) => {
        const list = [...formData[field]];
        list.splice(index, 1);
        setFormData((prev) => ({ ...prev, [field]: list }));
    };

    // Handle file changes
    const onPhotoSelected = (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            console.log('No file selected');
            return;
        } else { console.log('file selected'); }

        const reader = new FileReader();
        reader.onload = () => {
            console.log('Image loaded');
            setImageSrc(reader.result);     // base64 string
        };
        reader.readAsDataURL(file);
        console.log({ cropModalOpen, imageSrc });
    };

    const onResumeSelected = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setResumeFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (imageSrc) setCropModalOpen(true);
    }, [imageSrc]);

    // Cropper callbacks
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onCropConfirm = async () => {
        try {
            const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
            setPhotoFile(croppedBlob);

            // Create a preview URL
            const previewUrl = URL.createObjectURL(croppedBlob);
            setCroppedPhotoURL(previewUrl);

            setCropModalOpen(false);
            setImageSrc(null);
        } catch (error) {
            console.error('Crop failed:', error);
        }
    };

    // Submit handler
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

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-br from-blue-50 to-yellow-50 min-h-screen">
                <div className="max-w-5xl mx-auto py-10 px-6">
                    <div className="bg-white shadow-xl rounded-xl p-8">
                        {/* Profile Header */}
                        {profile && !editMode && (
                            <div className="space-y-6">
                                {/* Header */}
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-r p-4 rounded-xl from-blue-0 via-blue-400 to-blue-0">
                                    <div className="flex items-center space-x-6">
                                        <img
                                            src={
                                                croppedPhotoURL
                                                    ? croppedPhotoURL
                                                    : profile.photo
                                                        ? `http://localhost:5000/${profile.photo.replace(/^\/+/, '')}`
                                                        : 'https://via.placeholder.com/96?text=No+Photo'
                                            }
                                            alt="Profile"
                                            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md object-cover transition-transform hover:scale-105"
                                        />
                                        <div>
                                            <h2 className="text-3xl font-extrabold text-gray-800">{profile.userId.firstName} {profile.userId.lastName}</h2>
                                            <p className="text-gray-900">{profile.userId.email}</p>
                                            <p className="text-gray-900 text-sm">{profile.userId.contactNumber}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="mt-4 md:mt-0 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition"
                                    >
                                        Edit Profile
                                    </button>
                                </div>

                                {/* About */}
                                {profile.about && (
                                    <Section title="About">
                                        <p className="text-gray-700">{profile.about}</p>
                                    </Section>
                                )}

                                {/* Skills */}
                                {profile.skills.length > 0 && (
                                    <Section title="Skills">
                                        <div className="flex flex-wrap gap-3">
                                            {profile.skills.map((skill, idx) => (
                                                <span key={idx} className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </Section>
                                )}

                                {/* Education */}
                                {profile.education.length > 0 && (
                                    <Section title="Education">
                                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                                            {profile.education.map((edu, idx) => (
                                                <li key={idx}>{edu}</li>
                                            ))}
                                        </ul>
                                    </Section>
                                )}

                                {/* Projects */}
                                {profile.projects.length > 0 && (
                                    <Section title="Projects">
                                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                                            {profile.projects.map((proj, idx) => (
                                                <li key={idx}>{proj}</li>
                                            ))}
                                        </ul>
                                    </Section>
                                )}

                                {/* Certificates */}
                                {profile.certificates.length > 0 && (
                                    <Section title="Certificates">
                                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                                            {profile.certificates.map((cert, idx) => (
                                                <li key={idx}>{cert}</li>
                                            ))}
                                        </ul>
                                    </Section>
                                )}

                                {/* Resume */}
                                {profile.resume && (
                                    <Section title="Resume">
                                        <a
                                            href={`http://localhost:5000/${profile.resume.replace(/^\/+/, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline hover:text-blue-800 transition"
                                        >
                                            View Resume
                                        </a>
                                    </Section>
                                )}

                                {/* Social Links */}
                                <Section title="Social Links">
                                    <ul className="flex flex-col space-y-3 text-blue-700 font-medium">
                                        {profile.socialLinks.LinkedIn && (
                                            <li>
                                                <a href={profile.socialLinks.LinkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                                    <FaLinkedin size={20} /> LinkedIn
                                                </a>
                                            </li>
                                        )}
                                        {profile.socialLinks.GitHub && (
                                            <li>
                                                <a href={profile.socialLinks.GitHub} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                                    <FaGithub size={20} /> GitHub
                                                </a>
                                            </li>
                                        )}
                                        {profile.socialLinks.Portfolio && (
                                            <li>
                                                <a href={profile.socialLinks.Portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                                    <FaGlobe size={20} /> Portfolio
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </Section>
                            </div>
                        )}

                        {/* Edit Mode Form */}
                        {(editMode || !profile) && (
                            <form
                                className="space-y-8"
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                            >
                                {/* Profile Photo Upload + Crop */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                                    <div className="flex items-center gap-4">
                                        {croppedPhotoURL ? (
                                            <img
                                                src={croppedPhotoURL}
                                                alt="Cropped Preview"
                                                className="w-24 h-24 rounded-full object-cover border border-gray-300"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 rounded-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
                                                No Photo
                                            </div>
                                        )}
                                        <div className="space-y-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="photoInput"
                                                onChange={onPhotoSelected}
                                                className="hidden"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => document.getElementById('photoInput').click()}
                                                className='border p-2 cursor-pointer hover:bg-gray-50'
                                            >
                                                Select Photo
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => setEditMode(false)}
                                            className="relative left-120 mt-4 md:mt-0 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition cursor-pointer"
                                        >
                                            Cancel Edit
                                        </button>
                                    </div>
                                </div>

                                {/* Crop Modal */}
                                <Modal
                                    isOpen={cropModalOpen}
                                    onRequestClose={() => setCropModalOpen(false)}
                                    contentLabel="Crop Image"
                                    className="w-full max-w-lg bg-white rounded-xl border border-gray-200 shadow-lg p-6 relative z-50"
                                    overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40"
                                >
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Crop Your Image</h2>

                                    <div className="relative w-full h-80 bg-gray-100 border border-dashed border-gray-300 rounded-md overflow-hidden">
                                        {imageSrc && (
                                            <Cropper
                                                key={imageSrc}
                                                image={imageSrc}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={1}
                                                cropShape='round'
                                                onCropChange={setCrop}
                                                onZoomChange={setZoom}
                                                onCropComplete={onCropComplete}
                                            />
                                        )}
                                    </div>

                                    <div className="flex justify-end mt-6 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setCropModalOpen(false)}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={onCropConfirm}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 transition"
                                        >
                                            Crop & Save
                                        </button>
                                    </div>
                                </Modal>

                                {/* Resume Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Resume (PDF)</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={onResumeSelected}
                                        className="border border-gray-300 rounded p-2 w-full text-sm cursor-pointer hover:bg-gray-50"
                                    />
                                    {resumeFile && (
                                        <p className="mt-1 text-sm text-gray-600">Selected file: {resumeFile.name}</p>
                                    )}
                                </div>

                                {/* About */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
                                    <textarea
                                        name="about"
                                        value={formData.about}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="border border-gray-300 rounded p-2 w-full text-sm"
                                    />
                                </div>

                                {/* Skills */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {formData.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-gray-200 hover:border hover:scale-105"
                                                onClick={() => removeSkill(skill)}
                                            >
                                                {skill}
                                                <button
                                                    type="button"
                                                    className="ml-2 text-gray-500 hover:text-gray-700"
                                                    aria-label={`Remove skill ${skill}`}
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <input
                                        type="text"
                                        value={skillInput}
                                        onChange={onSkillInputChange}
                                        onKeyDown={onSkillKeyDown}
                                        placeholder="Add a skill"
                                        className="border border-gray-300 rounded p-2 w-full text-sm"
                                    />
                                    {skillSuggestions.length > 0 && (
                                        <ul className="border border-gray-300 rounded mt-1 max-h-32 overflow-auto bg-white text-sm shadow-sm z-10">
                                            {skillSuggestions.map((sugg) => (
                                                <li
                                                    key={sugg}
                                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => addSkill(sugg)}
                                                >
                                                    {sugg}
                                                    <span className="text-xs text-gray-500 ml-1">
                                                        ({SKILL_TO_DOMAIN[sugg]?.[0] || "Other"})
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* Dynamic Lists */}
                                {['education', 'projects', 'certificates'].map((field) => (
                                    <div key={field} className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field}</label>
                                        {formData[field].map((item, idx) => (
                                            <div key={idx} className="flex gap-2 mb-2 items-center">
                                                <input
                                                    type="text"
                                                    value={item}
                                                    onChange={(e) => updateListItem(field, idx, e.target.value)}
                                                    className="flex-grow border border-gray-300 rounded p-2 text-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeListItem(field, idx)}
                                                    className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-red-500"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => addListItem(field)}
                                            className="mt-1 text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                                        >
                                            Add {field.slice(0, -1)}
                                        </button>
                                    </div>
                                ))}

                                {/* Social Links */}
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Social Links</label>
                                    {['LinkedIn', 'GitHub', 'Portfolio'].map((platform) => (
                                        <div key={platform} className="mb-4">
                                            <label className="block mb-1 text-sm text-gray-600">{platform}</label>
                                            <input
                                                type="url"
                                                name="socialLinks"
                                                data-platform={platform}
                                                value={formData.socialLinks[platform] || ''}
                                                onChange={handleInputChange}
                                                placeholder={`Enter your ${platform} URL`}
                                                className="border border-gray-300 rounded p-2 w-full text-sm"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        className="px-5 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 w-full"
                                    >
                                        Save Profile
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
