import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      const { token } = res.data;

      // ✅ Store token and email
      login(token); // context + localStorage (via AuthContext)
      localStorage.setItem("token", token); // just in case AuthContext doesn't do it
      localStorage.setItem("email", email); // ✅ THIS IS THE FIX

      navigate('/student/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="page">
      <h2>Login</h2>
      <form className="form" onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
