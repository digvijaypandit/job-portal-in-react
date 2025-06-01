import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/comman/Navbar';

const userId = localStorage.getItem('userId');

const AptitudeHome = () => {
    const [tests, setTests] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);
    const [activeId, setActiveId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/aptitude/user/${userId}`);
                setTests(res.data);
            } catch (err) {
                console.error('Error fetching aptitude tests:', err);
            }
        };
        fetchTests();
    }, []);

    const handleCardClick = async (id) => {
        if (activeId === id) {
            setSelectedTest(null);
            setActiveId(null);
            return;
        }

        try {
            const res = await axios.get(`http://localhost:5000/api/aptitude/${id}`);
            setSelectedTest(res.data);
            setActiveId(id);
        } catch (err) {
            console.error('Error fetching aptitude test details:', err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-6 mt-12 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h1 className="text-3xl font-bold">Aptitude Tests</h1>
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        onClick={() => navigate('/applicant/aptitude-form')}
                    >
                        + Start New Test
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[600px] overflow-y-auto pr-2">
                    {tests.map((test) => (
                        <div
                            key={test._id}
                            onClick={() => handleCardClick(test._id)}
                            className={`cursor-pointer border p-4 rounded-lg shadow-md transition duration-300 ease-in-out ${
                                activeId === test._id ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-50'
                            }`}
                        >
                            <p className="text-sm text-gray-600"><strong>Level:</strong> {test.level}</p>
                            <p className="text-sm text-gray-600"><strong>Score:</strong> {test.score ?? 'N/A'}</p>
                            <p className="text-sm text-gray-600"><strong>Date:</strong> {new Date(test.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>

                {selectedTest && (
                    <div className="mt-10 p-6 border rounded-lg shadow-lg bg-white animate-fadeIn">
                        <h2 className="text-2xl font-semibold mb-4">Test Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <p><strong>Level:</strong> {selectedTest.level}</p>
                            <p><strong>Score:</strong> {selectedTest.score ?? 'N/A'}</p>
                            <p><strong>Session ID:</strong> {selectedTest.sessionId}</p>
                            <p><strong>Date:</strong> {new Date(selectedTest.createdAt).toLocaleString()}</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-xl font-medium mb-2">Answers</h3>
                            <div className="grid gap-4">
                                {selectedTest.answers?.map((ans, index) => (
                                    <div key={index} className="p-4 border rounded bg-gray-50">
                                        <p><strong>Q:</strong> {ans.question}</p>
                                        <p><strong>Your Answer:</strong> {ans.userAnswer}</p>
                                        <p><strong>Correct:</strong> {ans.isCorrect ? 'Yes' : 'No'}</p>
                                        {ans.explanation && (
                                            <p><strong>Explanation:</strong> {ans.explanation}</p>
                                        )}
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

export default AptitudeHome;
