# EduSphere - Next-Gen Multi-Tenant School Management SaaS

Welcome to **EduSphere**, a comprehensive, enterprise-grade School Management SaaS System built for K-12 schools, colleges, and educational institutions.

> 📖 **Looking for the End-User Operating Manual?**  
> Check out the step-by-step [USER_MANUAL.md](USER_MANUAL.md) for full instructions on how Administrators, Teachers, Students, and Parents use the platform.

---

## 🚀 Quick Start & Login Credentials

You can test every role immediately using the pre-configured demo credentials below:

| Role | Demo Email | Demo Password | Primary Functions |
| :--- | :--- | :--- | :--- |
|  **School Administrator** | `admin@greenfield.edu.lk` | `demo1234` | Full system control: Add/Edit/Delete Students, Teachers, Exams, Audit Logs, Settings |
|  **Teacher / Faculty** | `teacher@greenfield.edu.lk` | `demo1234` | Mark daily attendance registers, record exam scores, view period timetables |
|  **Student & Parent** | `student@greenfield.edu.lk` | `demo1234` | View term marks, grade badges (A+, A, B, C, S, F), print official report card |

*(Note: You can also log in with any custom email ending in `@teacher...` or `@student...` with password `demo1234` to test role routing.)*

---

##  System Features A to Z

### 1.  Role-Based Workspaces & Security Matrix
- **Dynamic Role Routing**: Automatically detects user permissions on login and presents the corresponding role workspace.
- **Role Permission Enforcement**: Teachers and Students are restricted from administrative actions (e.g. deleting student accounts or altering system settings).
- **256-bit AES Encryption**: Secure password hashing and JWT token authentication.

### 2.  Interactive 3D School Campus Scene
- **3D Animated Students & Campus**: Real-time HTML5 Canvas 3D rendering of students walking along the pathway toward Greenfield College.
- **Interactive Mouse Tilt**: Moving your cursor across the hero scene dynamically shifts the 3D camera angle.
- **Floating 3D Academic Art**: 3D levitating graduation caps, open books, and A+ badges with smooth sine-wave physics.

### 3.  Student Directory & Lifecycle Management
- **Full Student Registry**: View, search, filter, add, edit, and delete student records.
- **Profile Fields**: First Name, Last Name, Admission Number (`GIC-2024-001`), Grade Level (Grade 6–13), Enrolled Class, Medium (English / Sinhala), Guardian Info, and Status.
- **Automated Delete Integrity**: Deleting a student instantly removes them from both local application state and backend database.

### 4.  Teacher Faculty Registry
- **Teacher Profiles**: Teacher Registration Number (`TR-2026-102`), Assigned Subjects (e.g. Mathematics, Science), Assigned Classes, Phone, and Email.
- **Full CRUD Support**: Add new faculty members, edit assignments, or delete retired teachers.

### 5.  Attendance Marking & Register Anomaly Tracking
- **Batch Attendance Marker**: 1-click register marking for class teachers (Present, Absent, Late, Excused).
- **Real-Time Percentages**: Auto-calculates attendance percentages (e.g. `94.8%`) and highlights absent students in red.

### 6.  Examination Scheduling & Mark Entry
- **Exam Management**: Schedule new examinations (Title, Exam Code, Academic Term, Start/End Dates).
- **Exam Details Modal**: Click "View Details" on any exam card to inspect assigned classes, subject list, schedule dates, and pass rate forecasts.
- **Working Delete Action**: Delete button allowing administrators to purge outdated exam schedules from the database.
- **Teacher Marks Entry Grid**: Faculty can record exam scores (0–100) per subject with auto-calculated grade thresholds:
  - `85 - 100`: **A+** (Distinction)
  - `75 - 84`: **A** (Credit)
  - `65 - 74`: **B** (Pass)
  - `55 - 64`: **C** (Satisfactory)
  - `45 - 54`: **S** (Simple Pass)
  - `< 45`: **F** (Fail)

### 7.  Printable Official Term Report Cards
- **Official Seal Report Card**: Students or parents can click **"Print Official Report Card"** to generate a printable document complete with:
  - Official College Header & Logo Emblem.
  - Student Admission Details & Enrolled Section.
  - Subject Marks Table with Grade Badges.
  - Principal's Signature & Digital Seal.

