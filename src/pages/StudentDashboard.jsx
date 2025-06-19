// src/pages/StudentDashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProfileCard from '../components/ProfileCard';
import Navbar from "../components/Navbar"
import StudentHome from './StudentHome';
import AllExamsPage from './AllExamsPage';
import ResultPage from './ResultPage';
import Leaderboard from './Leaderboard';
// import AnalyticsPage from './AnalyticsPage';
// import SubmitPage from './Submit';
import '../styles/Dashboard.css';
import MainContent from './MainContent';

const StudentDashboard = () => {
  return (
    <>  <Navbar/>
    <div className="dashboard-container">
     
      <div className="sidebar-section">{/* ✅ moved to left */}
        <Sidebar />
      </div>
      <div className="main-content">
        {/* <MainContent/> */}
        <Routes>
          <Route path="home" element={<StudentHome />} />
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
