import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setQuestion as setAptitudeQuestion } from "../../../store/aptitudeSlice";

const parseQuestionAndOptions = (raw) => {
  if (!raw) return { questionText: "", options: {} };

  const optionRegex = /(?:^|\n)([A-D])\.\s+(.*?)(?=(?:\n[A-D]\.|$))/gs;
  const options = {};
  let match;

  while ((match = optionRegex.exec(raw)) !== null) {
    const [_, key, value] = match;
    options[key] = value.trim();
  }

  const questionText = raw.replace(optionRegex, "").trim();
  return { questionText, options };
};

const AptitudeAnswerInput = () => {
  const dispatch = useDispatch();
  const rawQuestion = useSelector((state) => state.aptitude.question);
  const sessionId = useSelector((state) => state.aptitude.sessionId);
  const API_URL = import.meta.env.VITE_BASE_URL;
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const { questionText, options } = parseQuestionAndOptions(rawQuestion || "");

  const fetchNewQuestion = async () => {
    try {
      const res = await axios.get(`${API_URL}/aptitude/question/${sessionId}`);
      dispatch(setAptitudeQuestion(res.data.question));
      setSelectedOption("");
    } catch (error) {
      console.error("Error fetching question:", error);
      alert("Could not fetch aptitude question.");
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchNewQuestion();
    }
  }, [sessionId]);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedOption) {
      alert("Please select an option before submitting.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/aptitude/answer`, {
        sessionId,
        question: rawQuestion,
        userAnswer: selectedOption,
      });

      setPopupData(res.data);
      setShowPopup(true);
      setSelectedOption("");
      await fetchNewQuestion();
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <form onSubmit={handleSubmitAnswer}>
        <div className="flex flex-col gap-4 mt-6">
          {Object.entries(options).map(([key, text]) => (
            <label
              key={key}
              className={`flex items-center p-4 border rounded cursor-pointer ${selectedOption === key ? "border-blue-600 bg-blue-100" : "border-gray-300"
                }`}
            >
              <input
                type="radio"
                name="answerOption"
                value={key}
                checked={selectedOption === key}
                onChange={() => setSelectedOption(key)}
                className="mr-3"
              />
              <span>
                <strong>({key})</strong> {text}
              </span>
            </label>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            className={`px-6 py-2 rounded-md text-white ${loading ? "bg-gray-400" : "bg-gray-800 hover:bg-gray-700"
              }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {showPopup && popupData && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Answer Review</h2>
              <div className="text-gray-700 text-sm space-y-2">
                <p><strong>Correct Answer:</strong> {popupData.correctAnswer}</p>
                <p><strong>Explanation:</strong></p>
                <p className="whitespace-pre-wrap text-gray-600 text-xs">{popupData.explanation}</p>
              </div>
              <div className="mt-5 text-right">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AptitudeAnswerInput;
