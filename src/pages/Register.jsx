import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/LogRegi.css"

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();
  setError('');

  try {
    await axios.post('http://localhost:8080/api/auth/register', {
      name: fullName,
      email,
      password
    });

    navigate('/login');
  } catch (err) {
   if (err.response && err.response.status === 409) {
  setError("Email is already registered");
} else {
  setError("Registration failed. Please try again.");
}

  }
};


  return (
    <div className="page">
      <h2>Register</h2>
      <form className="form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
