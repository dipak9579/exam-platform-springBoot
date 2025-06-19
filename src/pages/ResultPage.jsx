// src/pages/ResultPage.jsx
import React, { useEffect, useState } from 'react';
import '../styles/ResultPage.css';

const ResultPage = () => {
  const [results, setResults] = useState([]);
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/student/exam/results/${email}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Failed to fetch results");

        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchResults();
  }, [email, token]);

  if (results.length === 0) return <p className="loading">Loading results...</p>;

  return (
    <div className="result-container">
      <h2>📊 My Exam Results</h2>
      <div className="result-grid">
        {results.map((res, index) => (
          <div key={index} className="result-card">
            <h3>{res.examTitle}</h3>
            <p><strong>Exam ID:</strong> {res.examId}</p>
            <p><strong>Email:</strong> {res.studentEmail}</p>
            <p><strong>Total Marks:</strong> {res.totalMarks}</p>
            <p><strong>Submitted At:</strong> {new Date(res.submittedAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
