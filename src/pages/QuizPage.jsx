import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  startGlobalQuiz,
  startSkillQuiz,
  fetchQuestions,
  selectCurrentQuestion,
  selectTotalQuestions,
  selectAnswers,
  answerQuestion,
  submitQuiz,
} from '../store/quizSlice';
import Leaderboard from '../components/AI features/Quiz/Leaderboard';

const QuizPage = () => {
  const { type } = useParams(); // 'global' or 'background'
  const dispatch = useDispatch();
  const quiz = useSelector((s) => s.quiz);
  const currentQ = useSelector(selectCurrentQuestion);
  const totalQ = useSelector(selectTotalQuestions);
  const answers = useSelector(selectAnswers);

  useEffect(() => {
    const userId = localStorage.getItem('userId') || '';
    if (type === 'global') dispatch(startGlobalQuiz());
    else dispatch(startSkillQuiz({ userId }));
  }, [type, dispatch]);

  useEffect(() => {
    if (quiz.quizId) {
      dispatch(fetchQuestions({ quizId: quiz.quizId }));
    }
  }, [quiz.quizId, dispatch]);

  const handleAnswer = (opt) => {
    dispatch(answerQuestion({ index: currentQ.index, answer: opt }));
  };

  const handleNext = () => {
    if (quiz.currentIndex + 1 < totalQ) {
      dispatch(answerQuestion({ move: 1 }));
    } else {
      dispatch(submitQuiz({ quizId: quiz.quizId, answers })).then(() =>
        alert('Quiz submitted!')
      );
    }
  };

  if (quiz.loading)
    return <p className="text-center mt-20">Loading quiz...</p>;
  if (!currentQ)
    return <p className="text-center mt-20">No questions found.</p>;

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      <h2 className="text-2xl font-bold text-center">
        {quiz.topic} ({quiz.category})
      </h2>
      <div className="bg-white shadow-lg p-6 rounded-md">
        <p className="font-semibold mb-4">{`${currentQ.index + 1} / ${totalQ}: ${
          currentQ.question
        }`}</p>
        <div className="flex flex-col gap-3">
          {currentQ.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className={`py-2 px-4 border rounded transition ${
                answers[currentQ.index] === opt
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="mt-6 w-full py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          {quiz.currentIndex + 1 === totalQ ? 'Submit Quiz' : 'Next Question'}
        </button>
      </div>

      <Leaderboard type={type === 'global' ? 'GLOBAL' : 'BACKGROUND'} week={quiz.scheduledForWeek || quiz.week} />
    </div>
  );
};

export default QuizPage;
