import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { PlayIcon, StopIcon } from "@heroicons/react/24/solid";

const QuestionDisplay = () => {
  const question = useSelector((state) => state.interview.question);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (question && "speechSynthesis" in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);

      const utterance = new SpeechSynthesisUtterance(question);
      utterance.lang = "en-US";

      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find((voice) => voice.lang === "en-US");
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
    }
  }, [question]);

  const handleToggle = () => {
    if (!utteranceRef.current) return;
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      speechSynthesis.speak(utteranceRef.current);
    }
  };

  return (
    <div className="w-full h-[500px] flex flex-col items-center justify-start p-6 space-y-4">
      {question && (
        <div className="w-full max-w-3xl">
          {/* Heading with toggle button */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Question</h2>
            <button
              onClick={handleToggle}
              className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition cursor-pointer disabled:opacity-50"
              title={isSpeaking ? "Stop Reading" : "Start Reading"}
            >
              {isSpeaking ? (
                <StopIcon className="w-5 h-5 text-gray-700" />
              ) : (
                <PlayIcon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Markdown content */}
          <div
            className="prose prose-sm sm:prose lg:prose-lg overflow-auto select-none"
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            <ReactMarkdown>{question}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;
