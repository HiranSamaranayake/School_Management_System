import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { AuthLayout } from '../../layouts/AuthLayout';
import { DashboardLayout } from '../../layouts/DashboardLayout';

import { LandingPage } from '../../features/landing/LandingPage';
import { LoginPage } from '../../features/auth/LoginPage';
import { DashboardPage } from '../../features/dashboard/DashboardPage';
import { StudentsPage } from '../../features/students/StudentsPage';
import { TeachersPage } from '../../features/teachers/TeachersPage';
import { AcademicsPage } from '../../features/academics/AcademicsPage';
import { AttendancePage } from '../../features/attendance/AttendancePage';
import { ExaminationsPage } from '../../features/examinations/ExaminationsPage';
import { ReportsPage } from '../../features/reports/ReportsPage';
import { AdministrationPage } from '../../features/administration/AdministrationPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* Authentication Split Layout */}
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
        </Route>

        {/* Authenticated Dashboard Application Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/examinations" element={<ExaminationsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/administration" element={<AdministrationPage />} />
        </Route>

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
