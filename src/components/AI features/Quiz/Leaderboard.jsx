import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../../../store/leaderboardSlice';

const Leaderboard = ({ type = 'BACKGROUND', week = '2025-W23' }) => {
  const dispatch = useDispatch();
  const { leaderboard, totalPages, currentPage, loading } = useSelector(
    (state) => state.leaderboard
  );
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchLeaderboard({ type, week, page }));
  }, [type, week, page, dispatch]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Leaderboard</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-500">
            <tr>
              <th className="py-2 px-4">Rank</th>
              <th className="py-2 px-4">User</th>
              <th className="py-2 px-4">Score</th>
              <th className="py-2 px-4">Time (s)</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard?.map((user) => (
              <tr key={user.profileId} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{user.rank}</td>
                <td className="py-2 px-4 flex items-center gap-2">
                  <img
                    src={`http://localhost:5000/${user.photo.replace(/^\/+/, '')}`}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultAvatar;
                    }}
                  />
                  <span className="truncate max-w-[120px]">{user.userId}</span>
                </td>
                <td className="py-2 px-4">{user.score}</td>
                <td className="py-2 px-4">{Math.abs(Math.floor(user.timeTaken / 1000))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">{page}</span>
        <button
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;