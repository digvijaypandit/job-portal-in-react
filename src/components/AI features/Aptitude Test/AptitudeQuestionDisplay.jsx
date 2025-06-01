import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { PlayIcon, StopIcon } from "@heroicons/react/24/solid";

// Utility function to strip Markdown and special characters
const stripMarkdown = (markdownText) => {
  return markdownText
    .replace(/[*_~`#>\[\]()\-+!]/g, "") // Remove most Markdown special characters
    .replace(/\s{2,}/g, " ") // Collapse multiple spaces
    .replace(/\n+/g, " ") // Replace newlines with space
    .trim();
};

const AptitudeQuestionDisplay = () => {
  const question = useSelector((state) => state.aptitude.question);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (question && "speechSynthesis" in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);

      const cleanedText = stripMarkdown(question);
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = "en-US";

      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find((voice) => voice.lang === "en-US");
      if (preferredVoice) utterance.voice = preferredVoice;

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
    <div>
      {question && (
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Aptitude Question</h2>
            <button
              onClick={handleToggle}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
              title={isSpeaking ? "Stop Reading" : "Start Reading"}
            >
              {isSpeaking ? (
                <StopIcon className="w-6 h-6 text-gray-700" />
              ) : (
                <PlayIcon className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
          <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
            <ReactMarkdown>{question}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default AptitudeQuestionDisplay;
