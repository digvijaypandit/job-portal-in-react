import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboard } from "../../../store/quizSlice";

const Leaderboard = () => {
  const dispatch = useDispatch();

  const {
    leaderboard,
    leaderboardTotalPages,
    leaderboardCurrentPage,
    leaderboardLoading,
    leaderboardError,
  } = useSelector((state) => state.quiz);

  const [leaderboardType, setLeaderboardType] = useState("BACKGROUND");
  const [week, setWeek] = useState("2025-W23");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchLeaderboard({ type: leaderboardType, week, page }));
  }, [dispatch, leaderboardType, week, page]);

  const handleTypeChange = (e) => {
    setLeaderboardType(e.target.value);
    setPage(1);
  };

  const handleWeekChange = (e) => {
    setWeek(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= leaderboardTotalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="mt-10 bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>

      <div className="flex gap-4 mb-6">
        <select
          value={leaderboardType}
          onChange={handleTypeChange}
          className="p-2 border rounded w-40"
        >
          <option value="BACKGROUND">Skill-Based</option>
          <option value="GLOBAL">Global</option>
        </select>

        <input
          type="text"
          value={week}
          onChange={handleWeekChange}
          className="p-2 border rounded w-40"
          placeholder="2025-W23"
        />
      </div>

      {leaderboardLoading ? (
        <p className="text-gray-600">Loading leaderboard...</p>
      ) : leaderboardError ? (
        <p className="text-red-500">Error: {leaderboardError}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">User</th>
                <th className="p-3">Score</th>
                <th className="p-3">Time Taken</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry.profileId} className="border-t">
                  <td className="p-3">{entry.rank}</td>
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={`http://localhost:5000/${entry.photo?.replace(/^\/+/, '')}`}
                      alt="user"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{entry.userId}</span>
                  </td>
                  <td className="p-3">{entry.score}</td>
                  <td className="p-3">{Math.abs(entry.timeTaken)} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {leaderboardCurrentPage} of {leaderboardTotalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === leaderboardTotalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;