import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Leaderboard.css";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
  try {
    const token = localStorage.getItem("token"); // or sessionStorage
    const response = await axios.get("http://localhost:8080/api/leaderboard/overall", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLeaderboardData(response.data);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Leaderboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : leaderboardData.length === 0 ? (
        <p className="leaderboard-empty">No submissions found.</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student Email</th>
              <th>Total Marks</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.studentEmail}</td>
                <td>{entry.totalMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
