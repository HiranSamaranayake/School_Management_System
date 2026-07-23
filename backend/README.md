# EduSphere Backend Architecture & API Specification

This directory contains the **Backend Architecture Blueprint**, **MySQL 8 Database DDL Schema**, and **PHP 8+ REST API Directory Blueprint** designed to connect directly with the EduSphere React SaaS frontend.

---

## 📁 Recommended PHP 8+ Backend Directory Structure

When implementing the PHP backend inside `c:\xampp\htdocs\School_Management_System\backend\`, follow this clean, modern OOP / MVC architecture:

```
backend/
├── config/
│   ├── database.php            # PDO Database Connection Singleton
│   ├── jwt.php                 # Secret keys & token expiration
│   └── app.php                 # App constants & CORS headers
├── public/
│   ├── index.php               # Single entry point / Front Controller
│   └── .htaccess               # Apache RewriteEngine for REST routes
├── src/
│   ├── Controllers/
│   │   ├── AuthController.php          # POST /api/auth/login, POST /api/auth/logout
│   │   ├── StudentController.php       # GET, POST, PUT, DELETE /api/students
│   │   ├── TeacherController.php       # GET, POST, PUT, DELETE /api/teachers
│   │   ├── AcademicController.php      # GET /api/classes, GET /api/subjects
│   │   ├── AttendanceController.php    # GET /api/attendance, POST /api/attendance/batch
│   │   ├── ExaminationController.php   # GET /api/exams, POST /api/exam-results/batch
│   │   ├── ReportController.php        # GET /api/reports/analytics
│   │   └── UserController.php          # GET /api/users, GET /api/audit-logs
│   ├── Models/
│   │   ├── School.php
│   │   ├── User.php
│   │   ├── Student.php
│   │   ├── Teacher.php
│   │   ├── ClassModel.php
│   │   ├── Subject.php
│   │   ├── Attendance.php
│   │   ├── Exam.php
│   │   ├── ExamResult.php
│   │   └── AuditLog.php
│   ├── Middleware/
│   │   ├── CorsMiddleware.php          # Allow localhost:3000 CORS headers
│   │   ├── AuthMiddleware.php          # Validate JWT Bearer token
│   │   └── TenantMiddleware.php        # Validate school_id context
│   ├── Services/
│   │   ├── AuthService.php
│   │   └── GradingCalculator.php       # Automatic Grade A+, A, B, C, S, F calculation
│   └── Router.php                      # Lightweight REST route dispatcher
├── logs/                               # Server & error log storage
├── schema.sql                          # Complete MySQL DDL Schema & Seed Data
└── README.md
```

---

## 🗄 Database Import

1. Open **phpMyAdmin** in XAMPP (`http://localhost/phpmyadmin`).
2. Create a new database named `edusphere_db`.
3. Import `c:\xampp\htdocs\School_Management_System\backend\schema.sql`.

---

## 🔌 API Endpoint Specifications

The frontend Axios client (`src/services/apiClient.js`) expects standard RESTful JSON responses.

### 1. Authentication
- `POST /api/auth/login`
  - **Body**: `{ "email": "admin@greenfield.edu.lk", "password": "demo" }`
  - **Response (200)**:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsIn...",
      "user": { "user_id": 1, "first_name": "James", "last_name": "Fernando", "email": "admin@greenfield.edu.lk", "role": "School Admin" },
      "school": { "school_id": 1, "code": "GIC001", "name": "Greenfield International College" }
    }
    ```

### 2. Student Management
- `GET /api/students?search=nimal&grade=Grade+10&status=Active`
- `POST /api/students` (Create Student)
- `GET /api/students/{id}` (Get Student detail)
- `PUT /api/students/{id}` (Update Student profile)
- `DELETE /api/students/{id}` (Delete Student record)

### 3. Teacher Management
- `GET /api/teachers?search=aruni`
- `POST /api/teachers`
- `PUT /api/teachers/{id}`
- `DELETE /api/teachers/{id}`

### 4. Academics
- `GET /api/academic-years`
- `GET /api/classes`
- `POST /api/classes`
- `GET /api/subjects`
- `POST /api/subjects`
- `GET /api/teacher-allocations`

### 5. Attendance Register
- `GET /api/attendance?date=2026-07-24&classId=CLS-10SCI`
- `POST /api/attendance/batch`
  - **Body**: `{ "records": [ { "student_id": 1, "attendance_date": "2026-07-24", "status": "Present", "remarks": "" } ] }`

### 6. Examinations & Results
- `GET /api/exams`
- `GET /api/exam-results?examId=1&classId=1`
- `POST /api/exam-results/batch`
- `GET /api/grading-scale`

### 7. Administration & Settings
- `GET /api/users`
- `GET /api/roles-permissions`
- `PUT /api/roles-permissions`
- `GET /api/audit-logs`
- `GET /api/school-settings`
- `PUT /api/school-settings`
- `GET /api/subscription`

---

## ⚡ How to Switch Frontend to Live PHP Backend

When your PHP REST API is ready:

1. Edit `c:\xampp\htdocs\School_Management_System\.env`:
   ```env
   VITE_USE_MOCK_API=false
   VITE_API_BASE_URL=http://localhost/School_Management_System/backend/public/api
   ```
2. Restart Vite dev server:
   ```bash
   npm run dev
   ```
The frontend will immediately start consuming your live PHP MySQL API!
