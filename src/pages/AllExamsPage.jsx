// src/pages/AllExamsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExamCard from '../components/ExamCard';
import '../styles/AllExamsPage.css';

const AllExamsPage = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/api/student/exam/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setExams(res.data))
      .catch(err => console.error("Error fetching exams:", err));
  }, []);

  return (
    <div className="all-exams-page">
      <h2>📚 All Available Exams</h2>
      <div className="exam-list">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>
    </div>
  );
};

export default AllExamsPage;
