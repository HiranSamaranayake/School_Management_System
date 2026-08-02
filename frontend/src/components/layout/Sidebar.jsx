import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  CalendarCheck,
  Award,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  School,
  Home,
  User
} from 'lucide-react';
import { useAuth } from '../../app/context/AuthContext';
import { Logo } from '../ui/Logo';

export const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const { user, school, academicYear } = useAuth();
  const location = useLocation();

  const roleStr = String(user?.role_id || user?.role || 'School Administrator').toLowerCase();

  const isAdmin = roleStr.includes('admin');
  const isTeacher = roleStr.includes('teacher');
  const isStudent = roleStr.includes('student');

  let navigationGroups = [];

  if (isStudent) {
    navigationGroups = [
      {
        group: 'STUDENT PORTAL',
        items: [
          { label: 'Public Home Page', path: '/', icon: Home },
          { label: 'My Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { label: 'My Attendance', path: '/attendance', icon: CalendarCheck },
          { label: 'My Results & Cards', path: '/examinations', icon: Award },
        ],
      },
      {
        group: 'ACCOUNT & PROFILE',
        items: [
          { label: 'My Profile', path: '/profile', icon: User },
          { label: 'Account Settings', path: '/settings', icon: Settings },
        ],
      },
    ];
  } else if (isTeacher) {
    navigationGroups = [
      {
        group: 'TEACHER PORTAL',
        items: [
          { label: 'Public Home Page', path: '/', icon: Home },
          { label: 'Teacher Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { label: 'My Class Roster', path: '/students', icon: GraduationCap },
          { label: 'Mark Attendance', path: '/attendance', icon: CalendarCheck },
          { label: 'Record Exam Marks', path: '/examinations', icon: Award },
        ],
      },
      {
        group: 'ACCOUNT & PROFILE',
        items: [
          { label: 'My Profile', path: '/profile', icon: User },
          { label: 'Account Settings', path: '/settings', icon: Settings },
        ],
      },
    ];
  } else {
    // Admin (Full Access)
    navigationGroups = [
      {
        group: 'OVERVIEW',
        items: [
          { label: 'Public Home Page', path: '/', icon: Home },
          { label: 'Admin Dashboard', path: '/dashboard', icon: LayoutDashboard },
        ],
      },
      {
        group: 'PEOPLE',
        items: [
          { label: 'Students Directory', path: '/students', icon: GraduationCap },
          { label: 'Teachers Directory', path: '/teachers', icon: Users },
        ],
      },
      {
        group: 'ACADEMICS',
        items: [
          { label: 'Academic Mgmt', path: '/academics', icon: BookOpen },
        ],
      },
      {
        group: 'MANAGEMENT',
        items: [
          { label: 'Attendance', path: '/attendance', icon: CalendarCheck },
          { label: 'Examinations', path: '/examinations', icon: Award },
        ],
      },
      {
        group: 'INSIGHTS',
        items: [
          { label: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
        ],
      },
      {
        group: 'SYSTEM',
        items: [
          { label: 'Administration', path: '/administration', icon: Settings },
          { label: 'My Profile', path: '/profile', icon: User },
          { label: 'Account Settings', path: '/settings', icon: Settings },
        ],
      },
    ];
  }

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-slate-900 text-slate-300 transition-all duration-300 border-r border-slate-800 flex flex-col justify-between select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      } hidden lg:flex`}
    >
      {/* Top Header & Brand */}
      <div>
        <div className="flex items-center justify-between h-16 px-3 border-b border-slate-800/80">
          {isCollapsed ? (
            <div className="flex items-center justify-between w-full gap-1">
              <div className="shrink-0">
                <Logo size="sm" showSubtitle={false} />
              </div>
              <button
                type="button"
                onClick={onToggleCollapse}
                className="p-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/30 transition-all shrink-0 flex items-center justify-center border border-brand-400/30"
                title="Expand sidebar"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            <>
              <Logo size="md" showSubtitle={true} />
              <button
                type="button"
                onClick={onToggleCollapse}
                className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all shrink-0 flex items-center justify-center border border-slate-700/50"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
            </>
          )}
        </div>

        {/* Workspace Card */}
        {!isCollapsed && (
          <div className="p-3 mx-3 my-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-lg bg-brand-600/20 text-brand-400 border border-brand-500/20 shrink-0">
                <School className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-white truncate">{school?.name || 'Greenfield College'}</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span>{school?.code || 'GIC001'}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">{academicYear}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation List */}
        <div className="px-3 py-2 space-y-5 overflow-y-auto max-h-[calc(100vh-230px)]">
          {navigationGroups.map((group) => (
            <div key={group.group}>
              {!isCollapsed && (
                <h5 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  {group.group}
                </h5>
              )}

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 group ${
                          isActive
                            ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 font-semibold'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                        }`
                      }
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-slate-800/80 space-y-1">
        {!isCollapsed ? (
          <div className="px-3 py-2 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Logged in as:</span>
            <span className="font-bold text-white capitalize">{user?.first_name || 'User'}</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="w-full py-2 rounded-xl bg-slate-800/80 hover:bg-brand-600 text-slate-400 hover:text-white transition-all flex items-center justify-center border border-slate-700/50"
            title="Expand sidebar"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}
      </div>
    </aside>
  );
};
