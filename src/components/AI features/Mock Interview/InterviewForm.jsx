import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setInterviewData } from '../../../store/interviewSlice';

const InterviewForm = () => {
    const userId = localStorage.getItem('userId');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        userId: userId,
        field: '',
        customField: '',
        interviewType: '',
        level: '',
        language: '',
        customLanguage: '',
    });
    const API_URL = import.meta.env.VITE_BASE_URL;

    const fieldOptions = {
        Technical: ['Software Engineering', 'Data Science', 'Product Management'],
        HR: ['Recruitment', 'Employee Relations'],
        Coding: ['Frontend', 'Backend', 'Fullstack', 'Data Structures', 'Algorithms'],
    };

    const educationFields = [
        'Primary Education', 'Secondary Education', 'Special Education', 'Higher Education',
        'Curriculum Development', 'Educational Technology', 'Instructional Design', 'Online Tutoring',
        'Educational Counseling', 'Academic Research', 'Computer Science Education', 'STEM Education',
        'Vocational Training', 'E-Learning Development', 'Educational Administration', 'School Management',
        'Student Affairs', 'Admissions & Enrollment', 'Career Counseling',
    ];

    const baseFields = [
        ...educationFields,
        ...fieldOptions.Technical,
        ...fieldOptions.HR,
        ...fieldOptions.Coding,
    ];

    const uniqueFields = Array.from(new Set(baseFields));

    const isCodingField = (field) =>
        fieldOptions.Coding.includes(field) || field === 'Computer Science Education';

    const getAvailableInterviewTypes = (field) => {
        const types = ['Technical', 'HR'];
        if (isCodingField(field)) {
            types.push('Coding');
        }
        return types;
    };

    const languageOptions = [
        'JavaScript', 'Python', 'Java', 'C++', 'C#',
        'Go', 'Ruby', 'Swift', 'Kotlin', 'PHP',
        'TypeScript', 'Rust', 'Other',
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const updated = { ...prev, [name]: value };

            if (name === 'field') {
                updated.interviewType = '';
                updated.language = '';
                updated.customField = '';
                updated.customLanguage = '';
            }

            if (name === 'interviewType' && value !== 'Coding') {
                updated.language = '';
                updated.customLanguage = '';
            }

            if (name === 'language' && value !== 'Other') {
                updated.customLanguage = '';
            }

            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const resolvedField = formData.field === 'Other' ? formData.customField : formData.field;
        const resolvedLanguage =
            formData.language === 'Other' ? formData.customLanguage : formData.language;

        const payload = {
            userId: formData.userId,
            interviewType: formData.interviewType,
            level: formData.level,
            field: resolvedField,
            language: formData.interviewType === 'Coding' ? resolvedLanguage : null,
        };

        try {
            const response = await axios.post(`${API_URL}/interviews/start`, payload);

            if (response.status === 200) {
                const normalizedType = formData.interviewType.toLowerCase();

                dispatch(setInterviewData({
                    sessionId: response.data.sessionId,
                    question: response.data.question,
                    type: normalizedType,
                    language: normalizedType === 'coding' ? resolvedLanguage : null,
                }));

                navigate('/applicant/interview-page');
            }
        } catch (error) {
            console.error('API call failed:', error);
            alert('Failed to start interview. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/applicant/mockInterview-home');
    };

    return (
        <div className="max-w-xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg border">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Start a new session</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Field Selection */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Select Field</label>
                    <select
                        name="field"
                        value={formData.field}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- Choose Field --</option>
                        {uniqueFields.map((field) => (
                            <option key={field} value={field}>{field}</option>
                        ))}
                        <option value="Other">Other</option>
                    </select>
                </div>

                {formData.field === 'Other' && (
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Custom Field</label>
                        <input
                            type="text"
                            name="customField"
                            value={formData.customField}
                            onChange={handleChange}
                            placeholder="Enter your field"
                            required
                            className="w-full px-4 py-2 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                )}

                {/* Interview Type */}
                {formData.field && (
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Session Type</label>
                        <select
                            name="interviewType"
                            value={formData.interviewType}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">-- Choose Interview Type --</option>
                            {getAvailableInterviewTypes(formData.field).map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Level */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Difficulty Level</label>
                    <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- Choose Level --</option>
                        <option value="Basic">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Advanced">Hard</option>
                    </select>
                </div>

                {/* Coding Language */}
                {formData.interviewType === 'Coding' && (
                    <>
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">Programming Language</label>
                            <select
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">-- Choose Language --</option>
                                {languageOptions.map((lang) => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </select>
                        </div>

                        {formData.language === 'Other' && (
                            <div>
                                <label className="block mb-2 cursor-pointer font-semibold text-gray-700">Custom Language</label>
                                <input
                                    type="text"
                                    name="customLanguage"
                                    value={formData.customLanguage}
                                    onChange={handleChange}
                                    placeholder="Enter your language"
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        )}
                    </>
                )}

                {/* Buttons */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-5 py-2 cursor-pointer rounded-md text-gray-600 border border-gray-300 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-5 py-2 cursor-pointer font-medium rounded-md transition ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                    >
                        {loading ? 'Starting...' : 'Start Session'}
                    </button>

                </div>
            </form>
        </div>
    );
};

export default InterviewForm;
