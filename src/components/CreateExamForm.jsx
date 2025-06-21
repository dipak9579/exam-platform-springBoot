import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅
import './CreateExamForm.css';

function CreateExamForm() {
  const [exam, setExam] = useState({
    title: '',
    description: '',
    durationInMinutes: '',
  });

  const navigate = useNavigate(); // ✅

  const handleChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        'http://localhost:8080/api/admin/exams/create',
        exam,
        {
          headers: {
            Authorization: `Bearer ${token.replace(/^"|"$/g, '')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const createdExam = response.data;
      alert('Exam Created Successfully!');

      // ✅ Navigate to AddQuestionForm with examId
      navigate(`/admin/exams/${createdExam.id}/add-question`);

    } catch (error) {
      console.error('Error creating exam:', error);
      alert('Failed to create exam.');
    }
  };

  return (
    <form className="exam-form" onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={exam.title}
        onChange={handleChange}
        required
      />
      <label>Description:</label>
      <textarea
        name="description"
        value={exam.description}
        onChange={handleChange}
        required
      ></textarea>
      <label>Duration (Minutes):</label>
      <input
        type="number"
        name="durationInMinutes"
        value={exam.durationInMinutes}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Exam</button>
    </form>
  );
}

export default CreateExamForm;
