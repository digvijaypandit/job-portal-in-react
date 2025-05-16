import React, { useState, useEffect, useRef } from "react";
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
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [feedback, setFeedback] = useState({
    totalQuestions: 0,
    averageScore: 0,
    suggestions: "",
  });

  const [warningVisible, setWarningVisible] = useState(false);
  const exitAttemptCount = useRef(0); // Track attempts to exit fullscreen or change tab

  // Redirect if no sessionId
  useEffect(() => {
    if (!sessionId) {
      navigate("/applicant/home");
    }
  }, [sessionId, navigate]);

  const exitFullscreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  };

  const submitInterview = async () => {
    if (!sessionId) {
      console.warn("No session ID. Cannot submit interview.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/interviews/finish", { sessionId });

      exitFullscreen();
      dispatch(resetInterview());
      localStorage.removeItem("interviewState");
      localStorage.removeItem("sessionId");

      setFeedback({
        totalQuestions: res?.data?.totalQuestions || 0,
        averageScore: res?.data?.averageScore || 0,
        suggestions: res?.data?.suggestions || "No suggestions provided.",
      });

      setShowPopup(true);
    } catch (error) {
      console.error("Error submitting Session:", error);
      alert("Failed to submit the Session.");
    }
  };

  const startInterview = () => {
    const el = document.documentElement;
    if (document.fullscreenEnabled) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    }
    setInterviewStarted(true);
  };

  // Handle attempts to exit fullscreen or leave page/tab
  const handlePotentialExit = () => {
    if (!warningVisible) {
      setWarningVisible(true);
      exitAttemptCount.current = 1;
    } else {
      exitAttemptCount.current += 1;
      if (exitAttemptCount.current >= 2) {
        // Second attempt - submit the interview forcibly
        submitInterview();
      }
    }
  };

  // Prevent Tab key
  useEffect(() => {
    const handleTabKey = (e) => {
      if (e.key === "Tab") e.preventDefault();
    };
    window.addEventListener("keydown", handleTabKey);
    return () => window.removeEventListener("keydown", handleTabKey);
  }, []);

  // Visibility & window blur handling with warning
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handlePotentialExit();
      }
    };
    const handleWindowBlur = () => {
      handlePotentialExit();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [warningVisible]);

  // Fullscreen exit prevention and handling
  useEffect(() => {
    const onFullscreenChange = () => {
      const isFullscreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      if (!isFullscreen && interviewStarted) {
        handlePotentialExit();
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    document.addEventListener("mozfullscreenchange", onFullscreenChange);
    document.addEventListener("MSFullscreenChange", onFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
      document.removeEventListener("mozfullscreenchange", onFullscreenChange);
      document.removeEventListener("MSFullscreenChange", onFullscreenChange);
    };
  }, [interviewStarted, warningVisible]);

  // Warn before refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Disable right click and devtools shortcuts
  useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();
    const disableDevToolsShortcuts = (e) => {
      const key = e.key.toUpperCase();
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(key)) ||
        (e.ctrlKey && key === "U")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("keydown", disableDevToolsShortcuts);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("keydown", disableDevToolsShortcuts);
    };
  }, []);

  if (!interviewStarted) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <button
          onClick={startInterview}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg"
        >
          Start Session
        </button>
      </div>
    );
  }

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

      {/* Submit Button */}
      <div className="flex justify-end mt-8 gap-4 px-12">
        <button
          onClick={submitInterview}
          className="px-5 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Session
        </button>
      </div>

      {warningVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
          role="alertdialog"
          aria-modal="true"
        >
          <div className="bg-yellow-100 rounded-xl shadow-xl p-8 w-full max-w-md text-center border border-yellow-300">
            <h2 className="text-xl font-semibold text-yellow-800 mb-4">
              Warning: Do not leave fullscreen or switch tabs!
            </h2>
            <p className="text-yellow-900">
              If you exit fullscreen or leave the page again, your Session will
              be automatically submitted.
            </p>
            <button
              onClick={() => {
                setWarningVisible(false);

                // Add mousemove listener to restore fullscreen
                const handleMouseMove = () => {
                  const el = document.documentElement;
                  if (document.fullscreenEnabled) {
                    if (!document.fullscreenElement) {
                      if (el.requestFullscreen) el.requestFullscreen();
                      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
                      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
                      else if (el.msRequestFullscreen) el.msRequestFullscreen();
                    }
                  }
                  // Remove listener after first invocation
                  window.removeEventListener("mousemove", handleMouseMove);
                };

                window.addEventListener("mousemove", handleMouseMove, { once: true });
              }}
              className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2.5 rounded-lg transition"
            >
              Continue Session
            </button>
          </div>
        </div>
      )}

      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center border border-gray-100">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Interview Complete</h2>
            <div className="text-gray-700 text-sm space-y-2">
              <p><strong>Total Questions:</strong> {feedback.totalQuestions}</p>
              <p><strong>Average Score:</strong> {feedback.averageScore}</p>
              <div className="text-left">
                <strong>Suggestions:</strong>
                <pre className="whitespace-pre-wrap text-xs mt-1 text-gray-600">
                  {feedback.suggestions}
                </pre>
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
