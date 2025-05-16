import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobsReducer from './jobsSlice'; 
import interviewReducer from './interviewSlice';
import { loadState, saveState } from '../utils/localStorage';

const persistedInterviewState = loadState();

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    interview: interviewReducer,
  },
  preloadedState: {
    interview: persistedInterviewState || undefined,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveState(state.interview);
});

export default store;
