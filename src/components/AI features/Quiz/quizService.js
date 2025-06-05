import axios from "axios";

const BASE_URL = "http://localhost:5000/api/quiz";
const userId = localStorage.getItem("userId");

export const joinSkillQuiz = async () => {
  const res = await axios.get(`${BASE_URL}/home/user/${userId}`);
  console.log(res);
  return res.data;
};

export const fetchSkillQuestions = async (quizId) => {
  const res = await axios.get(`${BASE_URL}/home/questions/${quizId}`);
  return res.data; // Expected to be: { questions: [...] }
};

export const joinGlobalQuiz = async () => {
  const res = await axios.get(`${BASE_URL}/global`);
  return res.data; // Already includes questions
};

export const fetchSkillQuestion = async (quizId, index) => {
  const res = await axios.get(`${BASE_URL}/${quizId}/question/`);
  return res.data;
};

export const submitSkillQuizAnswers = async (quizId, payload) => {
  const res = await axios.post(`${BASE_URL}/${quizId}/submit`, payload);
  return res.data;
};

export const submitGlobalQuizAnswers = async (quizId, payload) => {
  const res = await axios.post(`${BASE_URL}/global/${quizId}/submit`, payload);
  return res.data;
};

export const fetchLeaderboard = async ({ type, week, page = 1, limit = 20 }) => {
  const res = await axios.get(
    `${BASE_URL}/leaderboard?type=${type}&week=${week}&page=${page}&limit=${limit}`
  );
  return res.data;
};