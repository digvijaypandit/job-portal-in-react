import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  filteredJobs: [],
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setFilteredJobs: (state, action) => {
      state.filteredJobs = action.payload;
    },
  },
});

export const { setJobs, setFilteredJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
