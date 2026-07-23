import React from 'react';
import { useAuth } from '../../app/context/AuthContext';
import { TeacherDashboard } from './TeacherDashboard';
import { StudentDashboard } from './StudentDashboard';
import { AdminDashboard } from './AdminDashboard';

export const DashboardPage = () => {
  const { user } = useAuth();

  const role = (user?.role || user?.role_id || 'School Administrator').toLowerCase();

  if (role.includes('teacher')) {
    return <TeacherDashboard />;
  }

  if (role.includes('student')) {
    return <StudentDashboard />;
  }

  return <AdminDashboard />;
};
