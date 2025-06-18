import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentHome from './pages/StudentHome';
import PrivateRoute from './components/PrivateRoute';
import ExamPage from './pages/ExamPage';
import SubmitPage from './pages/Submit';
import ResultPage from './pages/ResultPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute>
              <StudentHome/>
            </PrivateRoute>
          }
        />
        

         {/* ✅ Protected Routes for Exam Flow */}
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
              <SubmitPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/result"
          element={
            <PrivateRoute>
              <ResultPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
