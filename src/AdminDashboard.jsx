// src/pages/AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => navigate('/admin/create-exam')}>
          <h2>Create Exam</h2>
          <p>Add a new exam with title, description, and duration.</p>
        </div>
        
        <div className="dashboard-card" onClick={() => navigate('/admin/viewExam')}>
          <h2>View Exams</h2>
          <p>View and manage all created exams and question sets.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
