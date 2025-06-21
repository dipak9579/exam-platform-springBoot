import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AnalyticsPage.css";

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    const studentEmail = localStorage.getItem("email");

    if (studentEmail) {
      fetchAnalytics(studentEmail);
    } else {
      console.error("❌ Student email not found in localStorage.");
      setEmailError(true);
      setLoading(false);
    }
  }, []);

  const fetchAnalytics = async (email) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage.");
    return;
  }

  try {
    const response = await axios.get(`http://localhost:8080/api/student/analytics?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setAnalytics(response.data);
  } catch (error) {
    console.error("❌ Error fetching analytics:", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="analytics-container">
      <h2 className="analytics-title">📊 Your Exam Analytics</h2>

      {loading ? (
        <p>Loading...</p>
      ) : emailError ? (
        <p>Please log in to view your analytics.</p>
      ) : analytics ? (
        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Total Exams</h3>
            <p>{analytics.totalExams}</p>
          </div>
          <div className="analytics-card">
            <h3>Total Marks</h3>
            <p>{analytics.totalMarks}</p>
          </div>
          <div className="analytics-card">
            <h3>Average Marks</h3>
            <p>{analytics.averageMarks.toFixed(2)}</p>
          </div>
          <div className="analytics-card">
            <h3>Accuracy</h3>
            <p>{analytics.accuracy.toFixed(2)}%</p>
          </div>
        </div>
      ) : (
        <p>No analytics data found.</p>
      )}
    </div>
  );
};

export default AnalyticsPage;
