import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearQuiz } from '../store/quizSlice';
import Leaderboard from '../components/AI features/Quiz/Leaderboard';
import Navbar from '../components/comman/Navbar';

const getCurrentWeekKey = () => {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now - oneJan) / (24 * 60 * 60 * 1000));
  const week = Math.ceil((days + oneJan.getDay() + 1) / 7);
  const weekStr = week < 10 ? `0${week}` : week;
  return `${now.getFullYear()}-W${weekStr}`;
};

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white ml-3"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
    aria-label="Loading"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

const QuizCard = ({ title, description, colorClass, icon, onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`
      flex flex-col items-center justify-center p-10 rounded-3xl shadow-lg
      bg-gradient-to-br ${colorClass} text-white
      hover:scale-[1.06] hover:brightness-110
      transition-transform duration-300 ease-out
      focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-600
      disabled:opacity-60 disabled:cursor-wait
      max-w-xs w-full
      select-none
      text-left
    `}
    aria-label={`Join ${title} Quiz`}
  >
    <div className="mb-6 text-7xl" aria-hidden="true">{icon}</div>
    <h3 className="text-3xl font-extrabold mb-4 drop-shadow-md">{title}</h3>
    <p className="text-base font-semibold tracking-wide drop-shadow-sm">{description}</p>
    {loading && <LoadingSpinner />}
  </button>
);

const QuizHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingType, setLoadingType] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Memoize weekKey to avoid recalculation on every render
  const weekKey = useMemo(() => getCurrentWeekKey(), []);

  useEffect(() => {
    // Smooth fade-in effect on mount
    setIsMounted(true);
  }, []);

  const handleJoin = (type) => {
    if (loadingType) return;
    setLoadingType(type);
    dispatch(clearQuiz());

    // Delay navigation slightly for UX and loading spinner to show
    setTimeout(() => {
      navigate(`/applicant/quiz/${type.toLowerCase()}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100">
      <Navbar />
      <main
        className={`max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12
          transition-opacity duration-700 ${isMounted ? 'opacity-100' : 'opacity-0'}
        `}
        aria-label="Quiz Hub main content"
      >
        {/* Left column: quiz intro + buttons */}
        <section className="md:col-span-2 flex flex-col justify-center items-center md:items-start">
          <h1
            className="text-6xl font-extrabold text-gray-900 mb-6 leading-tight drop-shadow-lg"
            tabIndex={-1} // For keyboard users to focus on heading easily
          >
            Welcome to the Quiz Hub
          </h1>
          <p className="max-w-xl text-lg text-gray-700 mb-12 tracking-wide">
            Choose your challenge and test your knowledge with weekly quizzes. Get ready to compete and climb the leaderboard!
          </p>
          <div className="flex flex-wrap gap-8" role="list">
            <QuizCard
              title="Global Quiz"
              description="A wide range of questions testing your general knowledge."
              colorClass="from-blue-600 to-blue-500"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 010 20" />
                </svg>
              }
              onClick={() => handleJoin('GLOBAL')}
              loading={loadingType === 'GLOBAL'}
            />

            <QuizCard
              title="Skill-Based Quiz"
              description="Focused quizzes to sharpen your skills and knowledge."
              colorClass="from-green-600 to-green-500"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                  focusable="false"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
              }
              onClick={() => handleJoin('SKILL')}
              loading={loadingType === 'SKILL'}
            />
          </div>
        </section>

        {/* Right column: leaderboard */}
        <aside
          className="sticky top-28 bg-white rounded-3xl shadow-xl p-10 max-h-[70vh] overflow-auto"
          aria-live="polite"
          aria-atomic="true"
          aria-label="Leaderboard for current week"
          tabIndex={0} // Make focusable for screen readers
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 tracking-wide">
            This Week
          </h2>
          <Leaderboard type="BACKGROUND" week={weekKey} />
        </aside>
      </main>
    </div>
  );
};

export default QuizHomePage;
