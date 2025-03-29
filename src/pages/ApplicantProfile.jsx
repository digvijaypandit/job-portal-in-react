import React from "react";
import {
    Pencil, Share2, Plus, Edit3, Mail, Linkedin, Github
} from "lucide-react";
import Navbar from "../components/comman/Navbar";

// Reusable Icon Button Component
const IconButton = ({ icon, onClick, className = "" }) => (
    <button
        onClick={onClick}
        className={`p-3 bg-white shadow-md rounded-full hover:shadow-lg transition-all border border-gray-200 ${className}`}
    >
        {icon}
    </button>
);

// Profile Header Component
const ProfileHeader = () => (
    <div className="relative shadow-lg rounded-2xl group bg-white p-8 flex flex-col sm:flex-row items-center gap-6 w-full max-w-3xl transition-all hover:shadow-xl text-gray-900 border border-gray-200">
        {/* Profile Picture */}
        <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center text-3xl font-bold shadow-inner border-4 border-white text-gray-900">
            DP
        </div>

        {/* Profile Details */}
        <div className="flex-1 text-center sm:text-left">
            <h2 className="text-4xl text-gray-800 font-semibold group-hover:text-gray-950">Digvijay Pandit</h2>
            <p className="text-gray-500">@Digvijaypandit</p>
            <p className="text-gray-400">Pravara Rural Engineering College, Loni</p>

            {/* Resume Button */}
            <button className="mt-4 px-6 py-2 cursor-pointer bg-gray-900 text-white font-medium rounded-lg shadow-md hover:bg-gray-800 transition-all">
                View Resume
            </button>

            {/* Social Links */}
            <div className="mt-4 flex justify-center sm:justify-start gap-3">
                <IconButton icon={<Mail size={20} />} className="text-gray-600 cursor-pointer hover:bg-black hover:text-white transition-colors duration-500" />
                <IconButton icon={<Linkedin size={20} />} className="text-gray-600 cursor-pointer hover:bg-black hover:text-white transition-colors duration-500" />
                <IconButton icon={<Github size={20} />} className="text-gray-600 cursor-pointer hover:bg-black hover:text-white transition-colors duration-500" />
            </div>
        </div>

        {/* Edit & Share Buttons */}
        <div className="absolute top-5 right-5 flex gap-3">
            <IconButton icon={<Share2 size={18} />} className="text-gray-600 cursor-pointer hover:bg-gray-50" />
            <IconButton icon={<Edit3 size={18} />} className="text-gray-600 cursor-pointer hover:bg-gray-50" />
        </div>
    </div>
);

// Section Component
const ProfileSection = ({ title, content, icon }) => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md transition-all hover:shadow-lg p-5">
        <div className="flex justify-between items-center relative">
            <h3 className="text-lg font-semibold text-gray-900"><span className="bg-blue-600 absolute -left-5 rounded-r-2xl">&nbsp;</span>{title}</h3>
            <IconButton icon={icon} className="text-gray-600 cursor-pointer hover:bg-gray-50" />
        </div>
        <div className="mt-3 text-gray-600">{content}</div>
    </div>
);

// Main Profile Page
const ProfilePage = () => {
    const sections = [
        { title: "About", content: "I am a BE student in Electronics and Computer Engineering...", icon: <Edit3 size={18} /> },
        {
            title: "Skills", content: (
                <div className="flex flex-wrap gap-3">
                    {["HTML", "CSS", "JavaScript", "React.js", "Web Development", "Full Stack Development"].map(skill => (
                        <span key={skill} className="px-4 py-2 border cursor-pointer border-gray-300 rounded-full text-gray-700 bg-gray-100 shadow-sm hover:bg-gray-200 transition-all">
                            {skill}
                        </span>
                    ))}
                </div>
            ), icon: <Pencil size={18} />
        },
        { title: "Work Experience", content: "No experience added yet.", icon: <Plus size={18} /> },
        { title: "Education", content: "No education details added yet.", icon: <Plus size={18} /> },
        { title: "Certificates", content: "No certificates added yet.", icon: <Plus size={18} /> },
        { title: "Projects", content: "No projects added yet.", icon: <Plus size={18} /> },
        { title: "Achievements", content: "No achievements added yet.", icon: <Plus size={18} /> }
    ];

    return (
        <>
            <Navbar />
            <div className="max-w-5xl mx-auto mt-10 p-6 space-y-8 min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center">
                <ProfileHeader />
                <div className="space-y-5 w-full max-w-3xl">
                    {sections.map((section, index) => (
                        <ProfileSection key={index} {...section} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
