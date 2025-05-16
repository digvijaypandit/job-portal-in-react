import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionDisplay from "../components/AI features/Mock Interview/QuestionDisplay";
import AnswerInput from "../components/AI features/Mock Interview/AnswerInput";
import CodeEditor from "../components/AI features/Mock Interview/CodeEditor";
import { resetInterview } from "../store/interviewSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InterviewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const interviewType = useSelector((state) => state.interview.type);
  const sessionId = useSelector((state) => state.interview.sessionId);

  const [showPopup, setShowPopup] = useState(false);
  const [feedback, setFeedback] = useState({
    totalQuestions: 0,
    averageScore: 0,
    suggestions: "",
  });

  const submitInterview = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/interviews/finish", {
        sessionId,
      });

      dispatch(resetInterview());
      localStorage.removeItem("interviewState");

      setFeedback({
        totalQuestions: res.data.totalQuestions,
        averageScore: res.data.averageScore,
        suggestions: res.data.suggestions,
      });
      setShowPopup(true);
    } catch (error) {
      console.error("Error submitting interview:", error);
      alert("Failed to submit the interview.");
    }
  };

  useEffect(() => {
    const handleTabKey = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleTabKey);

    return () => {
      window.removeEventListener("keydown", handleTabKey);
    };
  }, []);


  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Question Section */}
        <div className="md:w-5/12 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Question</h2>
          <div className="flex-1 overflow-y-auto text-gray-800 text-sm leading-relaxed space-y-2">
            <QuestionDisplay />
          </div>
        </div>

        {/* Answer Section */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {interviewType === "coding" ? <CodeEditor /> : <AnswerInput />}
          </div>
        </div>
      </div>

      {/* Button Actions */}
      <div className="flex justify-end mt-8 gap-4 relative -top-25 right-12">
        <button
          onClick={submitInterview}
          className="px-5 py-2.5 rounded-md cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Interview
        </button>
      </div>



      {/* Feedback Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full text-center border border-gray-100">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Interview Complete</h2>
            <div className="text-gray-700 text-sm space-y-2 overflow-auto">
              <p><strong>Total Questions:</strong> {feedback.totalQuestions}</p>
              <p><strong>Average Score:</strong> {feedback.averageScore}</p>
              <div className="text-left">
                <strong>Suggestions:</strong>
                <pre className="whitespace-pre-wrap text-xs mt-1 text-gray-600">{feedback.suggestions}</pre>
              </div>
            </div>
            <button
              onClick={() => {
                setShowPopup(false);
                navigate("/");
              }}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InterviewPage;
