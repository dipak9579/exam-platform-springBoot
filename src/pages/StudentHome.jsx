import React from 'react';
import StudentDashboard from '../components/StudentDashboard';
import './StudentHome.css';

const StudentHome = () => {
  return (
    <div className="student-home">
      <h1>🎓 Welcome to Student Dashboard</h1>
      <StudentDashboard />
    </div>
  );
};

export default StudentHome;
