import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  CalendarCheck,
  Award,
  BarChart3,
  Settings,
  X,
  School
} from 'lucide-react';
import { useAuth } from '../../app/context/AuthContext';

export const MobileDrawer = ({ isOpen, onClose }) => {
  const { user, school } = useAuth();
  if (!isOpen) return null;

  const roleStr = String(user?.role_id || user?.role || 'School Administrator').toLowerCase();

  const isTeacher = roleStr.includes('teacher');
  const isStudent = roleStr.includes('student');

  let items = [
    { label: 'Admin Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Students Directory', path: '/students', icon: GraduationCap },
    { label: 'Teachers Directory', path: '/teachers', icon: Users },
    { label: 'Academic Mgmt', path: '/academics', icon: BookOpen },
    { label: 'Attendance', path: '/attendance', icon: CalendarCheck },
    { label: 'Examinations', path: '/examinations', icon: Award },
    { label: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
    { label: 'Administration', path: '/administration', icon: Settings },
  ];

  if (isStudent) {
    items = [
      { label: 'My Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { label: 'My Attendance', path: '/attendance', icon: CalendarCheck },
      { label: 'My Results & Cards', path: '/examinations', icon: Award },
    ];
  } else if (isTeacher) {
    items = [
      { label: 'Teacher Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { label: 'My Class Roster', path: '/students', icon: GraduationCap },
      { label: 'Mark Attendance', path: '/attendance', icon: CalendarCheck },
      { label: 'Record Exam Marks', path: '/examinations', icon: Award },
    ];
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-72 bg-slate-900 text-slate-300 p-4 flex flex-col justify-between shadow-2xl z-50">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
                E
              </div>
              <span className="font-bold text-white text-base">EduSphere</span>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                      isActive ? 'bg-brand-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-xs text-slate-500">
          Logged in as: <strong className="text-white capitalize">{user?.first_name || 'User'} ({user?.role || 'Admin'})</strong>
        </div>
      </div>
    </div>
  );
};
