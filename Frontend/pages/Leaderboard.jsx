import React, { useState, useEffect } from "react";
import api from "../api/index";
import useUserData from "../hooks/useUserData";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { userData, setUserData } = useUserData();

  useEffect(() => {
    (async () => {
      if (userData.info._id) {
        const scoreRes = await api.get("/leaderboard/user", {
          params: {
            userID: userData.info._id,
          },
        });
        const scoreData = scoreRes.data?.scoreData;
        if (scoreRes && scoreData) {
          const currInfo = {
            _id: scoreData._id,
            userID: scoreData.userID,
            latestScore: scoreData.latestScore,
            dateModified: scoreData.dateModified,
            userInfo: userData.info,
          };
          const otherScores = leaderboardData;
          otherScores.sort((a, b) => b.latestScore - a.latestScore);
          const updatedLeaderboard = [currInfo, ...otherScores];
          setLeaderboardData(updatedLeaderboard);
        }
      }
    })();
  }, [userData]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get("/leaderboard");
        setLeaderboardData(response.data?.leaderBoardData || []);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch leaderboard data");
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-gray-50 p-6">
        <p>Loading Leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-red-500 p-6">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-black text-gray-50 p-6">
      <h2 className="text-4xl font-bold mb-8 hover:border-2 p-2 rounded-xl border-zinc-600 ">
        Leaderboard
      </h2>
      <div className="w-full max-w-4xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-700 p-4">Rank</th>
              <th className="border-b-2 border-gray-700 p-4">Username</th>
              <th className="border-b-2 border-gray-700 p-4">Highest Score</th>
              <th className="border-b-2 border-gray-700 p-4">Last Played</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData &&
              leaderboardData?.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-800">
                  <td className="border-b border-gray-700 p-4">{index + 1}</td>
                  <td className="border-b border-gray-700 p-4">
                    {user.userInfo.username}
                  </td>
                  <td className="border-b border-gray-700 p-4">
                    {user.latestScore}
                  </td>
                  <td className="border-b border-gray-700 p-4">
                    {new Date(user.dateModified).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
