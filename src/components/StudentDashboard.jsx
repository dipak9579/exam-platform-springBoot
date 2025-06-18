import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExamCard from './ExamCard';

const StudentDashboard = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/student/exam/all', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => setExams(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard">
      <h2>📚 Available Exams</h2>
      <div className="exam-grid">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
