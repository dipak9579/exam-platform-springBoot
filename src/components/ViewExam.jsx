// src/pages/ViewExams.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewExam.css';
import { useNavigate } from 'react-router-dom';

const ViewExams = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/student/exam/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExams(res.data);
      } catch (error) {
        console.error("Error fetching exams", error);
        alert("Failed to load exams.");
      }
    };

    fetchExams();
  }, [email, token]);

  return (
    <div className="exam-list-container">
      <h2>Your Created Exams</h2>
      {exams.length === 0 ? <p>No exams found.</p> : (
        <ul className="exam-list">
          {exams.map((exam) => (
            <li key={exam.id} className="exam-card">
              <h3>{exam.title}</h3>
              <p>{exam.description}</p>
              <p><strong>Duration:</strong> {exam.durationInMinutes} minutes</p>
              <button onClick={() => navigate(`/admin/exams/${exam.id}/add-question`)}>Add Question</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewExams;
