// src/pages/ExamSubmitted.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SubmitPage.css"; // You can reuse styles or create new ones

const ExamSubmitted = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate('/student/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="submit-page">
      <h2>✅ Exam Submitted Successfully!</h2>
      <p>You’ll be redirected to the dashboard shortly...</p>
    </div>
  );
};

export default ExamSubmitted;
