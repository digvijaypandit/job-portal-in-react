import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitSkillQuiz, fetchSkillQuestions } from "../store/quizSlice";
import { useParams } from "react-router-dom";

const SkillQuizPage = () => {
  const dispatch = useDispatch();
  const { quizId } = useParams();

  const {
    skillQuestions,
    totalQuestions,
    currentQuestionIndex,
    loading,
  } = useSelector((state) => state.quiz);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [startedAt, setStartedAt] = useState(null);

  useEffect(() => {
    dispatch(fetchSkillQuestions(quizId));
    setStartedAt(new Date().toISOString());
  }, [quizId, dispatch]);

  const handleOptionSelect = (index, option) => {
    const updated = [...selectedOptions];
    updated[index] = option;
    setSelectedOptions(updated);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      dispatch({ type: "quiz/nextQuestion" });
    }
  };

  const handleSubmit = () => {
    dispatch(
      submitSkillQuiz({
        quizId,
        startedAt,
        answers: selectedOptions,
      })
    );
  };

  if (loading) return <p>Loading quiz...</p>;

  const currentQ = skillQuestions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </h1>

      <div className="bg-white p-4 rounded shadow">
        <p className="mb-4">{currentQ?.question}</p>
        {currentQ?.options?.map((opt, i) => (
          <div key={i} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={opt}
                checked={selectedOptions[currentQuestionIndex] === opt}
                onChange={() => handleOptionSelect(currentQuestionIndex, opt)}
                className="mr-2"
              />
              {opt}
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        {currentQuestionIndex < totalQuestions - 1 ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillQuizPage;
