// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import PrivateRoute from './components/PrivateRoute';
import ExamSubmitted from './pages/ExamSubmitted';
import ExamPage from "./pages/ExamPage"
import SubmitPage from './pages/Submit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main dashboard layout route */}
        <Route
          path="/student/dashboard/*"
          element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/submitted"
          element={
            <PrivateRoute>
              <ExamSubmitted />
            </PrivateRoute>
          }
        />

        <Route
          path="/exam/:examId"
          element={
            <PrivateRoute>
              <ExamPage />
            </PrivateRoute>
          }
        />

        
        <Route
          path="/submit"
          element={
            <PrivateRoute>
              <SubmitPage/>
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;
