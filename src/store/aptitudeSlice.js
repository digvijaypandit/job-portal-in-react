import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionId: null,
  question: null,
  type: "aptitude", // fixed type since it’s aptitude test
  answers: {}, // store answers keyed by question id or index
};

const aptitudeSlice = createSlice({
  name: "aptitude",
  initialState,
  reducers: {
    setAptitudeData: (state, action) => {
      state.sessionId = action.payload.sessionId;
      state.question = action.payload.question;
      state.type = "aptitude";
      state.answers = {};
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setAnswer: (state, action) => {
      // action.payload = { questionId, answer }
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    clearQuestion: (state) => {
      state.question = null;
    },
    resetAptitude: () => initialState,
  },
});

export const {
  setAptitudeData,
  setQuestion,
  setAnswer,
  clearQuestion,
  resetAptitude,
} = aptitudeSlice.actions;

export default aptitudeSlice.reducer;