### 8.  Global `Ctrl + K` Command Search Palette
- Press `Ctrl + K` (or `Cmd + K`) anywhere in the dashboard to open the instant search overlay.
- Searches students, teachers, classes, and subjects in real-time with 1-click navigation.

### 9. 📊 Executive Analytics & Recharts Visualizations
- Interactive enrollment distribution bar charts across Grade 6 through 13.
- Monthly attendance trend area charts.
- Real-time audit activity feed logs.

---

##  How to Setup & Run Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **PHP**: 8.0 or higher (via XAMPP / WAMP / Nginx)
- **MySQL Database**: 8.0 or MariaDB 10.4+ (Included with XAMPP)

---

### Step 1: Database Setup (MySQL)
1. Start **Apache** and **MySQL** in XAMPP Control Panel.
2. Open [http://localhost/phpmyadmin](http://localhost/phpmyadmin) in your browser.
3. Create a new database named `school_management_db`.
4. Import the schema file located at `backend/schema.sql`.

---

### Step 2: Backend Configuration (PHP REST API)
1. Ensure the project is located in your XAMPP `htdocs` folder:
   `c:\xampp\htdocs\School_Management_System`
2. The PHP backend API will be accessible at:
   `http://localhost/School_Management_System/backend/public/api`

---

### Step 3: Frontend Setup (Vite + React)
1. Open terminal inside the `frontend` directory:
   ```bash
   cd c:\xampp\htdocs\School_Management_System\frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

### Step 4: Production Build
To generate a production-ready minified bundle:
```bash
cd frontend
npm run build
```

---

##  Running Automated Playwright E2E Tests

The repository includes automated Playwright End-to-End test suites covering authentication, student management, and examination creation.

To run the Playwright test suite:
```bash
npx playwright test --workers=1
```

---

##  System File Architecture

```
School_Management_System/
├── README.md                           # Technical & Overview Documentation
├── USER_MANUAL.md                      # End-User Operating Manual Guide
├── backend/
│   ├── public/
│   │   └── index.php                  # PHP Front Controller & API Dispatcher
│   ├── config/
│   │   └── Database.php               # PDO Database Connection
│   ├── schema.sql                     # MySQL Database Schema & Initial Data
│   └── src/
│       └── Controllers/
│           ├── AuthController.php      # User Login & JWT Auth
│           ├── StudentController.php   # Student Directory CRUD
│           ├── TeacherController.php   # Teacher Directory CRUD
│           ├── AcademicController.php  # Classes & Subjects
│           ├── AttendanceController.php# Attendance Registers
│           ├── ExaminationController.php# Exams & Results
│           └── AdminController.php     # Global Search & Audit Logs
├── frontend/
│   ├── src/
│   │   ├── app/                       # Global React Context (Auth, Notifications, QuickCreate)
│   │   ├── components/
│   │   │   ├── layout/                # Header, Sidebar, CommandPalette, MobileDrawer
│   │   │   ├── ui/                    # Logo, Button, Card, StatCard, School3DHeroCanvas
│   │   │   └── modals/                # PrintableReportCardModal, AddStudentModal, ViewExamDetailsModal
│   │   ├── features/
│   │   │   ├── auth/                  # LoginPage, RegisterPage
│   │   │   ├── dashboard/             # AdminDashboard, TeacherDashboard, StudentDashboard
│   │   │   ├── landing/               # LandingPage (3D Animated SaaS Home Page)
│   │   │   └── examinations/          # ExaminationsPage (Create, View Details, Delete)
│   │   └── services/                  # Axios API Client & Mock Data Handlers
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── tests/                             # Playwright E2E Test Suites
    ├── login.spec.js
    ├── student.spec.js
    └── exam.spec.js
```

---

##  End-User Operating Manual

For a complete walkthrough of how each role uses the application, read the dedicated [USER_MANUAL.md](USER_MANUAL.md).

---

##  License & Copyright

© 2026 **EduSphere Inc.** All rights reserved. Greenfield International College SaaS Edition.
