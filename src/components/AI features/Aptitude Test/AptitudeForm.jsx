import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAptitudeData } from '../../../store/aptitudeSlice';

const AptitudeForm = () => {
  const userId = localStorage.getItem('userId');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !level) return alert("Please select both category and level.");

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/aptitude/start`, {
        userId,
        category,
        level,
      });

      if (response.status === 200) {
        const { sessionId, question } = response.data;

        dispatch(setAptitudeData({
          sessionId,
          question,
        }));

        navigate('/applicant/aptitude-page');
      }
    } catch (error) {
      console.error("Failed to start aptitude test:", error);
      alert("Failed to start aptitude test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/applicant/aptitude-home');
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg border">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Start Aptitude Test</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Select Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Choose Category --</option>
            <option value="Verbal Reasoning">Verbal Reasoning</option>
            <option value="Numerical Reasoning">Numerical Reasoning</option>
            <option value="Logical Reasoning">Logical Reasoning</option>
            <option value="Data Interpretation">Data Interpretation</option>
            <option value="Analytical Reasoning">Analytical Reasoning</option>
            <option value="Reading Comprehension">Reading Comprehension</option>
          </select>
        </div>

        {/* Level */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Select Difficulty Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Choose Level --</option>
            <option value="Basic">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Advanced">Hard</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-5 py-2 font-medium rounded-md text-white transition ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Starting...' : 'Start Test'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AptitudeForm;
