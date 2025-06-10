import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;

// Start Global Quiz
export const startGlobalQuiz = createAsyncThunk(
  'quiz/startGlobalQuiz',
  async (_, thunkAPI) => {
    const res = await axios.get(`${API_URL}/quiz/global`);
    return res.data;
  }
);

// Start Skill-Based Quiz
export const startSkillQuiz = createAsyncThunk(
  'quiz/startSkillQuiz',
  async ({ userId }, thunkAPI) => {
    const res = await axios.get(`${API_URL}/quiz/global?userId=${userId}`);
    return res.data;
  }
);

// Fetch Quiz Questions
export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async ({ quizId }, thunkAPI) => {
    const res = await axios.get(`${API_URL}/quiz/${quizId}/question`);
    return res.data.questions;
  }
);

// Submit Quiz
export const submitQuiz = createAsyncThunk(
  'quiz/submitQuiz',
  async ({ quizId, answers }, { getState }) => {
    const state = getState().quiz;
    const startedAt = state.startedAt;
    const userId = localStorage.getItem('userId');

    const isGlobal = state.category === 'SOFT_SKILL'; // Assume global quiz is soft skill

    const payload = {
      answers,
      startedAt,
      ...(isGlobal && { userId }), // only required for global
    };

    const url = isGlobal
      ? `${API_URL}/quiz/global/${quizId}/submit`
      : `${API_URL}/quiz/${quizId}/submit`;

    const res = await axios.post(url, payload);
    return res.data;
  }
);

// ---------- Slice ----------

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    quizId: null,
    topic: '',
    category: '',
    questions: [],
    currentIndex: 0,
    answers: [],
    startedAt: null,
    loading: false,
    error: null,
    scheduledForWeek: null,
  },
  reducers: {
    answerQuestion: (state, action) => {
      if (action.payload.move) {
        state.currentIndex += 1;
        return;
      }

      const { index, answer } = action.payload;
      state.answers[index] = answer;
    },
    clearQuiz: (state) => {
      return {
        quizId: null,
        topic: '',
        category: '',
        questions: [],
        currentIndex: 0,
        answers: [],
        startedAt: null,
        loading: false,
        error: null,
        scheduledForWeek: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startGlobalQuiz.pending, (state) => {
        state.loading = true;
      })
      .addCase(startGlobalQuiz.fulfilled, (state, action) => {
        state.quizId = action.payload.quizId;
        state.topic = action.payload.topic;
        state.category = action.payload.category;
        state.questions = action.payload.questions || [];
        state.startedAt = new Date().toISOString();
        state.loading = false;
        state.scheduledForWeek = action.payload.scheduledForWeek;
      })
      .addCase(startGlobalQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(startSkillQuiz.pending, (state) => {
        state.loading = true;
      })
      .addCase(startSkillQuiz.fulfilled, (state, action) => {
        state.quizId = action.payload.quizId;
        state.topic = action.payload.topic;
        state.category = action.payload.category;
        state.startedAt = new Date().toISOString();
        state.loading = false;
      })
      .addCase(startSkillQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
      })

      .addCase(submitQuiz.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitQuiz.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ---------- Selectors ----------

export const selectCurrentQuestion = (state) =>
  state.quiz.questions[state.quiz.currentIndex] || null;

export const selectTotalQuestions = (state) =>
  state.quiz.questions.length;

export const selectAnswers = (state) => state.quiz.answers;

// ---------- Exports ----------

export const { answerQuestion, clearQuiz } = quizSlice.actions;
export default quizSlice.reducer;
