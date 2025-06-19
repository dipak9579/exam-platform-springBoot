import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import examImg from "../assets/exam.jpg"

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Online Exam Platform</h1>
        <p>Your gateway to secure, seamless, and smart online assessments.</p>
        <div className="home-buttons">
          <Link to="/login" className="home-btn login-btn">Login</Link>
          <Link to="/register" className="home-btn register-btn">Register</Link>
        </div>
      </div>
      <div className="home-image">
        <img src={examImg} alt="Online Exam" />
      </div>
    </div>
  );
};

export default Home;
