import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  joinSkillQuiz,
  joinGlobalQuiz,
  fetchSkillQuestion,
} from "../components/AI features/Quiz/quizService";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/quiz";

export const fetchSkillQuizFlow = createAsyncThunk(
  "quiz/fetchSkillQuizFlow",
  async (_, { dispatch }) => {
    const base = await joinSkillQuiz(); // get quizId
    const questionsData = await fetchSkillQuestion(base.quizId);
    return {
      ...base,
      questions: questionsData.questions,
    };
  }
);

export const fetchGlobalQuiz = createAsyncThunk(
  "quiz/fetchGlobalQuiz",
  async () => {
    return await joinGlobalQuiz();
  }
);

export const fetchSkillQuestions = createAsyncThunk(
  "quiz/fetchSkillQuestions",
  async (quizId) => {
    const res = await axios.get(`${BASE_URL}/${quizId}/question`);
    return res.data;
  }
);

export const submitSkillQuiz = createAsyncThunk(
  "quiz/submitSkillQuiz",
  async ({ quizId, startedAt, answers }) => {
    const payload = { startedAt, answers };
    const result = await submitSkillQuizAnswers(quizId, payload);
    return result;
  }
);

export const submitGlobalQuiz = createAsyncThunk(
  "quiz/submitGlobalQuiz",
  async ({ quizId, profileId, startedAt, answers }) => {
    const payload = { profileId, startedAt, answers };
    const result = await submitGlobalQuizAnswers(quizId, payload);
    return result;
  }
);

export const fetchLeaderboard = createAsyncThunk(
  "quiz/fetchLeaderboard",
  async ({ type, week, page = 1, limit = 20 }) => {
    const res = await axios.get(
      `${BASE_URL}/leaderboard?type=${type}&week=${week}&page=${page}&limit=${limit}`
    );
    return res.data;
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    skillQuestions: [],
    totalQuestions: 0,
    currentQuestionIndex: 0,
    loading: false,
    quizData: null, // For global or skill metadata
    questions: [], // Array of questions for global, or fetched one by one for skill
    currentIndex: 0,
    userAnswers: [], // User's selected answers
    status: "idle",
    submissionResult: null,
    error: null,
    leaderboard: [],
    leaderboardTotalPages: 1,
    leaderboardCurrentPage: 1,
    leaderboardLoading: false,
    leaderboardError: null,
  },
  reducers: {
    resetQuiz: (state) => {
      state.quizData = null;
      state.status = "idle";
      state.error = null;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setUserAnswer: (state, action) => {
      const { index, answer } = action.payload;
      state.userAnswers[index] = answer;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.totalQuestions - 1) {
        state.currentQuestionIndex += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillQuizFlow.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSkillQuizFlow.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quizData = action.payload;
      })
      .addCase(fetchSkillQuizFlow.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchGlobalQuiz.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGlobalQuiz.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quizData = action.payload;
      })
      .addCase(fetchGlobalQuiz.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSkillQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkillQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.skillQuestions = action.payload.questions;
        state.totalQuestions = action.payload.totalQuestions;
        state.currentQuestionIndex = 0;
      })
      .addCase(fetchSkillQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitSkillQuiz.fulfilled, (state, action) => {
        state.submissionResult = action.payload;
        state.status = "submitted";
      })
      .addCase(submitGlobalQuiz.fulfilled, (state, action) => {
        state.submissionResult = action.payload;
        state.status = "submitted";
      })
      .addCase(fetchLeaderboard.pending, (state) => {
        state.leaderboardLoading = true;
        state.leaderboardError = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.leaderboard = action.payload.leaderboard;
        state.leaderboardTotalPages = action.payload.totalPages;
        state.leaderboardCurrentPage = action.payload.currentPage;
        state.leaderboardLoading = false;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboardError = action.error.message;
      });
  },
});

export const { resetQuiz, setCurrentIndex, setUserAnswer, nextQuestion } = quizSlice.actions;
export default quizSlice.reducer;
