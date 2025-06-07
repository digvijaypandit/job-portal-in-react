import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../../../store/leaderboardSlice';

const getCurrentISOWeek = () => {
  const now = new Date();
  const year = now.getFullYear();
  const firstJan = new Date(year, 0, 1);
  const days = Math.floor((now - firstJan) / (24 * 60 * 60 * 1000));
  const week = Math.ceil((days + firstJan.getDay() + 1) / 7);

  // Format as ISO week string, e.g. "2025-W23"
  const weekString = `${year}-W${week.toString().padStart(2, '0')}`;
  return weekString;
};

const Leaderboard = ({ type = 'BACKGROUND' }) => {
  const dispatch = useDispatch();
  const { leaderboard, loading } = useSelector((state) => state.leaderboard);

  const currentWeek = getCurrentISOWeek();

  useEffect(() => {
    dispatch(fetchLeaderboard({ type, week: currentWeek }));
  }, [type, currentWeek, dispatch]);

  const topThree = leaderboard?.slice(0, 3);
  const rest = leaderboard?.slice(3);
  const currentUserId = localStorage.getItem("userId");

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Leaderboard</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          {/* Top 3 section */}
          <div className="flex justify-around items-end mb-6">
            {topThree?.map((user, index) => (
              <div
                key={user.profileId}
                className={`flex flex-col items-center ${
                  index === 1 ? 'order-1' : index === 0 ? 'order-2' : 'order-3'
                }`}
              >
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 ${
                    index === 0
                      ? 'border-yellow-400'
                      : index === 1
                      ? 'border-gray-300'
                      : 'border-yellow-800'
                  } overflow-hidden`}
                >
                  <img
                    src={`http://localhost:5000/${user.photo?.replace(/^\/+/, '')}`}
                    alt={user.userId}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                    }}
                  />
                </div>
                <p className="text-sm font-medium mt-2 truncate max-w-[80px] text-center">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">{user.score} pts</p>
              </div>
            ))}
          </div>

          {/* Scrollable list of rest of users */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {rest?.map((user, idx) => {
              const rank = idx + 4;
              const isYou = user.userId.toLowerCase() === currentUserId?.toLowerCase();

              return (
                <div
                  key={user.profileId}
                  className={`flex items-center justify-between p-3 rounded-lg shadow-sm ${
                    isYou ? 'bg-green-100 font-bold' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg w-6">{rank}</span>
                    <img
                      src={`http://localhost:5000/${user.photo.replace(/^\/+/, '')}`}
                      alt={user.userId}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                      }}
                    />
                    <span className="truncate max-w-[100px]">{user.userId}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{user.score} pts</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
