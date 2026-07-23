import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  X,
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  CalendarCheck,
  Award,
  BarChart3,
  Settings,
  School,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../app/context/AuthContext';

export const MobileDrawer = ({ isOpen, onClose }) => {
  const { school, academicYear } = useAuth();
  const location = useLocation();

  if (!isOpen) return null;

  const navigation = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Students', path: '/students', icon: GraduationCap },
    { label: 'Teachers', path: '/teachers', icon: Users },
    { label: 'Academic Management', path: '/academics', icon: BookOpen },
    { label: 'Attendance', path: '/attendance', icon: CalendarCheck },
    { label: 'Examinations & Results', path: '/examinations', icon: Award },
    { label: 'Reports', path: '/reports', icon: BarChart3 },
    { label: 'Administration & Settings', path: '/administration', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />

      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-slate-900 text-slate-300 shadow-2xl flex flex-col justify-between border-r border-slate-800 animate-in slide-in-from-left duration-300">
        <div>
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-base">
                E
              </div>
              <span className="font-bold text-base text-white">EduSphere</span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3 mx-3 my-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-3">
            <School className="w-5 h-5 text-brand-400 shrink-0" />
            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-white truncate">{school?.name}</h4>
              <p className="text-[10px] text-slate-400">{school?.code} • {academicYear}</p>
            </div>
          </div>

          <div className="px-3 py-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                      isActive ? 'bg-brand-600 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
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

        <div className="p-4 border-t border-slate-800">
          <p className="text-[11px] text-slate-500 text-center">EduSphere SaaS © 2026</p>
        </div>
      </div>
    </div>
  );
};
