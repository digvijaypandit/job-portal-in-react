import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearQuiz } from '../store/quizSlice';
import Leaderboard from '../components/AI features/Quiz/Leaderboard';

const QuizHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJoin = (type) => {
    dispatch(clearQuiz());
    navigate(`/applicant/quiz/${type.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8">Welcome to the Quiz Hub</h1>
      <div className="flex gap-6 mb-12">
        <button
          onClick={() => handleJoin('GLOBAL')}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Join Global Quiz
        </button>
        <button
          onClick={() => handleJoin('skill')}
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Join Skill-Based Quiz
        </button>
      </div>
      <Leaderboard type="BACKGROUND" week={new Date().toISOString().slice(0, 8) + `W${getWeekNum()}`} />
    </div>
  );
};

// Helper to compute current ISO week
function getWeekNum() {
  const now = new Date();
  const onejan = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil((((now - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  return week < 10 ? `0${week}` : week;
}

export default QuizHomePage;
