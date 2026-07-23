# EduSphere - Modern School Management SaaS Platform

> **"Modern School Management, Simplified."**

EduSphere is a commercial-grade, multi-tenant cloud-based School Management SaaS frontend platform designed for K-12 and collegiate educational institutions. It features a calm, modern, Linear/Stripe-inspired interface crafted with React, Vite, and Tailwind CSS.

---

## 🚀 Key Features

- **Multi-Tenant Architecture**: Workspace isolation designed for multiple schools (Demo workspace: *Greenfield International College* `GIC001`).
- **10 Core Application Modules**:
  1. **Landing Page (`/`)**: High-conversion SaaS landing page with interactive hero dashboard preview.
  2. **Login (`/login`)**: Split-screen authentication experience with workspace selector & demo quick-fill helper.
  3. **Dashboard (`/dashboard`)**: Academic Year 2026 KPIs, Attendance line chart, Student Grade distribution chart, Subject performance bar chart, Activity feed, and Events.
  4. **Students (`/students`)**: Directory data table with multi-filters, pagination, export, Add/Edit multi-section drawer, Profile drawer, and Report Card generator.
  5. **Teachers (`/teachers`)**: Faculty registry, assigned subjects/classes, Add/Edit modal, Profile view drawer.
  6. **Academic Management (`/academics`)**: Tabbed workspace for Academic Years, Classes, Subjects, and Teacher Allocations.
  7. **Attendance (`/attendance`)**: Daily register with segmented controls, Mark All Present, Save Draft/Submit, Historical register, and Attendance Analytics.
  8. **Examinations & Results (`/examinations`)**: Exam scheduling, Marks Entry grid (0-100 score validation & auto grading), Results table, Printable Report Card preview modal, Grade scale editor.
  9. **Reports & Analytics (`/reports`)**: Interactive charts across categories (Students, Attendance, Academics, Teachers) with PDF/CSV export simulation.
  10. **Administration & Settings (`/administration`)**: User management, Fine-grained Roles & Permissions matrix, Audit logs, School settings, Theme branding live customizer, and Subscription meters.

- **Global Interactivity**:
  - **Command Palette (`Ctrl+K` / `Cmd+K`)**: Instant search across Students, Teachers, Classes, and Subjects.
  - **Quick Create Menu (`+ Create`)**: Rapid creation modal for Students, Teachers, Classes, Attendance, and Exams.
  - **Slide-Over Notification Panel**: Category-filtered notifications with unread badges.
  - **Printable Report Cards**: High-resolution print layout for student academic transcripts.

---

## 🛠 Technology Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router v6 (`react-router-dom`)
- **Styling**: Tailwind CSS + Inter Font + CSS Design Tokens
- **Icons**: Lucide React (`lucide-react`)
- **Charts**: Recharts (`recharts`)
- **HTTP Client**: Axios (`axios`)
- **Service Abstraction**: Modular Service Layer (`src/services/`) + Mock Handler Layer (`src/mocks/`)

---

## ⚙️ Environment Variables & Mock API

EduSphere is built **frontend-first** with an abstracted service layer ready for seamless connection to a PHP 8+ REST API and MySQL database.

Create a `.env` file in the project root:

```env
# Enable Mock API mode for frontend standalone demonstration
VITE_USE_MOCK_API=true

# Future PHP REST API Base URL
VITE_API_BASE_URL=http://localhost/edusphere/backend/public/api

VITE_APP_TITLE=EduSphere | Modern School Management, Simplified.
```

When you are ready to connect to your PHP backend:
1. Change `VITE_USE_MOCK_API=false`
2. Update `VITE_API_BASE_URL` to point to your live PHP API endpoint.

---

## 📦 Installation & Run Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```

---

## 📂 Project Structure

```
c:/xampp/htdocs/School_Management_System/
├── src/
│   ├── app/
│   │   ├── context/          # Auth, Toast, Notification & QuickCreate Contexts
│   │   └── router/           # React Router Route Definitions
│   ├── components/
│   │   ├── layout/           # Header, Sidebar, MobileDrawer, CommandPalette, NotificationDrawer
│   │   ├── ui/               # Reusable UI Library (Button, Input, Table, Modal, Drawer, Tabs, Badge, etc.)
│   │   └── modals/           # AddStudent, ViewStudent, AddTeacher, ViewTeacher, ReportCard Modals
│   ├── features/             # 10 Major Application Pages
│   │   ├── landing/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── students/
│   │   ├── teachers/
│   │   ├── academics/
│   │   ├── attendance/
│   │   ├── examinations/
│   │   ├── reports/
│   │   └── administration/
│   ├── layouts/              # PublicLayout, AuthLayout, DashboardLayout
│   ├── services/             # API Services Abstraction (studentService, teacherService, etc.)
│   ├── mocks/                # Sri Lankan Demo Database & REST API Handlers
│   ├── styles/               # Tailwind Directives & Custom CSS
│   ├── utils/                # Date & Badge Formatters
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## 🔌 Connecting to a PHP 8+ REST API later

The frontend service layer in `src/services/` maps directly to standard RESTful conventions:

- `POST /api/auth/login`
- `GET /api/students`, `POST /api/students`, `PUT /api/students/{id}`, `DELETE /api/students/{id}`
- `GET /api/teachers`, `POST /api/teachers`, `PUT /api/teachers/{id}`, `DELETE /api/teachers/{id}`
- `GET /api/attendance`, `POST /api/attendance/batch`
- `GET /api/exams`, `GET /api/exam-results`, `POST /api/exam-results/batch`
- `GET /api/users`, `GET /api/roles-permissions`

No component-level UI code changes are needed when connecting the real API!
