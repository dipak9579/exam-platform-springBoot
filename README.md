# exam-platform-springBoot

📘 Online Exam Platform (Spring Boot + React JS)

A full-stack Online Examination System that allows Admins to create/manage exams and Students to take exams, submit answers, view results, and track performance analytics.
This project is built using Spring Boot (Backend), React JS (Frontend), and MySQL (Database) with secure JWT Authentication.

🚀 Tech Stack
Backend

Java 17

Spring Boot

Spring Security + JWT

Spring Data JPA / Hibernate

MySQL

Lombok

Frontend

React 19

Vite

React Router

Axios

🎯 Features
👨‍💼 Admin Features

Admin Login (JWT Authentication)

Create new exams

Add questions to an exam

View, update, delete exams

Manage question bank

🎓 Student Features

Student Registration & Login

View all available exams

Start exam with a real-time timer

Submit exam

Auto-evaluated results

Detailed analytics: marks, accuracy, attempted questions

View leaderboard and rankings

🧠 System Features

Secure JWT-based authentication

Role-based access control (Admin / Student)

Structured layered backend (Controller → Service → Repository)

Automatic scoring and result generation

Database entities for tracking answers & submissions

Clean React UI with reusable components

🗄 Database Schema Overview
Users

id

name

email

password

role (ADMIN/STUDENT)

Exam

id

title

description

durationInMinutes

Question

id

exam_id

questionText

optionA / optionB / optionC / optionD

correctAnswer

StudentExamSubmission

id

student_id

exam_id

score

StudentAnswer

id

submission_id

question_id

givenAnswer

marksAwarded

🔐 Authentication Flow (JWT)

User logs in with email/password

Backend authenticates using Spring Security

JWT token generated in JwtService

Token stored on frontend

All protected endpoints require:

Authorization: Bearer <token>


Admin and student access are checked using roles.

📡 API Overview
Auth APIs
Method	Endpoint	Description
POST	/api/auth/register	Register new student
POST	/api/auth/login	Login & get JWT token
Admin APIs
Method	Endpoint	Description
POST	/api/admin/exams	Create exam
GET	/api/admin/exams	List all exams
POST	/api/admin/exams/{id}/questions	Add question to exam
Student APIs
Method	Endpoint	Description
GET	/api/student/exams	Get available exams
GET	/api/student/exams/{id}	Start exam & fetch questions
POST	/api/student/exams/{id}/submit	Submit exam answers
Leaderboard
Method	Endpoint	Description
GET	/api/leaderboard	View ranked results
🧩 Project Structure
🖥 Backend (Spring Boot)
src/main/java/com/examPlatform/
    ├── Config/
    ├── Controller/
    ├── Services/
    ├── Repository/
    ├── Model/
    ├── DTO/

🎨 Frontend (React)
adminDashboard/
studentDashboard/
    ├── components/
    ├── pages/
    ├── context/
    ├── styles/

🛠 Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/exam-platform.git

🖥 Backend Setup
2️⃣ Navigate to Backend Folder
cd exam-platform-backend

3️⃣ Configure Database

Update application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/examPlatform
spring.datasource.username=yourUser
spring.datasource.password=yourPassword

4️⃣ Run Backend
mvn spring-boot:run

🎨 Frontend Setup
5️⃣ Admin Dashboard
cd adminDashboard
npm install
npm run dev

6️⃣ Student Dashboard
cd studentDashboard
npm install
npm run dev

🎯 How the System Works (Flow)
Admin Workflow

Login

Create exam

Add questions

Publish exam

Student Workflow

Register/Login

View exams

Start exam

Timer starts

Submit answers

Get scored instantly

View analytics + leaderboard ranking

🚀 Future Enhancements

Add microservices architecture

Add refresh token mechanism

Add email notifications

Add exam categories & difficulty levels

Add plagiarism/exam monitoring

Add real-time leaderboard using WebSockets

🙌 Contributors

Dipak Dandge – Full Stack Developer

📝 License

This project is open-source under the MIT License.
