import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <button onClick={() => navigate('/student/dashboard/home')}>Dashboard</button>
     <button onClick={() => navigate('/student/dashboard/exams')}>Exams</button>
      <button onClick={() => navigate('/student/dashboard/results')}>Results</button>
      <button onClick={() => navigate('/student/dashboard/leaderboard')}>Leaderboard</button>
      {/* <button onClick={() => navigate('/student/analytics')}>Analytics</button> */}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Sidebar;
