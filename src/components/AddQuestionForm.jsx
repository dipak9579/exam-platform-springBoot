import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AddQuestionForm.css';

function AddQuestionForm() {
  const { examId } = useParams();

  const [questionData, setQuestionData] = useState({
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    marks: ''
  });

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:8080/api/admin/exams/${examId}/questions`,
        questionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Question added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Failed to add question.');
    }

    setQuestionData({
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
      marks: ''
    });
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <h2>Add Question for Exam ID: {examId}</h2>

      <label>Question:</label>
      <textarea name="questionText" value={questionData.questionText} onChange={handleChange} required />

      <label>Option A:</label>
      <input type="text" name="optionA" value={questionData.optionA} onChange={handleChange} required />

      <label>Option B:</label>
      <input type="text" name="optionB" value={questionData.optionB} onChange={handleChange} required />

      <label>Option C:</label>
      <input type="text" name="optionC" value={questionData.optionC} onChange={handleChange} required />

      <label>Option D:</label>
      <input type="text" name="optionD" value={questionData.optionD} onChange={handleChange} required />

      <label>Correct Answer (A/B/C/D):</label>
      <input type="text" name="correctAnswer" value={questionData.correctAnswer} onChange={handleChange} required />

      <label>Marks:</label>
      <input type="number" name="marks" min="1" value={questionData.marks} onChange={handleChange} required />

      <button type="submit">Add Question</button>
    </form>
  );
}

export default AddQuestionForm;
