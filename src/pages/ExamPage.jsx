import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Timer from '../components/Timer';
import { useNavigate, useParams } from 'react-router-dom';

import "../styles/ExamPage.css";

const ExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [canAttempt, setCanAttempt] = useState(false); // NEW STATE
  const [durationInMinutes, setDurationInMinutes] = useState(30); // default fallback


  const navigate = useNavigate();
  const { examId } = useParams();

  const hasBlurred = useRef(false);

  // Check if exam is already submitted
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    axios.get(`http://localhost:8080/api/student/exam/submitted/${email}/${examId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.data === true) {
          alert("You have already submitted this exam.");
          navigate('/student/dashboard');
        } else {
          setCanAttempt(true); // Allow tab monitoring
        }
      })
      .catch(err => console.error("Check failed", err));
  }, [examId, navigate]);

  // Fetch questions
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`http://localhost:8080/api/student/exam/${examId}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(res => {
  if (res.data && Array.isArray(res.data.questions)) {
    setQuestions(res.data.questions);
    setDurationInMinutes(res.data.durationInMinutes|| 30); // <-- set duration here
  } else {
    alert("Invalid exam data format.");
  }
})
.catch(err => {
  console.error("Error fetching exam:", err);
  alert("Access denied or exam not found.");
})
.finally(() => setLoading(false));

  }, [examId]);

  // Tab switching & other event restrictions
  useEffect(() => {
    if (!canAttempt) return; // Do not apply if user already submitted

    const handleBlur = () => {
      if (!hasBlurred.current) {
        alert("⚠️ Tab switching is not allowed!");
        hasBlurred.current = true;
      }
    };

    const handleFocus = () => {
      hasBlurred.current = false;
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave the exam?";
    };

    const preventDefault = (e) => e.preventDefault();

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("copy", preventDefault);
    document.addEventListener("paste", preventDefault);
    document.addEventListener("contextmenu", preventDefault);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("copy", preventDefault);
      document.removeEventListener("paste", preventDefault);
      document.removeEventListener("contextmenu", preventDefault);
    };
  }, [canAttempt]); // Run this effect only when allowed

  const handleOptionSelect = (qId, selectedOption) => {
    setAnswers({ ...answers, [qId]: selectedOption });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = () => {
    localStorage.setItem('answers', JSON.stringify(answers));
    localStorage.setItem('examId', examId);
    navigate('/submit');
  };

  if (loading) return <p>Loading questions...</p>;
  if (!questions.length) return <p>No questions found.</p>;

  const currentQ = questions[currentIndex];

  return (
    <div className="exam-wrapper">
      <div className="exam-main">
      <Timer minutes={durationInMinutes} onTimeUp={handleSubmit} />

        <div className="question-box">
          <h2>Q{currentIndex + 1}: {currentQ.questionText}</h2>
          {[currentQ.optionA, currentQ.optionB, currentQ.optionC, currentQ.optionD].map((opt, idx) => (
            <div key={idx} className="option">
              <input
                type="radio"
                name={`q-${currentQ.id}`}
                checked={answers[currentQ.id] === opt}
                onChange={() => handleOptionSelect(currentQ.id, opt)}
              />
              <label>{opt}</label>
            </div>
          ))}
        </div>
        <div className="btn-group">
          <button onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
          <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>Next</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      <div className="question-nav">
        <h3>Questions</h3>
        <div className="question-grid">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              className={`q-btn ${idx === currentIndex ? 'active' : ''} ${answers[q.id] ? 'answered' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
