import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/comman/Navbar';

const userId = localStorage.getItem('userId');

const API_URL = import.meta.env.VITE_BASE_URL;

const MockInterviewHome = () => {
    const [interviews, setInterviews] = useState([]);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [activeId, setActiveId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const res = await axios.get(`${API_URL}/interviews/user/${userId}`);
                setInterviews(res.data);
            } catch (err) {
                console.error('Error fetching interviews:', err);
            }
        };
        fetchInterviews();
    }, []);

    const handleCardClick = async (id) => {
        if (activeId === id) {
            setSelectedInterview(null);
            setActiveId(null);
            return;
        }

        try {
            const res = await axios.get(`${API_URL}/interviews/${id}`);
            setSelectedInterview(res.data);
            setActiveId(id);
        } catch (err) {
            console.error('Error fetching interview details:', err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-6 mt-12 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h1 className="text-3xl font-bold">Mock Interviews</h1>
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        onClick={() => navigate('/applicant/interview-form')}
                    >
                        + Start New Session
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[600px] overflow-y-auto pr-2">
                    {interviews.map((interview) => (
                        <div
                            key={interview._id}
                            onClick={() => handleCardClick(interview._id)}
                            className={`cursor-pointer border p-4 rounded-lg shadow-md transition duration-300 ease-in-out ${
                                activeId === interview._id ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-50'
                            }`}
                        >
                            <p className="text-sm text-gray-600"><strong>Type:</strong> {interview.interviewType}</p>
                            <p className="text-sm text-gray-600"><strong>Level:</strong> {interview.level}</p>
                            <p className="text-sm text-gray-600"><strong>Field:</strong> {interview.field}</p>
                            <p className="text-sm text-gray-600"><strong>Date:</strong> {new Date(interview.createdAt).toLocaleString()}</p>
                            <p className="text-sm text-gray-600"><strong>Avg. Score:</strong> {interview.averageScore ?? 'N/A'}</p>
                        </div>
                    ))}
                </div>

                {selectedInterview && (
                    <div className="mt-10 p-6 border rounded-lg shadow-lg bg-white animate-fadeIn">
                        <h2 className="text-2xl font-semibold mb-4">Interview Detail</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <p><strong>Type:</strong> {selectedInterview.interviewType}</p>
                            <p><strong>Level:</strong> {selectedInterview.level}</p>
                            <p><strong>Field:</strong> {selectedInterview.field}</p>
                            <p><strong>Date:</strong> {new Date(selectedInterview.createdAt).toLocaleString()}</p>
                            <p><strong>Avg. Score:</strong> {selectedInterview.averageScore ?? 'N/A'}</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-xl font-medium mb-2">Answers</h3>
                            <div className="grid gap-4">
                                {selectedInterview.answers?.map((ans, index) => (
                                    <div key={index} className="p-4 border rounded bg-gray-50">
                                        <p><strong>Q:</strong> {ans.question}</p>
                                        <p><strong>Your Answer:</strong> {ans.userAnswer}</p>
                                        <p><strong>Score:</strong> {ans.score}</p>
                                        <p><strong>Suggestion:</strong> {ans.suggestion}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default MockInterviewHome;
