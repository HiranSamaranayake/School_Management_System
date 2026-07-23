import React, { useState } from 'react';
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
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  School,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../app/context/AuthContext';
import { Badge } from '../ui/Badge';

export const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const { school, academicYear } = useAuth();
  const location = useLocation();

  const navigationGroups = [
    {
      group: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      group: 'PEOPLE',
      items: [
        { label: 'Students', path: '/students', icon: GraduationCap },
        { label: 'Teachers', path: '/teachers', icon: Users },
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
        { label: 'Reports', path: '/reports', icon: BarChart3 },
      ],
    },
    {
      group: 'SYSTEM',
      items: [
        { label: 'Administration', path: '/administration', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-slate-900 text-slate-300 transition-all duration-300 border-r border-slate-800 flex flex-col justify-between select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      } hidden lg:flex`}
    >
      {/* Top Header & Brand */}
      <div>
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
              E
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-base text-white tracking-tight flex items-center gap-1.5">
                  EduSphere
                  <span className="text-[10px] bg-brand-500/20 text-brand-300 border border-brand-500/30 px-1.5 py-0.2 rounded-full font-normal">
                    v2.4
                  </span>
                </span>
                <span className="text-[10px] text-slate-400">School SaaS Platform</span>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Workspace / Tenant Switcher */}
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
        <NavLink
          to="/administration"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          title={isCollapsed ? 'Help & Support' : undefined}
        >
          <HelpCircle className="w-4 h-4 shrink-0 text-slate-400" />
          {!isCollapsed && <span>Help & Support</span>}
        </NavLink>
      </div>
    </aside>
  );
};
