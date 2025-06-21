import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import CreateExamForm from './components/CreateExamForm';
import AddQuestionForm from './components/AddQuestionForm';
import LoginForm from './components/LoginForm';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
import ViewExams from './components/ViewExam';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <header className='app-header'>
          <h1>Exam Admin Portal</h1>
        </header>

        <main>
          <Routes>
            <Route path="/login" element={<LoginForm />} />

            <Route path="/admin/dashboard" element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } />

            <Route path="/admin/create-exam" element={
              <PrivateRoute>
                <CreateExamForm />
              </PrivateRoute>
            } />

                 <Route path="/admin/viewExam" element={
              <PrivateRoute>
              <ViewExams/>
              </PrivateRoute>
            } />

            <Route path="/admin/exams/:examId/add-question" element={
              <PrivateRoute>
                <AddQuestionForm />
              </PrivateRoute>
            } />
          </Routes>
        </main>

        <footer>
          &copy; {new Date().getFullYear()} Exam Platform. All rights reserved.
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
