import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLeaderboard = createAsyncThunk(
  'leaderboard/fetchLeaderboard',
  async ({ type, week, page = 1 }) => {
    const response = await axios.get(`http://localhost:5000/api/quiz/leaderboard`, {
      params: { type, week, page },
    });
    return response.data;
  }
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    leaderboard: [],
    total: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload.leaderboard;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchLeaderboard.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default leaderboardSlice.reducer;
