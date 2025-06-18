import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SubmitPage.css";

const SubmitPage = () => {
  const navigate = useNavigate();

  const handleFinalSubmit = async () => {
    const rawAnswers = localStorage.getItem('answers');
    const email = localStorage.getItem('email');
    const examId = localStorage.getItem('examId');
    const token = localStorage.getItem('token');

    console.log("RAW ANSWERS:", rawAnswers);
    console.log("EMAIL:", email);
    console.log("EXAM ID:", examId);
    console.log("TOKEN:", token);

    // ✅ Validate presence of data
    if (!rawAnswers || !email || !examId || !token) {
      alert("Missing exam data. Please retake the exam.");
      return;
    }

    // ✅ Parse answers safely
    let parsedAnswers;
    try {
      const parsed = JSON.parse(rawAnswers);
      if (typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error("Invalid format for answers");
      }

      parsedAnswers = Object.entries(parsed).map(([questionId, givenAnswer]) => ({
        questionId: Number(questionId),
        givenAnswer: givenAnswer
      }));
    } catch (err) {
      console.error("Error parsing answers:", err);
      alert("Something went wrong with your answers. Please try again.");
      return;
    }

    // ✅ Build submission DTO
    const submissionDTO = {
      examId: Number(examId),
      studentEmail: email,
      answers: parsedAnswers,
    };

    console.log("Submitting:", submissionDTO);

    // ✅ Submit to backend
    try {
      const res = await fetch('http://localhost:8080/api/student/exam/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(submissionDTO),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server Error: ${res.status} - ${errorText}`);
      }

      const result = await res.json();
      localStorage.setItem('result', JSON.stringify(result));
      navigate('/result');
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Exam submission failed. Please try again.");
    }
  };

  return (
    <div className="submit-page">
      <h2>Are you sure you want to submit the exam?</h2>
      <button onClick={handleFinalSubmit}>Yes, Submit</button>
    </div>
  );
};

export default SubmitPage;
