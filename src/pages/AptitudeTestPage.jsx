import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionDisplay from "../components/AI features/Aptitude Test/AptitudeQuestionDisplay";
import AnswerInput from "../components/AI features/Aptitude Test/AptitudeAnswerInput";
import { resetAptitude } from "../store/aptitudeSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AptitudeTestPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionId = useSelector((state) => state.aptitude.sessionId);

    const [testStarted, setTestStarted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [feedback, setFeedback] = useState({
        totalQuestions: 0,
        suggestions: "",
    });
    const API_URL = import.meta.env.VITE_BASE_URL;
    const [warningVisible, setWarningVisible] = useState(false);
    const exitAttemptCount = useRef(0);

    useEffect(() => {
        if (!sessionId) navigate("/applicant/home");
    }, [sessionId, navigate]);

    const exitFullscreen = () => {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    };

    const submitTest = async () => {
        if (!sessionId) return;
        try {
            const res = await axios.post(`${API_URL}/aptitude/finish`, {
                sessionId,
            });

            exitFullscreen();
            dispatch(resetAptitude());
            localStorage.removeItem("aptitudeState");
            localStorage.removeItem("aptitudeSessionId");

            setFeedback({
                totalQuestions: res?.data?.totalQuestions || 0,
                suggestions: res?.data?.suggestions || "No suggestions provided.",
            });

            setShowPopup(true);
        } catch (error) {
            console.error("Error submitting Aptitude Test:", error);
            alert("Failed to submit the test.");
        }
    };

    const startTest = () => {
        const el = document.documentElement;
        if (document.fullscreenEnabled) {
            if (el.requestFullscreen) el.requestFullscreen();
            else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
            else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
            else if (el.msRequestFullscreen) el.msRequestFullscreen();
        }
        setTestStarted(true);
    };

    const handlePotentialExit = () => {
        if (!warningVisible) {
            setWarningVisible(true);
            exitAttemptCount.current = 1;
        } else {
            exitAttemptCount.current += 1;
            if (exitAttemptCount.current >= 2) {
                submitTest();
            }
        }
    };

    useEffect(() => {
        const handleTabKey = (e) => {
            if (e.key === "Tab") e.preventDefault();
        };
        window.addEventListener("keydown", handleTabKey);
        return () => window.removeEventListener("keydown", handleTabKey);
    }, []);

    useEffect(() => {
        const detectDevTools = () => {
            const threshold = 160;
            if (
                window.outerHeight - window.innerHeight > threshold ||
                window.outerWidth - window.innerWidth > threshold
            ) {
                handlePotentialExit();
            }
        };

        const interval = setInterval(detectDevTools, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let timeoutId;

        const resetInactivityTimer = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                alert("You've been inactive for too long. Submitting test...");
                submitTest();
            }, 180000); // 3 minutes
        };

        window.addEventListener("mousemove", resetInactivityTimer);
        window.addEventListener("keydown", resetInactivityTimer);

        resetInactivityTimer();

        return () => {
            window.removeEventListener("mousemove", resetInactivityTimer);
            window.removeEventListener("keydown", resetInactivityTimer);
            clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) handlePotentialExit();
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

    useEffect(() => {
        const onFullscreenChange = () => {
            const isFullscreen =
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement;

            if (!isFullscreen && testStarted) {
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
    }, [testStarted, warningVisible]);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

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

    if (!testStarted) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <button
                    onClick={startTest}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg"
                >
                    Start Aptitude Test
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-6 h-full">
                <div className="md:w-5/12 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Question</h2>
                    <div className="flex-1 overflow-y-auto text-gray-800 text-sm leading-relaxed space-y-2">
                        <QuestionDisplay />
                    </div>
                </div>

                <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                        <AnswerInput />
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-8 gap-4 px-12">
                <button
                    onClick={submitTest}
                    className="px-5 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow-md text-sm font-medium"
                >
                    Submit Test
                </button>
            </div>

            {warningVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-yellow-100 rounded-xl shadow-xl p-8 w-full max-w-md text-center border border-yellow-300">
                        <h2 className="text-xl font-semibold text-yellow-800 mb-4">
                            Warning: Do not leave fullscreen or switch tabs!
                        </h2>
                        <p className="text-yellow-900">
                            If you do it again, the test will be automatically submitted.
                        </p>
                        <button
                            onClick={() => {
                                setWarningVisible(false);
                                const handleMouseMove = () => {
                                    const el = document.documentElement;
                                    if (document.fullscreenEnabled && !document.fullscreenElement) {
                                        if (el.requestFullscreen) el.requestFullscreen();
                                    }
                                    window.removeEventListener("mousemove", handleMouseMove);
                                };
                                window.addEventListener("mousemove", handleMouseMove, { once: true });
                            }}
                            className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2.5 rounded-lg transition"
                        >
                            Continue Test
                        </button>
                    </div>
                </div>
            )}

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center border border-gray-100">
                        <h2 className="text-2xl font-semibold text-green-600 mb-4">Test Complete</h2>
                        <div className="text-gray-700 text-sm space-y-2">
                            <p><strong>Total Questions:</strong> {feedback.totalQuestions}</p>
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

export default AptitudeTestPage;
