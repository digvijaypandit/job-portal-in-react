import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FullscreenExitModal = ({ onContinue }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div className="bg-white rounded p-6 max-w-md w-full text-center shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Fullscreen mode exited!</h2>
      <p className="mb-6">Please stay in fullscreen mode during the quiz to avoid disqualification.</p>
      <button
        onClick={onContinue}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Continue
      </button>
    </div>
  </div>
);

const QuizPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quiz = useSelector((s) => s.quiz);
  const currentQ = useSelector(selectCurrentQuestion);
  const totalQ = useSelector(selectTotalQuestions);
  const answers = useSelector(selectAnswers);

  const [warningsCount, setWarningsCount] = useState(0);
  const [forceSubmitted, setForceSubmitted] = useState(false);
  
  // New state for fullscreen exit modal visibility
  const [showFullscreenModal, setShowFullscreenModal] = useState(false);

  const logViolation = async (reason) => {
    try {
      await fetch('/api/quiz/log-violation', {
        method: 'POST',
        body: JSON.stringify({ quizId: quiz.quizId, reason }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Failed to log violation', err);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId') || '';
    if (type === 'global') {
      dispatch(startGlobalQuiz());
    } else {
      dispatch(startSkillQuiz({ userId }));
    }
  }, [type, dispatch]);

  useEffect(() => {
    if (quiz.quizId) {
      dispatch(fetchQuestions({ quizId: quiz.quizId }));
    }
  }, [quiz.quizId, dispatch]);

  const handleAnswer = (opt) => {
    if (forceSubmitted || showFullscreenModal) return;
    dispatch(answerQuestion({ index: currentQ.index, answer: opt }));
  };

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 'c') ||
        (e.ctrlKey && e.key === 'v') ||
        (e.ctrlKey && e.key === 'x') ||
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.shiftKey && e.key === 'i') ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        toast.warn('Shortcut disabled during quiz.');
        logViolation('Blocked shortcut used');
      }

      if (
        e.ctrlKey &&
        (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')
      ) {
        e.preventDefault();
        toast.warn('Zoom is disabled during quiz.');
        logViolation('Attempted zoom shortcut');
      }
    };

    const blockCopyPasteCut = (e) => {
      e.preventDefault();
      toast.warn('Copy/Paste/Cut is disabled during quiz.');
      logViolation(`Attempted ${e.type}`);
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', blockCopyPasteCut);
    document.addEventListener('paste', blockCopyPasteCut);
    document.addEventListener('cut', blockCopyPasteCut);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', blockCopyPasteCut);
      document.removeEventListener('paste', blockCopyPasteCut);
      document.removeEventListener('cut', blockCopyPasteCut);
    };
  }, [logViolation]);

  useEffect(() => {
    if (warningsCount >= 2 && !forceSubmitted) {
      toast.error('Too many violations detected. Quiz will be submitted automatically.');
      forceSubmitQuiz();
    }
  }, [warningsCount]);

  const forceSubmitQuiz = () => {
    setForceSubmitted(true);
    dispatch(submitQuiz({ quizId: quiz.quizId, answers }))
      .unwrap()
      .then(() => {
        toast.success('Quiz force-submitted due to violations.');
        setTimeout(() => {
          navigate('/applicant/quizzes');
        }, 2500);
      })
      .catch(() => {
        toast.error('Failed to force submit quiz. Please contact support.');
      });
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        toast.warn('Tab switch detected. Please stay on the quiz page!');
        logViolation('Tab switch detected');
        setWarningsCount((c) => c + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Request fullscreen on mount
  useEffect(() => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem
        .requestFullscreen()
        .catch((err) => console.error('Fullscreen failed', err));
    }
  }, []);

  // Show modal on fullscreen exit instead of toast
  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        // Show the modal
        setShowFullscreenModal(true);
        logViolation('Exited fullscreen');
        setWarningsCount((c) => c + 1);
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Handle continue button click in modal
  const handleContinueFullscreen = () => {
    const elem = document.documentElement;
    setShowFullscreenModal(false);
    if (elem.requestFullscreen) {
      elem
        .requestFullscreen()
        .catch((err) => {
          console.error('Failed to re-enter fullscreen', err);
          toast.error('Failed to enter fullscreen. Please try again.');
        });
    }
  };

  const handleNext = () => {
    if (forceSubmitted || showFullscreenModal) return;

    if (quiz.currentIndex + 1 < totalQ) {
      dispatch(answerQuestion({ move: 1 }));
    } else {
      dispatch(submitQuiz({ quizId: quiz.quizId, answers }))
        .unwrap()
        .then(() => {
          toast.success('Quiz submitted successfully!');
          setTimeout(() => {
            navigate('/applicant/quizzes');
          }, 2000);
        })
        .catch(() => {
          toast.error('Failed to submit quiz. Please try again.');
        });
    }
  };

  if (quiz.loading) {
    return <p className="text-center mt-20">Loading quiz...</p>;
  }

  if (!currentQ) {
    return <p className="text-center mt-20">No questions found.</p>;
  }

  return (
    <>
      {/* Navbar removed as requested */}

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-7xl mx-auto mt-18 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quiz Section */}
        <div className="md:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold text-center">
            {quiz.topic} ({quiz.category})
          </h2>

          <div className="bg-white shadow-lg p-6 rounded-md">
            <p className="font-semibold mb-4">
              {`${currentQ.index + 1} / ${totalQ}: ${currentQ.question}`}
            </p>

            <div className="flex flex-col gap-3">
              {currentQ.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={forceSubmitted || showFullscreenModal}
                  className={`py-2 px-4 border rounded transition ${
                    answers[currentQ.index] === opt
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  } ${(forceSubmitted || showFullscreenModal) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={forceSubmitted || showFullscreenModal}
              className={`mt-6 w-full py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition ${
                (forceSubmitted || showFullscreenModal) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {quiz.currentIndex + 1 === totalQ ? 'Submit Quiz' : 'Next Question'}
            </button>
          </div>
          <p className="text-red-600 text-sm text-center mt-2">
            Note: Any attempts to use AI tools or chat assistance will result in disqualification.
          </p>
        </div>

        {/* Leaderboard Section */}
        <div className="space-y-6">
          <Leaderboard
            type={type === 'global' ? 'GLOBAL' : 'BACKGROUND'}
            week={quiz.scheduledForWeek || quiz.week}
          />
        </div>
      </div>

      {showFullscreenModal && <FullscreenExitModal onContinue={handleContinueFullscreen} />}
    </>
  );
};

export default QuizPage;
