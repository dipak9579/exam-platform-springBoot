import React, { useEffect, useState } from 'react';

const ResultPage = () => {
  const [result, setResult] = useState(null);
  const email = localStorage.getItem('email');
  const examId = localStorage.getItem('examId');
  const token = localStorage.getItem('token');

  useEffect(() => {
   const fetchResult = async () => {
  try {
    const res = await fetch(`http://localhost:8080/api/student/exam/result/${email}/${examId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // 👈 Add this!
      }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch result');
    }

    const data = await res.json();
    setResult(data);
  } catch (err) {
    console.error(err);
  }
};


    fetchResult();
  }, [email, examId, token]);

  if (!result) return <p>Loading...</p>;

  return (
    <div className="result-page">
      <h2>Exam Result</h2>
      <p><strong>Email:</strong> {result.studentEmail}</p>
      <p><strong>Exam ID:</strong> {result.examId}</p>
      <p><strong>Total Marks:</strong> {result.totalMarks}</p>
    </div>
  );
};

export default ResultPage;
