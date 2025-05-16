import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionId: null,
  question: null,
  type: null, // 'technical', 'hr', 'coding'
  language: null, // for coding interview only
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setInterviewData: (state, action) => {
      state.sessionId = action.payload.sessionId;
      state.question = action.payload.question;
      state.type = action.payload.type;
      state.language = action.payload.language || null;
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    clearQuestion: (state) => {
      state.question = null;
    },
    resetInterview: () => initialState,
  },
});

export const {
  setInterviewData,
  resetInterview,
  setQuestion,
  clearQuestion,
  setLanguage,
} = interviewSlice.actions;

export default interviewSlice.reducer;
