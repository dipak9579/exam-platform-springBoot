import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProfileCard from '../components/ProfileCard';
import Navbar from "../components/Navbar";
import AllExamsPage from './AllExamsPage';
import ResultPage from './ResultPage';
import Leaderboard from './Leaderboard';
// import AnalyticsPage from './AnalyticsPage';
import '../styles/Dashboard.css';
import MainContent from './MainContent';

const StudentDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="sidebar-section">
          <Sidebar />
        </div>

        <div className="main-content">
          <Routes>
            {/* 👇 This will render MainContent when route is exactly /dashboard */}
            <Route index element={<MainContent />} />
            <Route path="home" element={<MainContent />} />
            <Route path="exams" element={<AllExamsPage />} />
            <Route path="results" element={<ResultPage />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            {/* <Route path="analytics" element={<AnalyticsPage />} /> */}
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
