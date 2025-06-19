import React from 'react';
import '../styles/MainContent.css';

const MainContent = () => {
  return (
    <div className="main-content-wrapper">
      <h2 className="main-heading">🎓 Welcome to Your Exam Dashboard</h2>
      <p className="main-subtext">Access your exams, view results, and track your progress from the menu.</p>

      <div className="features-grid">
        <div className="feature-card">
          <h3>📚 Upcoming Exams</h3>
          <p>View and manage all your scheduled exams in one place.</p>
        </div>

        <div className="feature-card">
          <h3>📊 Results & Analysis</h3>
          <p>Get detailed insights into your performance and improve.</p>
        </div>

        <div className="feature-card">
          <h3>🏆 Leaderboard</h3>
          <p>See how you rank against other students and challenge yourself.</p>
        </div>

        <div className="feature-card">
          <h3>📝 Practice Mode</h3>
          <p>Practice mock exams to boost confidence and accuracy.</p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
