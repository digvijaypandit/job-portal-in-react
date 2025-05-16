import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestion } from "../../../store/interviewSlice";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

const AnswerInput = () => {
  const dispatch = useDispatch();
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const sessionId = useSelector((state) => state.interview.sessionId);
  const question = useSelector((state) => state.interview.question);

  useEffect(() => {
    setAnswer(transcript);
  }, [transcript]);

  const toggleListening = () => {
    listening
      ? SpeechRecognition.stopListening()
      : SpeechRecognition.startListening({ continuous: true });
  };

  const fetchNewQuestion = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/interviews/question/${sessionId}`);
      dispatch(setQuestion(res.data.question));
    } catch (error) {
      console.error("Error fetching question:", error);
      alert("Failed to fetch new question.");
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    if (!answer || answer.trim() === "") {
      alert("Cannot accept an empty value");
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.post("http://localhost:5000/api/interviews/answer", {
        sessionId,
        question,
        userAnswer: answer,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const result = response.data;
      setPopupData(result);
      setShowPopup(true);
      setAnswer("");
      await fetchNewQuestion();
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h3 className="text-xl font-medium text-gray-900 mb-3">Your Answer</h3>
      <textarea
        className="w-full h-84 border border-gray-300 rounded-md p-4 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
        placeholder="Speak or type your answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-3">
          <button
            onClick={toggleListening}
            className="px-4 py-2 rounded-md cursor-pointer border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            {listening ? "Stop Listening" : "Start Listening"}
          </button>
          <button
            onClick={() => {
              resetTranscript();
              setAnswer("");
            }}
            className="px-4 py-2 rounded-md border cursor-pointer border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Reset
          </button>
        </div>
        <button
          onClick={handleSubmitAnswer}
          className={`px-6 py-2 rounded-md text-sm text-white cursor-pointer transition ${loading ? "bg-gray-400" : "bg-gray-800 hover:bg-gray-700"
            }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {showPopup && popupData && (
        <div className="fixed inset-0 z-50 bg-transparent backdrop-blur-sm bg-opacity-40 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md overflow-y-auto max-h-[90vh]">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Feedback</h2>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><strong>Score:</strong> {popupData.score}</p>
                <p><strong>Average Score:</strong> {popupData.averageScore}</p>
                <p><strong>Suggestion:</strong> {popupData.suggestion}</p>
              </div>
              <div className="mt-5 text-right">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
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

export default AnswerInput;
