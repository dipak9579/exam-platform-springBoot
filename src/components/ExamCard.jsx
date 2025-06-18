import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ExamCard.css';

const ExamCard = ({ exam }) => {
  const navigate = useNavigate();

  const startExam = async () => {
    try {
      const token = localStorage.getItem('token'); // Get JWT token
      const email = localStorage.getItem('email'); // Or get from context

      // Call start exam API
      const response = await axios.post(
        `http://localhost:8080/api/student/start/${exam.id}?email=${email}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Optional: Save start info to localStorage or context
      localStorage.setItem('currentExamId', exam.id);

      // Navigate to exam page
      navigate(`/exam/${exam.id}`);
    } catch (error) {
      console.error("Error starting exam", error);
      alert("Failed to start exam. Please try again.");
    }
  };

  return (
    <div className="exam-card">
      <h3>{exam.title}</h3>
      <p>{exam.description}</p>
      <p>⏱️ Duration: {exam.durationInMinutes} mins</p>
      <button onClick={startExam}>Start Exam</button>
    </div>
  );
};

export default ExamCard;
