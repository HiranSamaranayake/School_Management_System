# 📖 EduSphere - Complete End-User Manual & Operating Guide

Welcome to the **EduSphere End-User Operating Manual**. This guide provides step-by-step instructions on how administrators, teachers, students, and parents can navigate and utilize every feature of the EduSphere School SaaS Platform.

---

## 📋 Table of Contents
1. [🔑 System Access & Demo Credentials](#1-system-access--demo-credentials)
2. [🛡️ Administrator Operating Guide](#2-administrator-operating-guide)
   - [Add, Edit & Delete Students](#-add-edit--delete-students)
   - [Add, Edit & Delete Teachers](#-add-edit--delete-teachers)
   - [Schedule, Inspect & Delete Examinations](#-schedule-inspect--delete-examinations)
   - [Audit Logs & Role Permissions](#-audit-logs--role-permissions)
3. [👩‍🏫 Teacher Faculty Operating Guide](#3-teacher-faculty-operating-guide)
   - [Viewing Daily Period Schedule](#-viewing-daily-period-schedule)
   - [Marking Daily Class Attendance Registers](#-marking-daily-class-attendance-registers)
   - [Recording Exam Scores & Auto-Grades](#-recording-exam-scores--auto-grades)
4. [🎓 Student & Parent Operating Guide](#4-student--parent-operating-guide)
   - [Tracking Attendance Percentage](#-tracking-attendance-percentage)
   - [Checking Examination Scores & Badges](#-checking-examination-scores--badges)
   - [Generating & Printing Official Report Cards](#-generating--printing-official-report-cards)
5. [⌨️ Shortcuts & Navigation FAQ](#5-shortcuts--navigation-faq)

---

## 1. 🔑 System Access & Demo Credentials

To access EduSphere, navigate to `http://localhost:3000` (or `http://localhost:3000/login`) in your web browser.

### Credentials Summary Table

| User Role | Demo Email | Password | What You Will See |
| :--- | :--- | :--- | :--- |
| 🛡️ **Administrator** | `admin@greenfield.edu.lk` | `demo1234` | Executive KPIs, Student/Teacher Directories, Exam Creator, Audit Logs, Settings |
| 👩‍🏫 **Teacher** | `teacher@greenfield.edu.lk` | `demo1234` | Period Timetable, Attendance Register Marker, Marks Grid Entry |
| 🎓 **Student / Parent** | `student@greenfield.edu.lk` | `demo1234` | Attendance %, Subject Marks, Official Printable Report Card |

---

## 2. 🛡️ Administrator Operating Guide

### ➕ Add, Edit & Delete Students

#### Adding a New Student:
1. Log in as Administrator (`admin@greenfield.edu.lk`).
2. Click **"Students Directory"** on the left sidebar (or click **"+ Add Student"** from the top header).
3. Click the **"Add Student"** button at the top right of the table.
4. Fill in the required student information:
   - **First Name & Last Name** (e.g. *Kavindi Perera*)
   - **Admission Number** (e.g. *GIC-2026-108*)
   - **Grade Level** (Select *Grade 6* through *Grade 13*)
   - **Enrolled Class** (e.g. *Grade 10 - Science*)
   - **Medium** (*English* / *Sinhala*)
   - **Guardian Name & Phone**
5. Click **"Save Student"**. The new student immediately appears in the directory.

#### Editing Student Information:
- In the **Students Directory** table, click the **"Edit"** button next to any student row to update their class, grade, or guardian phone number.

#### Deleting a Student:
- Click the **"Delete"** button next to the target student.
- Confirm deletion when prompted. The student record will be permanently purged from both the directory and database.

---

### 👩‍🏫 Add, Edit & Delete Teachers

1. Click **"Teachers Directory"** on the left sidebar.
2. Click **"Add Teacher"**.
3. Input Teacher Registration ID (e.g. `TR-2026-045`), Full Name, Assigned Subjects (e.g. *Mathematics, Science*), and Contact Phone.
4. Click **"Save Teacher"**.
5. To remove a retired teacher, click the red **"Delete"** button on their row.

---

### 📝 Schedule, Inspect & Delete Examinations

#### Scheduling a New Examination:
1. Navigate to **"Examinations"** from the left sidebar.
2. Click **"Schedule / Create New Examination"**.
3. Input Examination Title (e.g. *Second Term Mathematics Assessment 2026*), Exam Code, Term, Start Date, and End Date.
4. Select participating Grade Levels and click **"Create Examination"**.

#### Inspecting Examination Details:
- On any scheduled examination card, click **"View Details"**.
- A detailed modal opens displaying assigned classes, subject list, schedule dates, and predicted pass rates.

#### Purging / Deleting Examinations:
- Click the red **"Delete Exam"** button on the target examination card to remove it.

---

### 🔒 Audit Logs & Role Permissions

1. Click **"Administration"** from the left sidebar.
2. **Audit Logs Tab**: Inspect real-time system action logs (who registered, who submitted attendance, who published exam results).
3. **Role Permissions Tab**: Toggle granular permission checkboxes for Admin, Teacher, and Student roles.

---

## 3. 👩‍🏫 Teacher Faculty Operating Guide

### ⏰ Viewing Daily Period Schedule
1. Log in as Teacher (`teacher@greenfield.edu.lk`).
2. On your **Teacher Dashboard**, inspect **"My Today's Class Timetable"**.
3. View period start times, assigned subject, class section, and room allocations (e.g. *Period 1: Mathematics • Grade 10 Science • Lab 2B*).

---

### 📋 Marking Daily Class Attendance Registers
1. Click **"Attendance"** on the sidebar or click **"Mark Attendance"** from the top header.
2. Select your target **Class** (e.g. *Grade 10 - Science*) and **Date**.
3. Next to each student's name, toggle their status badge:
   - 🟢 **Present**
   - 🔴 **Absent**
   - 🟡 **Late Arrival**
   - 🔵 **Excused Leave**
4. Click **"Save Attendance Register"**. Attendance percentages automatically update institution-wide.

---

### 📊 Recording Exam Scores & Auto-Grades
1. Navigate to **"Examinations"**.
2. Select the target examination and subject grid.
3. Type student scores from **0 to 100**.
4. The system automatically computes grade thresholds:
   - **85–100**: `A+`
   - **75–84**: `A`
   - **65–74**: `B`
   - **55–64**: `C`
   - **45–54**: `S`
   - **< 45**: `F`

---

## 4. 🎓 Student & Parent Operating Guide

### 📈 Tracking Attendance Percentage
1. Log in as Student (`student@greenfield.edu.lk`).
2. Your dashboard displays your **Personal Attendance Rate** (e.g. `96.4%`), total days present, and absence logs.

---

### 🏆 Checking Examination Scores & Badges
- Scroll to **"My First Term Examination Results"** to view your subject scores, instructor names, and official grade badges (`A+`, `A`, `B`, etc.).

---

### 🖨️ Generating & Printing Official Report Cards
1. Click **"Official Report Card"** at the top right of your portal (or click **"Print Report Card"** below your results table).
2. An official, formatted **Student Term Report Card** modal opens, complete with:
   - Official College Header & Logo.
   - Admission Details & Enrolled Class.
   - Subject Grades Table.
   - Principal's Signature & Official Seal.
3. Click **"Print Report Card"** to save as PDF or print via your local browser printer.

---

## 5. ⌨️ Shortcuts & Navigation FAQ

### 🔍 Global `Ctrl + K` Quick Search
- Press `Ctrl + K` (or `Cmd + K` on Mac) anywhere in the dashboard to open the search bar.
- Type any student name, admission number, teacher name, or class to jump directly to their page.

### 🏠 Public Home Page Button
- Click the **"Go to Home Page"** button in the top navigation header bar (or click **"Public Home Page"** in the sidebar) to return to the 3D landing page at any time.

### ↔️ Minimizing / Expanding the Sidebar
- Click the top right arrow button (`ChevronRight` / `ChevronLeft`) in the sidebar header to toggle between expanded (`264px`) and minimized (`80px`) sidebar views.

---

© 2026 **EduSphere Inc.** All rights reserved. Greenfield International College Edition.
