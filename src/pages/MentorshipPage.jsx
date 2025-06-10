import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FiMenu } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

const MentorshipPage = () => {
  const userId = localStorage.getItem("userId");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [chatId, setChatId] = useState(null);
  const messagesEndRef = useRef(null);

  const API_BASE = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_BASE}/mentorship/chats/${userId}`);
        setHistory(res.data.chats || []);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };
    if (userId) fetchHistory();
  }, [userId]);

  const loadChat = async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/mentorship/history/${id}`);
      const chatHistory = res.data.history || [];
      const formattedMessages = chatHistory
        .map((item) => [
          { type: "user", text: item.question },
          { type: "mentor", text: item.answer },
        ])
        .flat();
      setMessages(formattedMessages);
      setChatId(id);
    } catch (err) {
      console.error("Error loading chat:", err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const question = input.trim();
    setMessages((prev) => [...prev, { type: "user", text: question }]);
    setInput("");
    setLoading(true);
    try {
      const payload = {
        userId,
        question,
        ...(chatId && { chatId }),
      };
      const res = await axios.post(`${API_BASE}/mentorship/ask`, payload);
      const { answer, session } = res.data;
      setMessages((prev) => [...prev, { type: "mentor", text: answer }]);
      if (!chatId && session?.chatId) {
        setChatId(session.chatId);
        setHistory((prev) => [
          { _id: session.chatId, firstQuestion: question, latestAt: session.createdAt },
          ...prev,
        ]);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [
        ...prev,
        { type: "mentor", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 bg-slate-900 text-white flex flex-col z-30 transform transition-transform duration-300 ${sidebarOpen ? "w-72 translate-x-0" : "-translate-x-full w-72"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <span className="text-lg font-semibold">Mentor AI</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white text-xl"
            aria-label="Collapse Sidebar"
          >
            <FiMenu />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {history.map((chat) => (
            <li
              key={chat._id}
              onClick={() => loadChat(chat._id)}
              className={`list-none px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer transition ${chatId === chat._id ? "bg-slate-800" : ""
                }`}
            >
              <p className="truncate">{chat.firstQuestion || "Untitled Chat"}</p>
            </li>
          ))}
        </div>
      </aside>

      {/* Main Area */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-0"
          }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-700 text-xl"
                aria-label="Expand Sidebar"
              >
                <FiMenu />
              </button>
            )}
            <h1 className="text-lg font-semibold text-gray-800">AI Mentor</h1>
          </div>
          <nav className="flex items-center gap-4 text-sm text-gray-700 font-medium">
            <Link to="/applicant/home">Home</Link>
            <Link to="/applicant/jobs">Jobs</Link>
            <Link to="/applicant/dashboard">Dashboard</Link>
            <Link to="/applicant/saved-jobs">Saved</Link>
            <Link to="/applicant/applied-jobs">Applied</Link>
            <Link to="/applicant/ai-features">AI Tools</Link>
          </nav>
        </header>

        {/* Chat Window */}
        <main className="flex-1 overflow-y-auto bg-gray-50 py-6 px-4 flex flex-col items-center">
          <div className="w-full max-w-3xl space-y-4">
            {messages.length === 0 && !loading && (
              <p className="text-center text-gray-400 mt-20">
                Start a conversation or pick a chat from the left.
              </p>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex max-w-xl gap-2 items-end">
                  <div
                    className={`px-4 py-3 text-sm whitespace-pre-wrap shadow-md rounded-2xl ${msg.type === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white border border-gray-200 text-gray-900 rounded-bl-none"
                      }`}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-sm text-gray-500 px-2">
                <div className="w-8 h-8 bg-slate-400 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  M
                </div>
                <div className="flex items-center gap-1 px-4 py-2 rounded-2xl shadow bg-white border text-gray-600">
                  <BsThreeDots className="animate-bounce text-xl" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Area */}
        <div className="sticky bottom-4 w-full flex justify-center px-4">
          <div className="w-full max-w-3xl flex gap-2 bg-white shadow-xl border border-gray-200 rounded-2xl px-4 py-3">
            <TextareaAutosize
              minRows={1}
              maxRows={6}
              className="flex-1 text-sm resize-none focus:outline-none placeholder-gray-400"
              placeholder="Ask your mentor anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-xl cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipPage;
