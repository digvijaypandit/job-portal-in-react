import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { setQuestion } from "../../../store/interviewSlice";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const language = useSelector((state) => state.interview.language)?.toLowerCase();
  const sessionId = useSelector((state) => state.interview.sessionId);
  const question = useSelector((state) => state.interview.question);
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_BASE_URL;

  const fetchNewQuestion = async () => {
    try {
      const res = await axios.get(`${API_URL}/interviews/question/${sessionId}`);
      dispatch(setQuestion(res.data.question));
    } catch (error) {
      console.error("Error fetching question:", error);
      alert("Failed to fetch new question.");
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
  
    try {
      if (!code || code.trim() === "") {
        throw new Error("Empty input");
      }
  
      const userAnswer = JSON.stringify({
        function: code.trim()
      });
  
      const payload = {
        sessionId,
        question,
        userAnswer
      };
  
      const response = await axios.post(
        `${API_URL}/interviews/answer`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const result = response.data;
  
      setScore(result.score);
      setCode("");
      setPopupData(result);
      setShowPopup(true);
      await fetchNewQuestion();
    } catch (error) {
      console.error("Error submitting code:", error);
      alert("Something went wrong while submitting the code.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h3 className="text-xl font-medium text-gray-900 mb-4">Code Editor</h3>

      <div className="h-[380px] border border-gray-300 rounded-md overflow-hidden">
        <Editor
          height="100%"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          language={language}
          options={{
            minimap: { enabled: false },
            lineNumbers: "relative",
            wordWrap: "on",
            formatOnType: true,
            autoClosingBrackets: "always",
            scrollBeyondLastLine: false,
            smoothScrolling: true,
          }}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={handleSubmitCode}
          className={`px-6 py-2 rounded-md text-sm cursor-pointer text-white transition ${
            loading ? "bg-gray-400" : "bg-gray-800 hover:bg-gray-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {/* Feedback Popup */}
      {showPopup && popupData && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Feedback</h2>
            <div className="space-y-2 text-gray-700 text-sm">
              <p><strong>Score:</strong> {popupData.score}</p>
              <p><strong>Average Score:</strong> {popupData.averageScore}</p>
              <p><strong>Suggestion:</strong> {popupData.suggestion}</p>
            </div>
            <div className="mt-5 text-right">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 text-sm cursor-pointer rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
