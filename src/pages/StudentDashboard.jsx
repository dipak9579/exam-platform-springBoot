// src/pages/StudentDashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProfileCard from '../components/ProfileCard';
import Navbar from "../components/Navbar"
import StudentHome from './StudentHome';
import AllExamsPage from './AllExamsPage';
// import ResultPage from './ResultPage';
// import LeaderboardPage from './LeaderboardPage';
// import AnalyticsPage from './AnalyticsPage';
// import SubmitPage from './Submit';
import '../styles/Dashboard.css';

const StudentDashboard = () => {
  return (
    <>  <Navbar/>
    <div className="dashboard-container">
     
      <div className="sidebar-section">{/* ✅ moved to left */}
        <Sidebar />
      </div>
      <div className="main-content">
        <Routes>
          <Route path="home" element={<StudentHome />} />
          <Route path="exams" element={<AllExamsPage />} />
          {/* <Route path="results" element={<ResultPage />} /> */}
          {/* <Route path="leaderboard" element={<LeaderboardPage />} /> */}
          {/* <Route path="analytics" element={<AnalyticsPage />} /> */}
          {/* <Route path="submit" element={<SubmitPage />} /> */}
        </Routes>
      </div>
      <div className="profile-section">
        <ProfileCard />
      </div>
    </div>
    </>
  );
};

export default StudentDashboard;
